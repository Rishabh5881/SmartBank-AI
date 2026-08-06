const prisma = require("../config/prisma");

// =====================================
// ADMIN SERVICE
// =====================================

// =====================================
// GET ADMIN OVERVIEW
// =====================================

async function getAdminOverview() {
  const [
    totalCustomers,
    activeAccounts,
    depositResult,
    transactionCount,
  ] = await Promise.all([
    // ---------------------------------
    // TOTAL CUSTOMERS
    // ---------------------------------

    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    // ---------------------------------
    // ACTIVE ACCOUNTS
    // ---------------------------------

    prisma.account.count({
      where: {
        status: "ACTIVE",
      },
    }),

    // ---------------------------------
    // TOTAL DEPOSITS
    // ---------------------------------

    prisma.account.aggregate({
      _sum: {
        balance: true,
      },

      where: {
        status: "ACTIVE",
      },
    }),

    // ---------------------------------
    // TOTAL TRANSACTIONS
    // ---------------------------------

    prisma.transaction.count(),
  ]);

  return {
    totalCustomers,
    activeAccounts,
    totalDeposits: depositResult._sum.balance || 0,
    transactionCount,
    securityScore: 98.4,
  };
}

// =====================================
// GET CUSTOMERS
// =====================================

async function getCustomers({
  search = "",
  limit = 20,
  offset = 0,
} = {}) {
  const normalizedSearch = String(search || "")
    .trim()
    .toLowerCase();

  const safeLimit = Math.min(
    Math.max(Number(limit) || 20, 1),
    100
  );

  const safeOffset = Math.max(
    Number(offset) || 0,
    0
  );

  const where = {
    role: "CUSTOMER",

    ...(normalizedSearch
      ? {
          OR: [
            {
              name: {
                contains: normalizedSearch,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: normalizedSearch,
                mode: "insensitive",
              },
            },
            {
              id: {
                contains: normalizedSearch,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,

        accounts: {
          select: {
            id: true,
            accountNumber: true,
            accountType: true,
            balance: true,
            currency: true,
            status: true,
          },

          orderBy: {
            createdAt: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip: safeOffset,
      take: safeLimit,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  const customers = users.map((user) => {
    const totalBalance = user.accounts.reduce(
      (sum, account) => {
        return (
          sum +
          Number(account.balance || 0)
        );
      },
      0
    );

    const hasSuspendedAccount =
      user.accounts.some(
        (account) =>
          String(account.status)
            .toUpperCase() === "SUSPENDED"
      );

    const hasPendingAccount =
      user.accounts.some(
        (account) =>
          String(account.status)
            .toUpperCase() === "PENDING"
      );

    let status = "Active";

    if (hasSuspendedAccount) {
      status = "Suspended";
    } else if (hasPendingAccount) {
      status = "Pending";
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status,
      balance: totalBalance,
      accountCount: user.accounts.length,
      accounts: user.accounts,
      joined: user.createdAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  });

  return {
    customers,
    pagination: {
      total,
      limit: safeLimit,
      offset: safeOffset,
      hasMore:
        safeOffset + customers.length < total,
    },
  };
}

// =====================================
// GET RECENT ACTIVITY
// =====================================

async function getRecentActivity({
  limit = 10,
} = {}) {
  const safeLimit = Math.min(
    Math.max(Number(limit) || 10, 1),
    50
  );

  const [
    recentUsers,
    recentTransactions,
    recentCards,
    recentLoans,
  ] = await Promise.all([
    // ---------------------------------
    // NEW USERS
    // ---------------------------------

    prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },

      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: safeLimit,
    }),

    // ---------------------------------
    // RECENT TRANSACTIONS
    // ---------------------------------

    prisma.transaction.findMany({
      select: {
        id: true,
        amount: true,
        type: true,
        status: true,
        description: true,
        createdAt: true,

        sourceAccount: {
          select: {
            accountNumber: true,

            user: {
              select: {
                name: true,
              },
            },
          },
        },

        destinationAccount: {
          select: {
            accountNumber: true,

            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: safeLimit,
    }),

    // ---------------------------------
    // RECENT CARDS
    // ---------------------------------

    prisma.card.findMany({
      select: {
        id: true,
        type: true,
        number: true,
        createdAt: true,

        user: {
          select: {
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: safeLimit,
    }),

    // ---------------------------------
    // RECENT LOANS
    // ---------------------------------

    prisma.loan.findMany({
      select: {
        id: true,
        loanType: true,
        principalAmount: true,
        status: true,
        createdAt: true,

        user: {
          select: {
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: safeLimit,
    }),
  ]);

  const activities = [];

  // =====================================
  // USER ACTIVITIES
  // =====================================

  recentUsers.forEach((user) => {
    activities.push({
      id: `user-${user.id}`,
      type: "USER_REGISTERED",
      title: "New customer registered",
      description: `${user.name} created a new account`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      createdAt: user.createdAt,
    });
  });

  // =====================================
  // TRANSACTION ACTIVITIES
  // =====================================

  recentTransactions.forEach(
    (transaction) => {
      const userName =
        transaction.sourceAccount?.user?.name ||
        transaction.destinationAccount?.user?.name ||
        "Customer";

      activities.push({
        id: `transaction-${transaction.id}`,
        type: "TRANSACTION",
        title: "Transaction processed",
        description: `${userName} processed a ₹${Number(
          transaction.amount || 0
        ).toLocaleString("en-IN")} ${String(
          transaction.type || "transaction"
        ).toLowerCase()}`,
        transaction: {
          id: transaction.id,
          amount: Number(
            transaction.amount || 0
          ),
          type: transaction.type,
          status: transaction.status,
          description:
            transaction.description,
        },
        createdAt: transaction.createdAt,
      });
    }
  );

  // =====================================
  // CARD ACTIVITIES
  // =====================================

  recentCards.forEach((card) => {
    activities.push({
      id: `card-${card.id}`,
      type: "CARD_CREATED",
      title: "Card activity detected",
      description: `${card.type} card created for ${card.user.name}`,
      card: {
        id: card.id,
        type: card.type,
        number: card.number,
      },
      createdAt: card.createdAt,
    });
  });

  // =====================================
  // LOAN ACTIVITIES
  // =====================================

  recentLoans.forEach((loan) => {
    activities.push({
      id: `loan-${loan.id}`,
      type: "LOAN_CREATED",
      title: "Loan application received",
      description: `${loan.user.name} submitted a ${loan.loanType} loan`,
      loan: {
        id: loan.id,
        loanType: loan.loanType,
        principalAmount: Number(
          loan.principalAmount || 0
        ),
        status: loan.status,
      },
      createdAt: loan.createdAt,
    });
  });

  // =====================================
  // SORT ALL ACTIVITIES
  // =====================================

  activities.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return activities.slice(0, safeLimit);
}

// =====================================
// GET ADMIN LOANS
// =====================================

async function getAdminLoans() {
  const loans = await prisma.loan.findMany({
    select: {
      id: true,
      loanType: true,
      principalAmount: true,
      interestRate: true,
      tenureMonths: true,
      monthlyEmi: true,
      totalPayable: true,
      paidAmount: true,
      remainingAmount: true,
      nextPaymentDate: true,
      status: true,
      createdAt: true,
      updatedAt: true,

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

  return loans.map((loan) => ({
    ...loan,
    principalAmount: Number(
      loan.principalAmount
    ),
    interestRate: Number(
      loan.interestRate
    ),
    monthlyEmi: Number(loan.monthlyEmi),
    totalPayable: Number(
      loan.totalPayable
    ),
    paidAmount: Number(
      loan.paidAmount
    ),
    remainingAmount: Number(
      loan.remainingAmount
    ),
  }));
}

// =====================================
// GET CUSTOMER BY ID
// =====================================

async function getCustomerById(userId) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      role: "CUSTOMER",
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,

      accounts: {
        select: {
          id: true,
          accountNumber: true,
          accountType: true,
          balance: true,
          currency: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          createdAt: "asc",
        },
      },

      cards: {
        select: {
          id: true,
          type: true,
          number: true,
          holder: true,
          expiry: true,
          limit: true,
          validity: true,
          interest: true,
          frozen: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },

      loans: {
        select: {
          id: true,
          loanType: true,
          principalAmount: true,
          interestRate: true,
          tenureMonths: true,
          monthlyEmi: true,
          totalPayable: true,
          paidAmount: true,
          remainingAmount: true,
          nextPaymentDate: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const totalBalance = user.accounts.reduce(
    (sum, account) => {
      return (
        sum +
        Number(account.balance || 0)
      );
    },
    0
  );

  return {
    ...user,
    totalBalance,
    accountCount: user.accounts.length,
    cardCount: user.cards.length,
    loanCount: user.loans.length,
  };
}

// =====================================
// EXPORTS
// =====================================

module.exports = {
  getAdminOverview,
  getCustomers,
  getRecentActivity,
  getAdminLoans,
  getCustomerById,
};

