-- AlterTable
CREATE SEQUENCE languages_id_seq;
ALTER TABLE "languages" ALTER COLUMN "id" SET DEFAULT nextval('languages_id_seq');
ALTER SEQUENCE languages_id_seq OWNED BY "languages"."id";
