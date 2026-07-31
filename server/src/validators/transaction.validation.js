const { z } = require("zod");


// =====================
// DEPOSIT VALIDATION
// =====================

const depositSchema = z.object({

    body: z.object({

        accountId: z
            .string()
            .uuid("Invalid account id"),


        amount: z
            .number({
                message:"Amount must be a number"
            })
            .positive("Amount must be greater than zero")

    })

});





// =====================
// WITHDRAW VALIDATION
// =====================

const withdrawSchema = z.object({

    body: z.object({

        accountId: z
            .string()
            .uuid("Invalid account id"),


        amount: z
            .number({
                message:"Amount must be a number"
            })
            .positive("Amount must be greater than zero")

    })

});






// =====================
// TRANSFER VALIDATION
// =====================

const transferSchema = z.object({

    body: z.object({

        fromAccountId: z
            .string()
            .uuid("Invalid sender account id"),


        toAccountId: z
            .string()
            .uuid("Invalid receiver account id"),


        amount: z
            .number({
                message:"Amount must be a number"
            })
            .positive("Amount must be greater than zero")

    })

});





module.exports = {

    depositSchema,

    withdrawSchema,

    transferSchema

};