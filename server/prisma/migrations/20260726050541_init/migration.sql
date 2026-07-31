/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ai_insights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chat_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "ai_insights" DROP CONSTRAINT "ai_insights_userId_fkey";

-- DropForeignKey
ALTER TABLE "chat_history" DROP CONSTRAINT "chat_history_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_destinationAccountId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_sourceAccountId_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "ai_insights";

-- DropTable
DROP TABLE "chat_history";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "transactions";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "AccountStatus";

-- DropEnum
DROP TYPE "AccountType";

-- DropEnum
DROP TYPE "InsightType";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "SenderType";

-- DropEnum
DROP TYPE "TransactionStatus";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
