const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ==========================================
// HELPERS
// ==========================================

function toNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return number;
}

// ==========================================
// CALCULATE MONTHLY EMI
// ==========================================

function calculateMonthlyEmi(
  principalAmount,
  annualInterestRate,
  tenureMonths
) {
  const principal = Number(principalAmount);
  const annualRate = Number(annualInterestRate);
  const tenure = Number(tenureMonths);

  if (
    !Number.isFinite(principal) ||
    principal <= 0 ||
    !Number.isFinite(annualRate) ||
    annualRate < 0 ||
    !Number.isInteger(tenure) ||
    tenure <= 0
  ) {
    return null;
  }

  if (annualRate === 0) {
    return Number((principal / tenure).toFixed(2));
  }

  const monthlyRate = annualRate / 12 / 100;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);

  if (!Number.isFinite(emi)) {
    return null;
  }

  return Number(emi.toFixed(2));
}

// ==========================================
// CALCULATE NEXT PAYMENT DATE
// ==========================================

function calculateNextPaymentDate(baseDate = new Date()) {
  const date = new Date(baseDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const nextDate = new Date(date);

  nextDate.setMonth(nextDate.getMonth() + 1);

  return nextDate;
}

// ==========================================
// GET NEXT VALID PAYMENT DATE
// ==========================================

function getNextValidPaymentDate(
  currentDate,
  createdAt = new Date()
) {
  const baseDate = currentDate
    ? new Date(currentDate)
    : new Date(createdAt);

  if (Number.isNaN(baseDate.getTime())) {
    return null;
  }

  const today = new Date();

  let nextDate = new Date(baseDate);

  /*
   * If the stored due date is already in the past,
   * move it forward month-by-month until it reaches
   * the next upcoming payment date.
   */
  while (nextDate < today) {
    nextDate = calculateNextPaymentDate(nextDate);

    if (!nextDate) {
      return null;
    }
  }

  return nextDate;
}

// ==========================================
// SERIALIZE LOAN
// ==========================================

function serializeLoan(loan) {
  if (!loan) {
    return null;
  }

  return {
    id: loan.id,
    userId: loan.userId,
    loanType: loan.loanType,
    principalAmount: Number(loan.principalAmount),
    interestRate: Number(loan.interestRate),
    tenureMonths: loan.tenureMonths,
    monthlyEmi: Number(loan.monthlyEmi),
    totalPayable: Number(loan.totalPayable),
    paidAmount: Number(loan.paidAmount),
    remainingAmount: Number(loan.remainingAmount),
    nextPaymentDate: loan.nextPaymentDate,
    status: loan.status,
    createdAt: loan.createdAt,
    updatedAt: loan.updatedAt,
  };
}

// ==========================================
// GET ALL USER LOANS
// ==========================================

async function getUserLoans(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const loans = await prisma.loan.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return loans.map(serializeLoan);
}

// ==========================================
// GET ACTIVE USER LOANS
// ==========================================

async function getActiveLoans(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const loans = await prisma.loan.findMany({
    where: {
      userId,
      status: "ACTIVE",
    },
    orderBy: [
      {
        nextPaymentDate: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  /*
   * 6.4.5
   *
   * Ensure every active loan has a valid
   * upcoming payment date.
   */
  const normalizedLoans = [];

  for (const loan of loans) {
    let nextPaymentDate = loan.nextPaymentDate;

    if (!nextPaymentDate) {
      nextPaymentDate = calculateNextPaymentDate(
        loan.createdAt || new Date()
      );
    } else {
      nextPaymentDate = getNextValidPaymentDate(
        nextPaymentDate,
        loan.createdAt || new Date()
      );
    }

    /*
     * Persist the calculated date if the database
     * value is missing or outdated.
     */
    if (
      nextPaymentDate &&
      (!loan.nextPaymentDate ||
        new Date(loan.nextPaymentDate).getTime() !==
          new Date(nextPaymentDate).getTime())
    ) {
      const updatedLoan = await prisma.loan.update({
        where: {
          id: loan.id,
        },
        data: {
          nextPaymentDate,
        },
      });

      normalizedLoans.push(
        serializeLoan(updatedLoan)
      );
    } else {
      normalizedLoans.push(
        serializeLoan(loan)
      );
    }
  }

  /*
   * Sort again after calculating dates.
   */
  normalizedLoans.sort((a, b) => {
    if (!a.nextPaymentDate) {
      return 1;
    }

    if (!b.nextPaymentDate) {
      return -1;
    }

    return (
      new Date(a.nextPaymentDate).getTime() -
      new Date(b.nextPaymentDate).getTime()
    );
  });

  return normalizedLoans;
}

// ==========================================
// GET SINGLE LOAN
// ==========================================

async function getLoanById(userId, loanId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!loanId) {
    throw new Error("Loan ID is required");
  }

  const loan = await prisma.loan.findFirst({
    where: {
      id: loanId,
      userId,
    },
  });

  if (!loan) {
    const error = new Error("Loan not found");
    error.statusCode = 404;
    throw error;
  }

  return serializeLoan(loan);
}

// ==========================================
// CREATE LOAN
// ==========================================

async function createLoan(userId, data) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const {
    loanType,
    principalAmount,
    interestRate,
    tenureMonths,
    totalPayable,
    paidAmount,
    remainingAmount,
    nextPaymentDate,
    status,
  } = data || {};

  if (!loanType) {
    throw new Error("Loan type is required");
  }

  const principal = toNumber(principalAmount);
  const rate = toNumber(interestRate);
  const tenure = Number(tenureMonths);

  if (principal === null || principal <= 0) {
    throw new Error(
      "Principal amount must be greater than 0"
    );
  }

  if (rate === null || rate < 0) {
    throw new Error(
      "Interest rate cannot be negative"
    );
  }

  if (!Number.isInteger(tenure) || tenure <= 0) {
    throw new Error(
      "Tenure must be a positive number of months"
    );
  }

  // ==========================================
  // CALCULATE EMI
  // ==========================================

  const calculatedEmi = calculateMonthlyEmi(
    principal,
    rate,
    tenure
  );

  if (
    calculatedEmi === null ||
    calculatedEmi <= 0
  ) {
    throw new Error(
      "Unable to calculate monthly EMI"
    );
  }

  // ==========================================
  // TOTAL PAYABLE
  // ==========================================

  const calculatedTotalPayable =
    totalPayable !== undefined &&
    totalPayable !== null
      ? toNumber(totalPayable)
      : calculatedEmi * tenure;

  if (
    calculatedTotalPayable === null ||
    calculatedTotalPayable <= 0
  ) {
    throw new Error(
      "Total payable amount must be greater than 0"
    );
  }

  // ==========================================
  // PAID AMOUNT
  // ==========================================

  const normalizedPaidAmount =
    paidAmount !== undefined &&
    paidAmount !== null
      ? toNumber(paidAmount)
      : 0;

  if (
    normalizedPaidAmount === null ||
    normalizedPaidAmount < 0
  ) {
    throw new Error(
      "Paid amount cannot be negative"
    );
  }

  // ==========================================
  // REMAINING AMOUNT
  // ==========================================

  const calculatedRemainingAmount =
    remainingAmount !== undefined &&
    remainingAmount !== null
      ? toNumber(remainingAmount)
      : Math.max(
          calculatedTotalPayable -
            normalizedPaidAmount,
          0
        );

  if (
    calculatedRemainingAmount === null ||
    calculatedRemainingAmount < 0
  ) {
    throw new Error(
      "Remaining amount cannot be negative"
    );
  }

  // ==========================================
  // STATUS
  // ==========================================

  const normalizedStatus =
    String(status || "ACTIVE")
      .trim()
      .toUpperCase();

  const allowedStatuses = [
    "ACTIVE",
    "PAID",
    "CLOSED",
    "OVERDUE",
    "PENDING",
  ];

  if (!allowedStatuses.includes(normalizedStatus)) {
    throw new Error("Invalid loan status");
  }

  // ==========================================
  // NEXT PAYMENT DATE
  // ==========================================

  let normalizedNextPaymentDate;

  if (nextPaymentDate) {
    const parsedDate = new Date(nextPaymentDate);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new Error(
        "Invalid next payment date"
      );
    }

    normalizedNextPaymentDate = parsedDate;
  } else {
    normalizedNextPaymentDate =
      calculateNextPaymentDate(new Date());

    if (!normalizedNextPaymentDate) {
      throw new Error(
        "Unable to calculate next payment date"
      );
    }
  }

  // ==========================================
  // CREATE
  // ==========================================

  const loan = await prisma.loan.create({
    data: {
      userId,
      loanType: String(loanType).trim(),
      principalAmount: principal,
      interestRate: rate,
      tenureMonths: tenure,
      monthlyEmi: calculatedEmi,
      totalPayable: calculatedTotalPayable,
      paidAmount: normalizedPaidAmount,
      remainingAmount: calculatedRemainingAmount,
      nextPaymentDate: normalizedNextPaymentDate,
      status: normalizedStatus,
    },
  });

  return serializeLoan(loan);
}

// ==========================================
// UPDATE LOAN
// ==========================================

async function updateLoan(userId, loanId, data) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!loanId) {
    throw new Error("Loan ID is required");
  }

  const existingLoan = await prisma.loan.findFirst({
    where: {
      id: loanId,
      userId,
    },
  });

  if (!existingLoan) {
    const error = new Error("Loan not found");
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};

  // ==========================================
  // LOAN TYPE
  // ==========================================

  if (data?.loanType !== undefined) {
    const loanType = String(data.loanType).trim();

    if (!loanType) {
      throw new Error(
        "Loan type cannot be empty"
      );
    }

    updateData.loanType = loanType;
  }

  // ==========================================
  // PRINCIPAL
  // ==========================================

  if (data?.principalAmount !== undefined) {
    const principal = toNumber(
      data.principalAmount
    );

    if (
      principal === null ||
      principal <= 0
    ) {
      throw new Error(
        "Principal amount must be greater than 0"
      );
    }

    updateData.principalAmount = principal;
  }

  // ==========================================
  // INTEREST RATE
  // ==========================================

  if (data?.interestRate !== undefined) {
    const rate = toNumber(
      data.interestRate
    );

    if (rate === null || rate < 0) {
      throw new Error(
        "Interest rate cannot be negative"
      );
    }

    updateData.interestRate = rate;
  }

  // ==========================================
  // TENURE
  // ==========================================

  if (data?.tenureMonths !== undefined) {
    const tenure = Number(
      data.tenureMonths
    );

    if (
      !Number.isInteger(tenure) ||
      tenure <= 0
    ) {
      throw new Error(
        "Tenure must be a positive number of months"
      );
    }

    updateData.tenureMonths = tenure;
  }

  // ==========================================
  // MONTHLY EMI
  // ==========================================

  if (data?.monthlyEmi !== undefined) {
    const emi = toNumber(
      data.monthlyEmi
    );

    if (emi === null || emi <= 0) {
      throw new Error(
        "Monthly EMI must be greater than 0"
      );
    }

    updateData.monthlyEmi = emi;
  }

  // ==========================================
  // TOTAL PAYABLE
  // ==========================================

  if (data?.totalPayable !== undefined) {
    const totalPayable = toNumber(
      data.totalPayable
    );

    if (
      totalPayable === null ||
      totalPayable <= 0
    ) {
      throw new Error(
        "Total payable amount must be greater than 0"
      );
    }

    updateData.totalPayable =
      totalPayable;
  }

  // ==========================================
  // PAID AMOUNT
  // ==========================================

  if (data?.paidAmount !== undefined) {
    const paidAmount = toNumber(
      data.paidAmount
    );

    if (
      paidAmount === null ||
      paidAmount < 0
    ) {
      throw new Error(
        "Paid amount cannot be negative"
      );
    }

    updateData.paidAmount = paidAmount;
  }

  // ==========================================
  // REMAINING AMOUNT
  // ==========================================

  if (data?.remainingAmount !== undefined) {
    const remainingAmount = toNumber(
      data.remainingAmount
    );

    if (
      remainingAmount === null ||
      remainingAmount < 0
    ) {
      throw new Error(
        "Remaining amount cannot be negative"
      );
    }

    updateData.remainingAmount =
      remainingAmount;
  }

  // ==========================================
  // NEXT PAYMENT DATE
  // ==========================================

  if (data?.nextPaymentDate !== undefined) {
    if (!data.nextPaymentDate) {
      updateData.nextPaymentDate =
        calculateNextPaymentDate(
          existingLoan.createdAt || new Date()
        );
    } else {
      const parsedDate = new Date(
        data.nextPaymentDate
      );

      if (Number.isNaN(parsedDate.getTime())) {
        throw new Error(
          "Invalid next payment date"
        );
      }

      updateData.nextPaymentDate =
        parsedDate;
    }
  }

  // ==========================================
  // STATUS
  // ==========================================

  if (data?.status !== undefined) {
    const status = String(data.status)
      .trim()
      .toUpperCase();

    const allowedStatuses = [
      "ACTIVE",
      "PAID",
      "CLOSED",
      "OVERDUE",
      "PENDING",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new Error(
        "Invalid loan status"
      );
    }

    updateData.status = status;
  }

  // ==========================================
  // UPDATE
  // ==========================================

  const updatedLoan = await prisma.loan.update({
    where: {
      id: existingLoan.id,
    },
    data: updateData,
  });

  return serializeLoan(updatedLoan);
}

