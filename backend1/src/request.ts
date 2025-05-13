import axios from "axios"
import { Socket } from "socket.io";


export async function requesthandler(movesData:{from:{},to:{}},gameId:Number,ChessId:Number,player1:Number,player2:Number)  {
    console.log(movesData,gameId);
    await axios.post('http://localhost:3001/addJobsToQueue',{
        data:{
            movesData,
            gameId:gameId.toString(),
            ChessId:ChessId.toString(),
            player1,
            player2
        },
        headers:{
            'Content-Type': 'application/json'
        }
    })
}