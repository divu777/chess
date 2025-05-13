/*
  Warnings:

  - You are about to drop the column `gameId` on the `Chess` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Chess_gameId_key";

-- AlterTable
ALTER TABLE "Chess" DROP COLUMN "gameId";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameId_key" ON "Game"("gameId");
