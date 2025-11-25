/*
  Warnings:

  - The primary key for the `post_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `views` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `language_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_post_id_fkey";

-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_post_id_fkey";

-- AlterTable
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_pkey",
ALTER COLUMN "post_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "post_category_pkey" PRIMARY KEY ("post_id", "category_id");

-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
ADD COLUMN     "language_id" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "posts_id_seq";

-- AlterTable
ALTER TABLE "views" DROP CONSTRAINT "views_pkey",
ALTER COLUMN "post_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "views_pkey" PRIMARY KEY ("profile_id", "post_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
