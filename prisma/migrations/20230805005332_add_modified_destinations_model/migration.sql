/*
  Warnings:

  - You are about to drop the column `estimated_end` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_start` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `destinations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "destinations" DROP CONSTRAINT "destinations_user_id_fkey";

-- AlterTable
ALTER TABLE "destinations" DROP COLUMN "estimated_end",
DROP COLUMN "estimated_start",
DROP COLUMN "user_id";
