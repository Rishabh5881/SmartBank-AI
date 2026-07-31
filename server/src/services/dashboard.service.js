const prisma = require("../config/prisma");

const {
  getFinancialInsights
} = require("./insight.service");




// ==========================
// GET DASHBOARD SUMMARY
// ==========================

async function getDashboardSummary(userId) {


  if(!userId){

    throw new Error(
      "User ID is required"
    );

  }





  const user =
    await prisma.user.findUnique({

      where:{
        id:userId
      },


      select:{

        id:true,

        name:true,

        email:true

      }

    });





  if(!user){

    throw new Error(
      "User not found"
    );

  }






  const accounts =
    await prisma.account.findMany({

      where:{
        userId
      },


      select:{

        id:true,

        accountNumber:true,

        accountType:true,

        balance:true,

        currency:true,

        status:true

      },


      orderBy:{

        createdAt:"desc"

      }

    });







  const totalBalance =
    accounts.reduce(

      (sum,account)=>
        sum + Number(account.balance),

      0

    );







  const recentTransactions =
    await prisma.transaction.findMany({

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



      orderBy:{

        createdAt:"desc"

      },



      take:5,



      select:{


        id:true,

        amount:true,

        type:true,

        status:true,

        description:true,

        createdAt:true,


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


      }


    });








  const aiInsights =
    await getFinancialInsights(userId);








  return {


    user,



    summary:{


      totalAccounts:
        accounts.length,


      totalBalance


    },



    accounts,



    recentTransactions,



    financialHealth:{


      score:
        aiInsights.financialScore,


      summary:
        aiInsights.summary,


      insights:
        aiInsights.insights


    }


  };


}







module.exports = {

  getDashboardSummary

};