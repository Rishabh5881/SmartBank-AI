const prisma = require("../config/prisma");

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

    user: loan.user
      ? {
          id: loan.user.id,
          name: loan.user.name,
          email: loan.user.email,
        }
      : null,

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
// GET PENDING LOANS
// ==========================================

async function getPendingLoans() {
  const loans = await prisma.loan.findMany({
    where: {
      status: "PENDING",
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return loans.map(serializeLoan);
}

// ==========================================
// GET ALL ADMIN LOANS
// ==========================================

async function getAllAdminLoans() {
  const loans = await prisma.loan.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return loans.map(serializeLoan);
}

// ==========================================
// GET SINGLE ADMIN LOAN
// ==========================================

async function getAdminLoanById(loanId) {
  if (!loanId) {
    throw new Error("Loan ID is required");
  }

  const loan = await prisma.loan.findUnique({
    where: {
      id: loanId,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
// APPROVE LOAN
// ==========================================

async function approveLoan(loanId) {
  if (!loanId) {
    throw new Error("Loan ID is required");
  }

  const existingLoan = await prisma.loan.findUnique({
    where: {
      id: loanId,
    },
  });

  if (!existingLoan) {
    const error = new Error("Loan not found");

    error.statusCode = 404;

    throw error;
  }

  if (existingLoan.status !== "PENDING") {
    throw new Error(
      `Loan cannot be approved because its current status is ${existingLoan.status}`
    );
  }

  // ==========================================
  // CALCULATE FIRST PAYMENT DATE
  // ==========================================

  const nextPaymentDate = new Date();

  nextPaymentDate.setMonth(
    nextPaymentDate.getMonth() + 1
  );

  // ==========================================
  // APPROVE
  // ==========================================

  const approvedLoan = await prisma.loan.update({
    where: {
      id: existingLoan.id,
    },

    data: {
      status: "ACTIVE",
      nextPaymentDate,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return serializeLoan(approvedLoan);
}

// ==========================================
// REJECT LOAN
// ==========================================

async function rejectLoan(loanId) {
  if (!loanId) {
    throw new Error("Loan ID is required");
  }

  const existingLoan = await prisma.loan.findUnique({
    where: {
      id: loanId,
    },
  });

  if (!existingLoan) {
    const error = new Error("Loan not found");

    error.statusCode = 404;

    throw error;
  }

  if (existingLoan.status !== "PENDING") {
    throw new Error(
      `Loan cannot be rejected because its current status is ${existingLoan.status}`
    );
  }

  const rejectedLoan = await prisma.loan.update({
    where: {
      id: existingLoan.id,
    },

    data: {
      status: "CLOSED",
      nextPaymentDate: null,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return serializeLoan(rejectedLoan);
}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  getPendingLoans,
  getAllAdminLoans,
  getAdminLoanById,
  approveLoan,
  rejectLoan,
};