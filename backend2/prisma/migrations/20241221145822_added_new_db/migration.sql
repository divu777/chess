-- CreateTable
CREATE TABLE "Chess" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "player1" TEXT NOT NULL,
    "player2" TEXT NOT NULL,
    "moves" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "chessId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Chess_id_key" ON "Chess"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_player1_key" ON "Game"("player1");

-- CreateIndex
CREATE UNIQUE INDEX "Game_player2_key" ON "Game"("player2");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_chessId_fkey" FOREIGN KEY ("chessId") REFERENCES "Chess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
