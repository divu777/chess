"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(player1, player2) {
        this.gameId = Math.random();
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moveCount = 0;
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: {
                colors: "white",
                gameId: this.gameId
            }
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: {
                colors: "black",
                gameId: this.gameId
            }
        }));
        console.log("Game started with ID:", this.gameId);
    }
    makeMove(socket, move) {
        try {
            if (this.moveCount % 2 === 0 && socket !== this.player1 || this.moveCount % 2 === 1 && socket !== this.player2) {
                return;
            }
            this.board.move(move);
            if (this.board.isGameOver()) {
                this.player1.send(JSON.stringify({
                    type: "game_over",
                    payload: {
                        winner: this.board.turn() === "w" ? "black" : "white"
                    }
                }));
                this.player2.send(JSON.stringify({
                    type: "game_over",
                    payload: {
                        winner: this.board.turn() === "w" ? "black" : "white"
                    }
                }));
                return;
            }
            if (this.moveCount % 2 === 0) {
                this.player2.send(JSON.stringify({
                    type: "move",
                    payload: move
                }));
            }
            else {
                this.player1.send(JSON.stringify({
                    type: "move",
                    payload: move
                }));
            }
            this.moveCount++;
        }
        catch (err) {
            console.log(err);
            return;
        }
    }
}
exports.Game = Game;
