import e from 'express';
import { createServer} from "node:http";
import { Server } from 'socket.io';
import { GameManager } from './GameManager';
import cors from 'cors';
const app=e();


app.use(cors())


const server=createServer(app);

const io=new Server(server,{
    cors: {
        origin: "http://localhost:5173", // Replace with your client URL
        methods: ["GET", "POST"],
    },
});


const gameManager=new GameManager();

io.on('connection',(socket)=>{
    console.log("A user is connected");

    gameManager.addUser(socket);

    socket.on('disconnect',()=>{
        console.log("A user is disconnected");
        gameManager.removeUser(socket);
    })

    
})


server.listen(3000,()=>{
    console.log("web socket server is running")
})