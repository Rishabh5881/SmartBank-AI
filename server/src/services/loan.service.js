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

  return loans.map(serializeLoan);
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
    monthlyEmi,
    totalPayable,
    paidAmount,
    remainingAmount,
    nextPaymentDate,
    status,
  } = data || {};

  // ------------------------------------------
  // REQUIRED FIELDS
  // ------------------------------------------

  if (!loanType) {
    throw new Error("Loan type is required");
  }

  const principal = toNumber(principalAmount);
  const rate = toNumber(interestRate);
  const tenure = Number(tenureMonths);
  const emi = toNumber(monthlyEmi);

  if (principal === null || principal <= 0) {
    throw new Error("Principal amount must be greater than 0");
  }

  if (rate === null || rate < 0) {
    throw new Error("Interest rate cannot be negative");
  }

  if (!Number.isInteger(tenure) || tenure <= 0) {
    throw new Error("Tenure must be a positive number of months");
  }

  if (emi === null || emi <= 0) {
    throw new Error("Monthly EMI must be greater than 0");
  }

  // ------------------------------------------
  // CALCULATE TOTAL PAYABLE
  // ------------------------------------------

  const calculatedTotalPayable =
    totalPayable !== undefined && totalPayable !== null
      ? toNumber(totalPayable)
      : emi * tenure;

  if (
    calculatedTotalPayable === null ||
    calculatedTotalPayable <= 0
  ) {
    throw new Error("Total payable amount must be greater than 0");
  }

  // ------------------------------------------
  // PAID / REMAINING AMOUNT
  // ------------------------------------------

  const normalizedPaidAmount =
    paidAmount !== undefined && paidAmount !== null
      ? toNumber(paidAmount)
      : 0;

  if (
    normalizedPaidAmount === null ||
    normalizedPaidAmount < 0
  ) {
    throw new Error("Paid amount cannot be negative");
  }

  const calculatedRemainingAmount =
    remainingAmount !== undefined &&
    remainingAmount !== null
      ? toNumber(remainingAmount)
      : Math.max(
          calculatedTotalPayable - normalizedPaidAmount,
          0
        );

  if (
    calculatedRemainingAmount === null ||
    calculatedRemainingAmount < 0
  ) {
    throw new Error("Remaining amount cannot be negative");
  }

  // ------------------------------------------
  // STATUS
  // ------------------------------------------

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

  // ------------------------------------------
  // NEXT PAYMENT DATE
  // ------------------------------------------

  let normalizedNextPaymentDate = null;

  if (nextPaymentDate) {
    const parsedDate = new Date(nextPaymentDate);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new Error("Invalid next payment date");
    }

    normalizedNextPaymentDate = parsedDate;
  }

  // ------------------------------------------
  // CREATE
  // ------------------------------------------

  const loan = await prisma.loan.create({
    data: {
      userId,
      loanType: String(loanType).trim(),
      principalAmount: principal,
      interestRate: rate,
      tenureMonths: tenure,
      monthlyEmi: emi,
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

  // ------------------------------------------
  // LOAN TYPE
  // ------------------------------------------

  if (data?.loanType !== undefined) {
    const loanType = String(data.loanType).trim();

    if (!loanType) {
      throw new Error("Loan type cannot be empty");
    }

    updateData.loanType = loanType;
  }

  // ------------------------------------------
  // PRINCIPAL
  // ------------------------------------------

  if (data?.principalAmount !== undefined) {
    const principal = toNumber(data.principalAmount);

    if (principal === null || principal <= 0) {
      throw new Error("Principal amount must be greater than 0");
    }

    updateData.principalAmount = principal;
  }

  // ------------------------------------------
  // INTEREST RATE
  // ------------------------------------------

  if (data?.interestRate !== undefined) {
    const rate = toNumber(data.interestRate);

    if (rate === null || rate < 0) {
      throw new Error("Interest rate cannot be negative");
    }

    updateData.interestRate = rate;
  }

  // ------------------------------------------
  // TENURE
  // ------------------------------------------

  if (data?.tenureMonths !== undefined) {
    const tenure = Number(data.tenureMonths);

    if (!Number.isInteger(tenure) || tenure <= 0) {
      throw new Error(
        "Tenure must be a positive number of months"
      );
    }

    updateData.tenureMonths = tenure;
  }

  // ------------------------------------------
  // MONTHLY EMI
  // ------------------------------------------

  if (data?.monthlyEmi !== undefined) {
    const emi = toNumber(data.monthlyEmi);

    if (emi === null || emi <= 0) {
      throw new Error("Monthly EMI must be greater than 0");
    }

    updateData.monthlyEmi = emi;
  }

  // ------------------------------------------
  // TOTAL PAYABLE
  // ------------------------------------------

  if (data?.totalPayable !== undefined) {
    const totalPayable = toNumber(data.totalPayable);

    if (totalPayable === null || totalPayable <= 0) {
      throw new Error(
        "Total payable amount must be greater than 0"
      );
    }

    updateData.totalPayable = totalPayable;
  }

  // ------------------------------------------
  // PAID AMOUNT
  // ------------------------------------------

  if (data?.paidAmount !== undefined) {
    const paidAmount = toNumber(data.paidAmount);

    if (paidAmount === null || paidAmount < 0) {
      throw new Error(
        "Paid amount cannot be negative"
      );
    }

    updateData.paidAmount = paidAmount;
  }

  // ------------------------------------------
  // REMAINING AMOUNT
  // ------------------------------------------

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

    updateData.remainingAmount = remainingAmount;
  }

  // ------------------------------------------
  // NEXT PAYMENT DATE
  // ------------------------------------------

  if (data?.nextPaymentDate !== undefined) {
    if (!data.nextPaymentDate) {
      updateData.nextPaymentDate = null;
    } else {
      const parsedDate = new Date(data.nextPaymentDate);

      if (Number.isNaN(parsedDate.getTime())) {
        throw new Error(
          "Invalid next payment date"
        );
      }

      updateData.nextPaymentDate = parsedDate;
    }
  }

  // ------------------------------------------
  // STATUS
  // ------------------------------------------

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
      throw new Error("Invalid loan status");
    }

    updateData.status = status;
  }

  // ------------------------------------------
  // UPDATE
  // ------------------------------------------

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
};