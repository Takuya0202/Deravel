/*
  Warnings:

  - The primary key for the `profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `views` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `post_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_profile_id_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "category_id" INTEGER NOT NULL,
ALTER COLUMN "profile_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "profiles_id_seq";

-- AlterTable
ALTER TABLE "views" DROP CONSTRAINT "views_pkey",
ALTER COLUMN "profile_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "views_pkey" PRIMARY KEY ("profile_id", "post_id");

-- DropTable
DROP TABLE "post_category";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
