const prisma = require("../config/prisma");


const PROFILE_FIELDS = {

    id:true,

    fullName:true,

    email:true,

    phoneNumber:true,

    role:true,

    isActive:true,

    createdAt:true,

    updatedAt:true

};




// =====================
// GET PROFILE
// =====================

async function getProfile(userId){


    if(!userId){

        throw new Error(
            "User ID required"
        );

    }



    const user =
    await prisma.user.findUnique({

        where:{
            id:userId
        },


        select:PROFILE_FIELDS

    });




    if(!user){

        throw new Error(
            "User not found"
        );

    }




    return user;

}







// =====================
// UPDATE PROFILE
// =====================

async function updateProfile(userId,data){


    if(!userId){

        throw new Error(
            "User ID required"
        );

    }




    if(!data){

        throw new Error(
            "Update data missing"
        );

    }




    const {
        fullName,
        phoneNumber

    } = data;






    if(
        fullName === undefined &&
        phoneNumber === undefined
    ){

        throw new Error(
            "Nothing to update"
        );

    }





    const updateData = {};







    if(fullName !== undefined){


        if(
            typeof fullName !== "string" ||
            fullName.trim()===""
        ){

            throw new Error(
                "Invalid full name"
            );

        }



        updateData.fullName =
            fullName.trim();

    }









    if(phoneNumber !== undefined){


        const normalizedPhone =
            phoneNumber
            ? String(phoneNumber).trim()
            : null;





        if(normalizedPhone){


            const existingUser =
            await prisma.user.findUnique({

                where:{
                    phoneNumber:
                        normalizedPhone
                }

            });





            if(
                existingUser &&
                existingUser.id !== userId
            ){

                throw new Error(
                    "Phone number already in use"
                );

            }


        }





        updateData.phoneNumber =
            normalizedPhone;


    }








    const updatedUser =
    await prisma.user.update({

        where:{
            id:userId
        },


        data:updateData,


        select:PROFILE_FIELDS

    });






    return updatedUser;


}






module.exports = {

    getProfile,

    updateProfile

};