/*
  Warnings:

  - You are about to drop the column `starting_amount` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `amount_to_reach` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "starting_amount",
ADD COLUMN     "amount_to_reach" INTEGER NOT NULL;
