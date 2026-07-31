const {
  getFinancialInsights
} = require("../services/insight.service");



// =====================
// GET FINANCIAL INSIGHTS
// =====================

async function getInsightsController(req,res,next){

  try{


    const userId = req.user.id;


    const insights =
      await getFinancialInsights(userId);



    return res.status(200).json({

      success:true,

      message:
      "Financial insights fetched successfully",

      data: insights

    });



  }catch(error){

    next(error);

  }

}



module.exports = {

  getInsightsController

};