const authService = require("../services/auth.service");
const prisma = require("../config/prisma");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.util");

const {
  COOKIE_SECURE,
  JWT_REFRESH_EXPIRY_DAYS,
} = require("../config/env");

const ApiError = require("../utils/ApiError");



// ==============================
// COOKIE CONFIG
// ==============================

const REFRESH_COOKIE_NAME = "refreshToken";


const COOKIE_MAX_AGE =
  Number(JWT_REFRESH_EXPIRY_DAYS || 7) *
  24 *
  60 *
  60 *
  1000;




// ==============================
// SET COOKIE
// ==============================

function setRefreshCookie(res, token) {

  res.cookie(
    REFRESH_COOKIE_NAME,
    token,
    {
      httpOnly:true,
      secure:COOKIE_SECURE,
      sameSite:"strict",
      maxAge:COOKIE_MAX_AGE,
      path:"/api/auth",
    }
  );

}




// ==============================
// CLEAR COOKIE
// ==============================

function clearRefreshCookie(res) {

  res.clearCookie(
    REFRESH_COOKIE_NAME,
    {
      httpOnly:true,
      secure:COOKIE_SECURE,
      sameSite:"strict",
      path:"/api/auth",
    }
  );

}




// ==============================
// SIGNUP
// ==============================

async function signupController(req,res,next){

  try{

    const user =
      await authService.signup(req.body);


    res.status(201).json({

      success:true,

      message:"Signup successful",

      data:user,

    });


  }catch(err){

    next(err);

  }

}





// ==============================
// LOGIN
// ==============================

async function loginController(req,res,next){

  try{

    const user =
      await authService.login(req.body);



    const accessToken =
      generateAccessToken(user);



    const refreshToken =
      generateRefreshToken(user);



    await authService.createSession({

      userId:user.id,

      refreshToken,

      ipAddress:req.ip,

      userAgent:req.headers["user-agent"],

    });



    setRefreshCookie(
      res,
      refreshToken
    );



    res.status(200).json({

      success:true,

      message:"Login successful",

      accessToken,

      data:user,

    });



  }catch(err){

    next(err);

  }

}





// ==============================
// REFRESH TOKEN
// ==============================

async function refreshController(req,res,next){

try{


const refreshToken =
req.cookies.refreshToken;



if(!refreshToken){

 throw ApiError.unauthorized(
  "Refresh token required"
 );

}



let decoded;


try{

 decoded =
 verifyRefreshToken(refreshToken);


}catch(err){

 throw ApiError.unauthorized(
  "Invalid refresh token"
 );

}




const session =
await authService.findSessionByToken(
 refreshToken
);



if(!session){

 throw ApiError.unauthorized(
  "Session expired, login again"
 );

}




await authService.deleteSessionByToken(
 refreshToken
);




const user =
await prisma.user.findUnique({

 where:{
  id:decoded.id
 }

});




if(!user){

 throw ApiError.notFound(
  "User not found"
 );

}




const newAccessToken =
generateAccessToken(user);



const newRefreshToken =
generateRefreshToken(user);




await authService.createSession({

 userId:user.id,

 refreshToken:newRefreshToken,

 ipAddress:req.ip,

 userAgent:req.headers["user-agent"],

});




setRefreshCookie(
 res,
 newRefreshToken
);




res.json({

 success:true,

 message:"Token refreshed successfully",

 accessToken:newAccessToken,

});



}catch(err){

 next(err);

}

}





// ==============================
// LOGOUT
// ==============================

async function logoutController(req,res,next){

try{


const refreshToken =
req.cookies.refreshToken;



if(refreshToken){

 await authService.deleteSessionByToken(
  refreshToken
 );

}



clearRefreshCookie(res);



res.json({

 success:true,

 message:"Logout successful",

});



}catch(err){

 next(err);

}

}





// ==============================
// ME
// ==============================

async function getMeController(req,res,next){

try{


res.json({

 success:true,

 message:"User profile",

 user:req.user,

});



}catch(err){

 next(err);

}

}





module.exports = {

 signupController,

 loginController,

 refreshController,

 logoutController,

 getMeController,

};