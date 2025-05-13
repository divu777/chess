"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const client_1 = require("@prisma/client");
const RedisOption = {
    host: '127.0.0.1',
    port: 6378,
    password: '',
    maxRetriesPerRequest: null
};
const db = new client_1.PrismaClient();
const myQueue = new bullmq_1.Queue('chessQueue', {
    connection: RedisOption
});
const myWorker = new bullmq_1.Worker('chessQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Worker processing job:', job.id);
    const jobData = job.data;
    const { movesData, gameId, ChessId, player1, player2 } = jobData.data;
    if (!ChessId || !gameId || !player1 || !player2 || !movesData) {
        throw new Error('Missing required data fields');
    }
    try {
        let chessExist = yield db.chess.findUnique({
            where: { chessId: ChessId }
        });
        if (!chessExist) {
            console.log(`Creating new chess instance with ID: ${ChessId}`);
            chessExist = yield db.chess.create({
                data: {
                    chessId: ChessId,
                    createdAt: new Date()
                }
            });
        }
        const gameExist = yield db.game.findUnique({
            where: { gameId: gameId }
        });
        const moveStr = JSON.stringify(movesData);
        if (gameExist) {
            console.log(`Updating game with ID: ${gameId}`);
            yield db.game.update({
                where: { gameId },
                data: {
                    moves: [...gameExist.moves, moveStr]
                }
            });
        }
        else {
            console.log(`Creating new game with ID: ${gameId}`);
            yield db.game.create({
                data: {
                    gameId,
                    player1,
                    player2,
                    moves: [moveStr],
                    createdAt: new Date(),
                    chessId: chessExist.id // Use the Chess model's id, not chessId
                }
            });
        }
        console.log('Job processed successfully');
    }
    catch (err) {
        console.error('Error processing job:', err);
        throw err; // Re-throw to mark job as failed
    }
}), { connection: RedisOption });
function addJobs(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.ChessId) || !((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.gameId)) {
            throw new Error('Invalid job data');
        }
        const job = yield myQueue.add('myChessQueue', data);
        console.log(`Job added with ID: ${job.id}`);
        return job;
    });
}
exports.default = addJobs;
myWorker.on('completed', job => {
    console.log(`${job.id} completed`);
});
myWorker.on('failed', (job, err) => {
    console.log(`${job === null || job === void 0 ? void 0 : job.id} failed: ${err.message}`);
});
