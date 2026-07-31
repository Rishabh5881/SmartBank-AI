const userService = require("../services/user.service");



// GET PROFILE

async function getProfileController(req,res,next){


    try{


        const user =
        await userService.getProfile(
            req.user.id
        );



        res.status(200).json({

            success:true,

            message:"Profile fetched successfully",

            data:user

        });



    }catch(error){

        next(error);

    }

}






// UPDATE PROFILE

async function updateProfileController(req,res,next){


    try{


        const user =
        await userService.updateProfile(

            req.user.id,

            req.body

        );



        res.status(200).json({

            success:true,

            message:"Profile updated successfully",

            data:user

        });



    }catch(error){

        next(error);

    }

}





module.exports = {

    getProfileController,
    updateProfileController

};