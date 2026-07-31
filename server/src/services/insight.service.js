const prisma = require("../config/prisma");



// =====================
// FINANCIAL INSIGHTS
// =====================

async function getFinancialInsights(userId) {


  if(!userId){

    throw new Error(
      "User ID is required"
    );

  }





  const transactions =
    await prisma.transaction.findMany({

      where:{

        status:"COMPLETED",

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


      orderBy:{

        createdAt:"desc"

      }

    });






  let totalIncome = 0;

  let totalExpense = 0;

  let deposits = 0;

  let withdrawals = 0;

  let transfersOut = 0;







  transactions.forEach(
    transaction=>{


      const amount =
        Number(transaction.amount);




      switch(transaction.type){


        case "DEPOSIT":

          deposits += amount;

          totalIncome += amount;

          break;




        case "WITHDRAWAL":

          withdrawals += amount;

          totalExpense += amount;

          break;




        case "TRANSFER":

          transfersOut += amount;

          totalExpense += amount;

          break;


      }


    }
  );








  let financialScore = 50;




  if(totalIncome > totalExpense){

    financialScore += 20;

  }





  if(
    totalIncome > 0 &&
    totalExpense < totalIncome * 0.5
  ){

    financialScore += 20;

  }





  if(financialScore > 100){

    financialScore = 100;

  }





  if(financialScore < 0){

    financialScore = 0;

  }








  const insights = [];






  if(
    totalIncome > 0 &&
    totalExpense > totalIncome * 0.7
  ){


    insights.push({

      type:"WARNING",

      message:
      "Your spending is high compared to your income"

    });


  }
  else{


    insights.push({

      type:"GOOD",

      message:
      "Your spending pattern looks healthy"

    });


  }








  if(deposits > withdrawals){


    insights.push({

      type:"SAVING",

      message:
      "You are maintaining a positive saving habit"

    });


  }








  insights.push({

    type:"INFO",

    message:
    `Your total spending is ₹${totalExpense}`

  });









  return {


    financialScore,



    summary:{


      totalIncome,


      totalExpense,


      deposits,


      withdrawals,


      transfersOut


    },



    insights


  };


}







module.exports = {

  getFinancialInsights

};