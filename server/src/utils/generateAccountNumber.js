const prisma = require("../config/prisma");


// =====================================
// GENERATE UNIQUE ACCOUNT NUMBER
// =====================================

async function generateUniqueAccountNumber() {

  let accountNumber;
  let exists = true;


  while (exists) {

    // 12 digit account number
    accountNumber = String(
      Math.floor(
        100000000000 +
        Math.random() * 900000000000
      )
    );


    const existingAccount =
      await prisma.account.findUnique({

        where: {
          accountNumber,
        },

      });


    exists = !!existingAccount;
  }


  return accountNumber;
}


// =====================================
// EXPORT
// =====================================

module.exports = {
  generateUniqueAccountNumber,
};