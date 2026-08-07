const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

// =====================
// VALIDATE AMOUNT
// =====================

function assertValidAmount(amount) {
  const numericAmount = Number(amount);

  if (
    amount === undefined ||
    amount === null ||
    Number.isNaN(numericAmount) ||
    numericAmount <= 0
  ) {
    throw ApiError.badRequest(
      "Amount must be a positive number"
    );
  }

  return numericAmount;
}

// =====================
// DEPOSIT
// =====================

async function deposit(userId, data) {
  if (!userId) {
    throw ApiError.badRequest(
      "User ID is required"
    );
  }

  if (!data) {
    throw ApiError.badRequest(
      "Deposit data missing"
    );
  }

  const {
    accountId,
    amount,
  } = data;

  const validAmount =
    assertValidAmount(amount);

  const account =
    await prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });

  if (!account) {
    throw ApiError.notFound(
      "Account not found"
    );
  }

  return await prisma.$transaction(
    async (tx) => {
      const updatedAccount =
        await tx.account.update({
          where: {
            id: accountId,
          },
          data: {
            balance: {
              increment: validAmount,
            },
          },
        });

      await tx.transaction.create({
        data: {
          amount: validAmount,
          type: "DEPOSIT",
          status: "COMPLETED",
          description: "Money deposited",
          balanceAfter:
            updatedAccount.balance,
          sourceAccountId:
            accountId,
          destinationAccountId:
            accountId,
        },
      });

      // =====================
      // 6.6.2 DEPOSIT NOTIFICATION
      // =====================

      await tx.notification.create({
        data: {
          userId,
          title: "Deposit Successful",
          message: `₹${validAmount} has been deposited into your account.`,
          type: "TRANSACTION",
          read: false,
        },
      });

      return updatedAccount;
    }
  );
}

// =====================
// WITHDRAW
// =====================

async function withdraw(userId, data) {
  if (!userId) {
    throw ApiError.badRequest(
      "User ID is required"
    );
  }

  if (!data) {
    throw ApiError.badRequest(
      "Withdrawal data missing"
    );
  }

  const {
    accountId,
    amount,
  } = data;

  const validAmount =
    assertValidAmount(amount);

  const account =
    await prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });

  if (!account) {
    throw ApiError.notFound(
      "Account not found"
    );
  }

  if (
    Number(account.balance) <
    validAmount
  ) {
    throw ApiError.badRequest(
      "Insufficient balance"
    );
  }

  return await prisma.$transaction(
    async (tx) => {
      const updatedAccount =
        await tx.account.update({
          where: {
            id: accountId,
          },
          data: {
            balance: {
              decrement: validAmount,
            },
          },
        });

      await tx.transaction.create({
        data: {
          amount: validAmount,
          type: "WITHDRAWAL",
          status: "COMPLETED",
          description: "Money withdrawn",
          balanceAfter:
            updatedAccount.balance,
          sourceAccountId:
            accountId,
        },
      });

      // =====================
      // 6.6.2 WITHDRAW NOTIFICATION
      // =====================

      await tx.notification.create({
        data: {
          userId,
          title: "Withdrawal Successful",
          message: `₹${validAmount} has been withdrawn from your account.`,
          type: "TRANSACTION",
          read: false,
        },
      });

      return updatedAccount;
    }
  );
}


// =====================
// TRANSFER
// =====================

