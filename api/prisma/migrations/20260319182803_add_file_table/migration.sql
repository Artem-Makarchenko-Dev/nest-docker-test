-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('PENDING', 'UPLOADED', 'DELETED');

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "size" INTEGER,
    "status" "FileStatus" NOT NULL DEFAULT 'PENDING',
    "uploaded_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_key_key" ON "files"("key");

-- CreateIndex
CREATE INDEX "files_uploaded_by_idx" ON "files"("uploaded_by");

-- CreateIndex
CREATE INDEX "files_uploaded_by_status_idx" ON "files"("uploaded_by", "status");

-- CreateIndex
CREATE INDEX "files_uploaded_by_created_at_idx" ON "files"("uploaded_by", "created_at");

-- CreateIndex
CREATE INDEX "files_uploaded_by_created_at_status_idx" ON "files"("uploaded_by", "created_at", "status");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
