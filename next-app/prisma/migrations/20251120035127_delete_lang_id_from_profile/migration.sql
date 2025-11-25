/*
  Warnings:

  - You are about to drop the column `language_id` on the `profiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_language_id_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "language_id";
