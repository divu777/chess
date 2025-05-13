/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `Chess` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `Chess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chess" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chess_gameId_key" ON "Chess"("gameId");
