const dashboardService = require("../services/dashboard.service");



async function dashboardSummaryController(req,res,next){

    try {


        const result = await dashboardService.getDashboardSummary(
            req.user.id
        );



        res.status(200).json({

            success:true,

            message:"Dashboard summary fetched successfully",

            data:result

        });



    } catch(err){

        next(err);

    }

}



module.exports = {

    dashboardSummaryController

};