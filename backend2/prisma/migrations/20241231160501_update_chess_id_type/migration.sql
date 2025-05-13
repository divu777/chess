/*
  Warnings:

  - Changed the type of `player1` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `player2` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "player1",
ADD COLUMN     "player1" INTEGER NOT NULL,
DROP COLUMN "player2",
ADD COLUMN     "player2" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_player1_key" ON "Game"("player1");

-- CreateIndex
CREATE UNIQUE INDEX "Game_player2_key" ON "Game"("player2");
