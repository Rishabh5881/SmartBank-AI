const prisma = require("../config/prisma");


const MONTHS_TO_ANALYZE = 6;



// ======================
// GET USER ACCOUNT IDS
// ======================

async function getUserAccountIds(userId) {


  const accounts =
    await prisma.account.findMany({

      where:{
        userId
      },

      select:{
        id:true
      }

    });



  return accounts.map(
    account => account.id
  );

}






// ======================
// SUM TRANSACTION AMOUNTS
// ======================

function sumAmounts(transactions = []) {


  return transactions.reduce(

    (total,txn)=>
      total + Number(txn.amount),

    0

  );

}







// ======================
// BUILD MONTHLY BUCKETS
// ======================

function buildMonthlyBuckets(monthsCount) {


  const buckets = {};

  const now = new Date();



  for(
    let i = monthsCount - 1;
    i >= 0;
    i--
  ){


    const date =
      new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );



    const key =
      `${date.getFullYear()}-${String(
        date.getMonth()+1
      ).padStart(2,"0")}`;



    buckets[key] = {

      month:key,

      deposits:0,

      withdrawals:0,

      transfersOut:0,

      transfersIn:0,

      netSpending:0

    };


  }



  return buckets;

}






function monthKeyFromDate(date){


  const d = new Date(date);



  return `${d.getFullYear()}-${String(
    d.getMonth()+1
  ).padStart(2,"0")}`;

}








// ======================
// SPENDING ANALYTICS
// ======================

async function getSpendingAnalytics(userId){


  if(!userId){

    throw new Error(
      "User ID is required"
    );

  }





  const accountIds =
    await getUserAccountIds(userId);





  if(accountIds.length === 0){


    return {

      totalDeposits:0,

      totalWithdrawals:0,

      totalTransfersOut:0,

      totalTransfersIn:0,

      totalSpending:0,

      monthly:
        Object.values(
          buildMonthlyBuckets(
            MONTHS_TO_ANALYZE
          )
        )

    };


  }








  const rangeStart =
    new Date();


  rangeStart.setMonth(
    rangeStart.getMonth()
    -
    (MONTHS_TO_ANALYZE - 1)
  );


  rangeStart.setDate(1);

  rangeStart.setHours(
    0,
    0,
    0,
    0
  );







  const [
    deposits,
    withdrawals,
    transfersOut,
    transfersIn

  ] = await Promise.all([


    prisma.transaction.findMany({

      where:{

        type:"DEPOSIT",

        status:"COMPLETED",

        destinationAccountId:{
          in:accountIds
        }

      },

      select:{
        amount:true,
        createdAt:true
      }

    }),





    prisma.transaction.findMany({

      where:{

        type:"WITHDRAWAL",

        status:"COMPLETED",

        sourceAccountId:{
          in:accountIds
        }

      },

      select:{
        amount:true,
        createdAt:true
      }

    }),





    prisma.transaction.findMany({

      where:{

        type:"TRANSFER",

        status:"COMPLETED",

        sourceAccountId:{
          in:accountIds
        }

      },

      select:{
        amount:true,
        createdAt:true
      }

    }),





    prisma.transaction.findMany({

      where:{

        type:"TRANSFER",

        status:"COMPLETED",

        destinationAccountId:{
          in:accountIds
        }

      },

      select:{
        amount:true,
        createdAt:true
      }

    })

  ]);







  const totalDeposits =
    sumAmounts(deposits);


  const totalWithdrawals =
    sumAmounts(withdrawals);


  const totalTransfersOut =
    sumAmounts(transfersOut);


  const totalTransfersIn =
    sumAmounts(transfersIn);



  const totalSpending =
    totalWithdrawals +
    totalTransfersOut;








  const buckets =
    buildMonthlyBuckets(
      MONTHS_TO_ANALYZE
    );






  function addToBucket(txn,field){


    if(
      new Date(txn.createdAt)
      < rangeStart
    ){

      return;

    }



    const key =
      monthKeyFromDate(
        txn.createdAt
      );



    if(buckets[key]){

      buckets[key][field] +=
        Number(txn.amount);

    }


  }







  deposits.forEach(
    txn =>
      addToBucket(
        txn,
        "deposits"
      )
  );


  withdrawals.forEach(
    txn =>
      addToBucket(
        txn,
        "withdrawals"
      )
  );


  transfersOut.forEach(
    txn =>
      addToBucket(
        txn,
        "transfersOut"
      )
  );


  transfersIn.forEach(
    txn =>
      addToBucket(
        txn,
        "transfersIn"
      )
  );







  Object.values(buckets)
    .forEach(bucket=>{


      bucket.netSpending =
        bucket.withdrawals +
        bucket.transfersOut;


    });







  return {


    totalDeposits,

    totalWithdrawals,

    totalTransfersOut,

    totalTransfersIn,

    totalSpending,

    monthly:
      Object.values(buckets)


  };


}







module.exports = {

  getSpendingAnalytics

};