// ==========================================
// DELETE LOAN
// ==========================================

async function deleteLoan(userId, loanId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!loanId) {
    throw new Error("Loan ID is required");
  }

  const existingLoan = await prisma.loan.findFirst({
    where: {
      id: loanId,
      userId,
    },
  });

  if (!existingLoan) {
    const error = new Error("Loan not found");
    error.statusCode = 404;
    throw error;
  }

  await prisma.loan.delete({
    where: {
      id: existingLoan.id,
    },
  });

  return {
    id: existingLoan.id,
    deleted: true,
  };
}

// ==========================================
// LOAN SUMMARY
// ==========================================

async function getLoanSummary(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const loans = await prisma.loan.findMany({
    where: {
      userId,
    },
  });

  const activeLoans = loans.filter(
    (loan) => loan.status === "ACTIVE"
  );

  const totalPrincipal = loans.reduce(
    (sum, loan) =>
      sum + Number(loan.principalAmount || 0),
    0
  );

  const totalPaid = loans.reduce(
    (sum, loan) =>
      sum + Number(loan.paidAmount || 0),
    0
  );

  const totalRemaining = loans.reduce(
    (sum, loan) =>
      sum + Number(loan.remainingAmount || 0),
    0
  );

  const totalMonthlyEmi = activeLoans.reduce(
    (sum, loan) =>
      sum + Number(loan.monthlyEmi || 0),
    0
  );

  return {
    totalLoans: loans.length,
    activeLoans: activeLoans.length,
    totalPrincipal,
    totalPaid,
    totalRemaining,
    totalMonthlyEmi,
  };
}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  getUserLoans,
  getActiveLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  getLoanSummary,
  calculateMonthlyEmi,
  calculateNextPaymentDate,
};