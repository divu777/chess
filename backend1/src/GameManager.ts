import { Socket } from "socket.io";
import { Game } from "./Game";


export class GameManager{
    private games: Game[];
    private pendingUser: Socket | null;
    private users:Socket[]
    constructor(){
        this.games=[];
        this.pendingUser=null;
        this.users=[];
    }

    addUser(socket:Socket){
        this.users.push(socket);
        this.addHandler(socket); 
    }

    removeUser(socket:Socket){
        this.users=this.users.filter(user=>user!==socket);
    }

    private addHandler(socket:Socket){
        socket.on('message',(data)=>{
            const message=JSON.parse(data.toString());

            if(message.type==='init_game'){
                console.log("want to initialized game")
                if(this.pendingUser){
                    console.log("new game started")
                    const game=new Game(this.pendingUser,socket);
                    this.games.push(game);
                    this.pendingUser=null;
                }else{
                this.pendingUser=socket}
            }
            if(message.type=="move"){
                const game=this.games.find(game=>game.player1===socket || game.player2===socket);
                if(game){
                    game.makeMove(socket,message.payload.move)
                }
            }
        })
    }
}