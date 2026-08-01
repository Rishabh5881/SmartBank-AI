const { z } = require("zod");

// =====================================================
// COMMON AMOUNT VALIDATION
// =====================================================

const amountSchema = z.coerce
  .number({
    message: "Amount must be a valid number",
  })
  .finite("Amount must be a valid finite number")
  .positive("Amount must be greater than zero");

// =====================================================
// DEPOSIT VALIDATION
// =====================================================

const depositSchema = z.object({
  body: z.object({
    accountId: z
      .string()
      .uuid("Invalid account id"),

    amount: amountSchema,
  }),
});

// =====================================================
// WITHDRAW VALIDATION
// =====================================================

const withdrawSchema = z.object({
  body: z.object({
    accountId: z
      .string()
      .uuid("Invalid account id"),

    amount: amountSchema,
  }),
});

// =====================================================
// TRANSFER VALIDATION
// =====================================================

const transferSchema = z.object({
  body: z.object({
    fromAccountId: z
      .string()
      .uuid("Invalid sender account id"),

    toAccountId: z
      .string()
      .uuid("Invalid receiver account id"),

    amount: amountSchema,
  }),
});

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  depositSchema,
  withdrawSchema,
  transferSchema,
};