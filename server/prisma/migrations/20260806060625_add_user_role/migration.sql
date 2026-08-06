-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");
