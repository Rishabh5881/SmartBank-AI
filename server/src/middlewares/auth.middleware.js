const prisma = require("../config/prisma");

const {
  verifyAccessToken,
} = require("../utils/jwt.util");


// =====================================
// AUTHENTICATE USER
// =====================================

async function authenticate(req, res, next) {

  try {


    const authHeader =
      req.headers.authorization;



    if (!authHeader) {

      return res.status(401).json({

        success:false,

        message:"Authorization token required",

      });

    }





    if (!authHeader.startsWith("Bearer ")) {

      return res.status(401).json({

        success:false,

        message:"Invalid authorization format",

      });

    }





    const token =
      authHeader.split(" ")[1];





    if (!token) {

      return res.status(401).json({

        success:false,

        message:"Access token required",

      });

    }






    let decoded;



    try {


      decoded =
        verifyAccessToken(token);



    } catch(error) {


      return res.status(401).json({

        success:false,

        code:"TOKEN_EXPIRED",

        message:"Invalid or expired token",

      });


    }







    const userId =
      decoded.id;





    if(!userId){


      return res.status(401).json({

        success:false,

        message:"Invalid token payload",

      });


    }








    const user =
      await prisma.user.findUnique({


        where:{


          id:userId,


        },



        select:{


          id:true,


          name:true,


          email:true,


          role:true,


          createdAt:true,


          updatedAt:true,


        },


      });







    if(!user){


      return res.status(401).json({


        success:false,


        message:"User not found",


      });


    }








    req.user = user;



    next();





  } catch(error) {



    console.error(

      "AUTH MIDDLEWARE ERROR:",

      error.message

    );



    next(error);



  }

}





module.exports = {

  authenticate,

};