/*
  Warnings:

  - A unique constraint covering the columns `[chessId]` on the table `Chess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chess_chessId_key" ON "Chess"("chessId");
