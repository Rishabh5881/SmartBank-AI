const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");

const router = express.Router();


// =====================================================
// SIGNUP
// =====================================================

router.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;


    if (!name || !email || !password) {

      return res.status(400).json({
        success:false,
        message:"All fields are required",
      });

    }


    const cleanName = name.trim();

    const cleanEmail =
      email.trim().toLowerCase();



    if(cleanName.length < 2){

      return res.status(400).json({
        success:false,
        message:"Name must be at least 2 characters",
      });

    }



    if(password.length < 6){

      return res.status(400).json({
        success:false,
        message:"Password must be at least 6 characters",
      });

    }



    const existingUser =
      await prisma.user.findUnique({

        where:{
          email:cleanEmail,
        },

      });



    if(existingUser){

      return res.status(409).json({
        success:false,
        message:"Email already exists",
      });

    }



    const hashedPassword =
      await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT_ROUNDS) || 12
      );



    const user =
      await prisma.user.create({

        data:{

          name:cleanName,

          email:cleanEmail,

          password:hashedPassword,

        },

      });



    return res.status(201).json({

      success:true,

      message:"Signup successful",

      user:{

        id:user.id,

        name:user.name,

        email:user.email,

      },

    });



  } catch(error){


    console.error(
      "SIGNUP ERROR:",
      error
    );


    res.status(500).json({

      success:false,

      message:"Signup failed",

      error:error.message,

    });


  }

});




// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req,res)=>{


  try{


    const {
      email,
      password,
    } = req.body;



    if(!email || !password){


      return res.status(400).json({

        success:false,

        message:"Email and password are required",

      });


    }



    const cleanEmail =
      email.trim().toLowerCase();



    const user =
      await prisma.user.findUnique({

        where:{
          email:cleanEmail,
        },

      });



    if(!user){


      return res.status(404).json({

        success:false,

        message:"User not found",

      });


    }



    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );



    if(!passwordMatch){


      return res.status(401).json({

        success:false,

        message:"Invalid email or password",

      });


    }



    // ===============================
    // JWT TOKEN
    // ===============================

    const token =
      jwt.sign(

        {

          sub:user.id,

          email:user.email,

          role:user.role,

        },

        process.env.JWT_ACCESS_SECRET,

        {

          expiresIn:
          process.env.JWT_ACCESS_EXPIRY || "15m",

        }

      );





    return res.status(200).json({

      success:true,

      message:"Login successful",


      token,


      user:{

        id:user.id,

        name:user.name,

        email:user.email,

        role:user.role,

      },


    });



  }catch(error){


    console.error(
      "LOGIN ERROR:",
      error
    );


    res.status(500).json({

      success:false,

      message:"Login failed",

      error:error.message,

    });


  }


});



module.exports = router;