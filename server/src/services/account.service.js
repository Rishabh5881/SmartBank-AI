const prisma = require("../config/prisma");

const {
  generateUniqueAccountNumber,
} = require("../utils/generateAccountNumber");


const ALLOWED_ACCOUNT_TYPES = [
  "SAVINGS",
  "CURRENT"
];


const ACCOUNT_SELECT_FIELDS = {

  id: true,

  accountNumber: true,

  accountType: true,

  balance: true,

  currency: true,

  status: true,

  createdAt: true,

  updatedAt: true,

};




// ======================
// CREATE ACCOUNT
// ======================

async function createAccount(userId, data) {


  if (!userId) {

    throw new Error(
      "User ID is required"
    );

  }



  const accountType =
    data?.accountType
      ? String(data.accountType)
          .toUpperCase()
      : "SAVINGS";



  if (
    !ALLOWED_ACCOUNT_TYPES.includes(
      accountType
    )
  ) {

    throw new Error(
      `Invalid account type. Allowed types: ${ALLOWED_ACCOUNT_TYPES.join(", ")}`
    );

  }



  const currency =
    data?.currency
      ? String(data.currency)
          .toUpperCase()
      : "INR";



  const accountNumber =
    await generateUniqueAccountNumber();




  const account =
    await prisma.account.create({

      data: {

        accountNumber,

        accountType,

        currency,

        userId,

      },


      select:
        ACCOUNT_SELECT_FIELDS,

    });



  return account;

}







// ======================
// GET ALL ACCOUNTS
// ======================

async function getAccountsForUser(userId) {


  if (!userId) {

    throw new Error(
      "User ID is required"
    );

  }



  return prisma.account.findMany({

    where: {

      userId,

    },


    select:
      ACCOUNT_SELECT_FIELDS,


    orderBy: {

      createdAt: "desc",

    },

  });


}







// ======================
// GET SINGLE ACCOUNT
// ======================

async function getAccountByIdForUser(
  userId,
  accountId
) {


  if (!userId) {

    throw new Error(
      "User ID is required"
    );

  }



  if (!accountId) {

    throw new Error(
      "Account ID is required"
    );

  }



  const account =
    await prisma.account.findUnique({

      where: {

        id: accountId,

      },


      select: {

        ...ACCOUNT_SELECT_FIELDS,

        userId: true,

      },

    });




  if (
    !account ||
    account.userId !== userId
  ) {

    throw new Error(
      "Account not found"
    );

  }




  const {
    userId: _omit,
    ...safeAccount
  } = account;



  return safeAccount;

}







module.exports = {

  createAccount,

  getAccountsForUser,

  getAccountByIdForUser,

};