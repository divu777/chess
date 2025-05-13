/*
  Warnings:

  - Added the required column `chessId` to the `Chess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chess" ADD COLUMN     "chessId" INTEGER NOT NULL;
