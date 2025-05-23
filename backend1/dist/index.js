"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const GameManager_1 = require("./GameManager");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with your client URL
        methods: ["GET", "POST"],
    },
});
const gameManager = new GameManager_1.GameManager();
io.on('connection', (socket) => {
    console.log("A user is connected");
    gameManager.addUser(socket);
    socket.on('disconnect', () => {
        console.log("A user is disconnected");
        gameManager.removeUser(socket);
    });
});
server.listen(3000, () => {
    console.log("web socket server is running");
});
