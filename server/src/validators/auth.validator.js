const { z } = require("zod");


const signupSchema = z.object({

  body: z.object({

    name: z
      .string({
        required_error: "Name is required"
      })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be under 100 characters"),


    email: z
      .string({
        required_error: "Email is required"
      })
      .trim()
      .toLowerCase()
      .email("Invalid email address"),


    password: z
      .string({
        required_error: "Password is required"
      })
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be under 72 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain at least one number"
      )

  })

});



const loginSchema = z.object({

  body: z.object({

    email: z
      .string({
        required_error: "Email is required"
      })
      .trim()
      .toLowerCase()
      .email("Invalid email address"),


    password: z
      .string({
        required_error: "Password is required"
      })
      .min(
        1,
        "Password is required"
      )

  })

});



module.exports = {

  signupSchema,

  loginSchema

};