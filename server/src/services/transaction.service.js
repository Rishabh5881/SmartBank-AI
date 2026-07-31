const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");


// =====================
// VALIDATE AMOUNT
// =====================

function assertValidAmount(amount) {


  const numericAmount =
    Number(amount);



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


  if(!userId){

    throw ApiError.badRequest(
      "User ID is required"
    );

  }



  if(!data){

    throw ApiError.badRequest(
      "Deposit data missing"
    );

  }



  const {
    accountId,
    amount
  } = data;



  const validAmount =
    assertValidAmount(amount);




  const account =
    await prisma.account.findFirst({

      where:{
        id: accountId,
        userId
      }

    });




  if(!account){

    throw ApiError.notFound(
      "Account not found"
    );

  }




  return await prisma.$transaction(
    async(tx)=>{


      const updatedAccount =
      await tx.account.update({

        where:{
          id:accountId
        },

        data:{
          balance:{
            increment:validAmount
          }
        }

      });




      await tx.transaction.create({

        data:{

          amount:validAmount,

          type:"DEPOSIT",

          status:"COMPLETED",

          description:"Money deposited",

          balanceAfter:
            updatedAccount.balance,

          sourceAccountId:
            accountId,

          destinationAccountId:
            accountId

        }

      });



      return updatedAccount;


    }
  );

}







// =====================
// WITHDRAW
// =====================

async function withdraw(userId,data){


  if(!data){

    throw ApiError.badRequest(
      "Withdrawal data missing"
    );

  }



  const {
    accountId,
    amount
  } = data;




  const validAmount =
    assertValidAmount(amount);




  const account =
    await prisma.account.findFirst({

      where:{
        id:accountId,
        userId
      }

    });




  if(!account){

    throw ApiError.notFound(
      "Account not found"
    );

  }





  if(Number(account.balance) < validAmount){

    throw ApiError.badRequest(
      "Insufficient balance"
    );

  }





  return await prisma.$transaction(
    async(tx)=>{


      const updatedAccount =
      await tx.account.update({

        where:{
          id:accountId
        },

        data:{
          balance:{
            decrement:validAmount
          }
        }

      });




      await tx.transaction.create({

        data:{

          amount:validAmount,

          type:"WITHDRAWAL",

          status:"COMPLETED",

          description:"Money withdrawn",

          balanceAfter:
            updatedAccount.balance,

          sourceAccountId:
            accountId

        }

      });



      return updatedAccount;


    }
  );

}







// =====================
// TRANSFER
// =====================

async function transfer(userId,data){


  if(!data){

    throw ApiError.badRequest(
      "Transfer data missing"
    );

  }



  const {
    fromAccountId,
    toAccountId,
    amount
  } = data;




  const validAmount =
    assertValidAmount(amount);




  if(fromAccountId === toAccountId){

    throw ApiError.badRequest(
      "Cannot transfer to the same account"
    );

  }





  const sender =
    await prisma.account.findFirst({

      where:{
        id:fromAccountId,
        userId
      }

    });





  if(!sender){

    throw ApiError.notFound(
      "Sender account not found"
    );

  }





  if(Number(sender.balance) < validAmount){

    throw ApiError.badRequest(
      "Insufficient balance"
    );

  }





  const receiver =
    await prisma.account.findUnique({

      where:{
        id:toAccountId
      }

    });





  if(!receiver){

    throw ApiError.notFound(
      "Receiver account not found"
    );

  }





  return await prisma.$transaction(
    async(tx)=>{


      const updatedSender =
      await tx.account.update({

        where:{
          id:fromAccountId
        },

        data:{
          balance:{
            decrement:validAmount
          }
        }

      });




      const updatedReceiver =
      await tx.account.update({

        where:{
          id:toAccountId
        },

        data:{
          balance:{
            increment:validAmount
          }
        }

      });





      await tx.transaction.create({

        data:{

          amount:validAmount,

          type:"TRANSFER",

          status:"COMPLETED",

          description:"Money transferred",

          balanceAfter:
            updatedSender.balance,

          sourceAccountId:
            fromAccountId,

          destinationAccountId:
            toAccountId

        }

      });




      return {

        sender:updatedSender,

        receiver:updatedReceiver

      };


    }
  );

}







// =====================
// GET TRANSACTIONS
// =====================

async function getTransactions(userId){


  if(!userId){

    throw ApiError.badRequest(
      "User ID is required"
    );

  }




  return await prisma.transaction.findMany({

    where:{


      OR:[

        {

          sourceAccount:{
            userId
          }

        },

        {

          destinationAccount:{
            userId
          }

        }

      ]

    },



    include:{


      sourceAccount:{

        select:{
          accountNumber:true
        }

      },


      destinationAccount:{

        select:{
          accountNumber:true
        }

      }


    },



    orderBy:{

      createdAt:"desc"

    }

  });


}







module.exports = {

  deposit,

  withdraw,

  transfer,

  getTransactions

};