async function transfer(userId, data) {
  if (!userId) {
    throw ApiError.badRequest(
      "User ID is required"
    );
  }

  if (!data) {
    throw ApiError.badRequest(
      "Transfer data missing"
    );
  }

  const {
    fromAccountId,
    toAccountId,
    amount,
  } = data;

  const validAmount =
    assertValidAmount(amount);

  if (!fromAccountId || !toAccountId) {
    throw ApiError.badRequest(
      "Sender and receiver account are required"
    );
  }

  if (fromAccountId === toAccountId) {
    throw ApiError.badRequest(
      "Cannot transfer to the same account"
    );
  }

  // =====================
  // FIND SENDER ACCOUNT
  // =====================

  const sender =
    await prisma.account.findFirst({
      where: {
        id: fromAccountId,
        userId,
      },
    });

  if (!sender) {
    throw ApiError.notFound(
      "Sender account not found"
    );
  }

  // =====================
  // CHECK BALANCE
  // =====================

  if (
    Number(sender.balance) <
    validAmount
  ) {
    throw ApiError.badRequest(
      "Insufficient balance"
    );
  }

  // =====================
  // FIND RECEIVER
  // ACCOUNT ID OR ACCOUNT NUMBER
  // =====================

  const receiver =
    await prisma.account.findFirst({
      where: {
        OR: [
          {
            id: toAccountId,
          },
          {
            accountNumber: toAccountId,
          },
        ],
      },
    });

  if (!receiver) {
    throw ApiError.notFound(
      "Receiver account not found"
    );
  }

  // =====================
  // SAME ACCOUNT SAFETY
  // =====================

  if (sender.id === receiver.id) {
    throw ApiError.badRequest(
      "Cannot transfer to the same account"
    );
  }

  // =====================
  // ATOMIC TRANSFER
  // =====================

  return await prisma.$transaction(
    async (tx) => {
      const updatedSender =
        await tx.account.update({
          where: {
            id: sender.id,
          },
          data: {
            balance: {
              decrement: validAmount,
            },
          },
        });

      const updatedReceiver =
        await tx.account.update({
          where: {
            id: receiver.id,
          },
          data: {
            balance: {
              increment: validAmount,
            },
          },
        });

      // =====================
      // TRANSACTION RECORD
      // =====================

      await tx.transaction.create({
        data: {
          amount: validAmount,
          type: "TRANSFER",
          status: "COMPLETED",
          description: "Money transferred",
          balanceAfter:
            updatedSender.balance,
          sourceAccountId:
            sender.id,
          destinationAccountId:
            receiver.id,
        },
      });

      // =====================
      // SENDER NOTIFICATION
      // =====================

      await tx.notification.create({
        data: {
          userId,
          title: "Transfer Successful",
          message: `₹${validAmount} has been transferred successfully.`,
          type: "TRANSACTION",
          read: false,
        },
      });

      // =====================
      // RECEIVER NOTIFICATION
      // =====================

      await tx.notification.create({
        data: {
          userId: receiver.userId,
          title: "Money Received",
          message: `₹${validAmount} has been received in your account.`,
          type: "TRANSACTION",
          read: false,
        },
      });

      return {
        sender: updatedSender,
        receiver: updatedReceiver,
      };
    }
  );
}



// =====================
// GET TRANSACTIONS
// PAGINATION / LIMIT
// =====================

async function getTransactions(
  userId,
  page = 1,
  limit = 10
) {
  if (!userId) {
    throw ApiError.badRequest(
      "User ID is required"
    );
  }

  const parsedPage =
    Number.parseInt(page, 10);

  const parsedLimit =
    Number.parseInt(limit, 10);

  const currentPage =
    Number.isInteger(parsedPage) &&
    parsedPage > 0
      ? parsedPage
      : 1;

  const pageSize =
    Number.isInteger(parsedLimit) &&
    parsedLimit > 0
      ? Math.min(parsedLimit, 50)
      : 10;

  const skip =
    (currentPage - 1) * pageSize;

  const where = {
    OR: [
      {
        sourceAccount: {
          userId,
        },
      },
      {
        destinationAccount: {
          userId,
        },
      },
    ],
  };

  const [
    transactions,
    total,
  ] = await Promise.all([
    prisma.transaction.findMany({
      where,

      include: {
        sourceAccount: {
          select: {
            accountNumber: true,
          },
        },

        destinationAccount: {
          select: {
            accountNumber: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: pageSize,
    }),

    prisma.transaction.count({
      where,
    }),
  ]);

  const totalPages =
    total === 0
      ? 0
      : Math.ceil(
          total / pageSize
        );

  return {
    transactions,

    pagination: {
      page: currentPage,
      limit: pageSize,
      total,
      totalPages,
      hasNextPage:
        currentPage < totalPages,
      hasPreviousPage:
        currentPage > 1,
    },
  };
}

// =====================
// EXPORTS
// =====================

module.exports = {
  deposit,
  withdraw,
  transfer,
  getTransactions,
};

