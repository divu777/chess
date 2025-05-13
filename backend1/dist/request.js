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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requesthandler = requesthandler;
const axios_1 = __importDefault(require("axios"));
function requesthandler(movesData, gameId, ChessId, player1, player2) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(movesData, gameId);
        yield axios_1.default.post('http://localhost:3001/addJobsToQueue', {
            data: {
                movesData,
                gameId: gameId.toString(),
                ChessId: ChessId.toString(),
                player1,
                player2
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
}
