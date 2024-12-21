import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { ChessBoard } from "../components/ChessBoard";

const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(() => new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started,setStarted]=useState(false);
    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event) => {
            try {
                
                const message = JSON.parse(event);
                console.log("Received message:", message);
                
                switch (message.type) {
                    case "init_game":
                        setBoard(chess.board());
                        setStarted(true);
                        console.log("Game initialized");
                        break;

                    case "move":
                        const move = message.payload;
                        chess.move(move);
                        setBoard(chess.board()); // Ensure board updates
                        console.log("Move made:", move);
                        break;

                    case "game_over":
                        console.log("Game over");
                        break;

                    default:
                        console.error("Unknown message type:", message.type);
                        break;
                }
            } catch (error) {
                console.error("Failed to handle message:", error);
            }
        };

        socket.on("message", handleMessage);

        // Cleanup on unmount
        return () => {
            socket.off("message", handleMessage);
        };
    }, [socket]);

    if (!socket) return <div>Connecting...</div>;

    return (
        <div className="bg-slate-800 w-screen h-screen p-10">
            <div className="bg-purple-600 grid grid-cols-6 px-10">
                <div className="col-span-4 bg-red-400 flex justify-center">
                    {/* Render the chess board here */}
                    <ChessBoard chess={chess} board={board} socket={socket} setBoard={setBoard}/>
                   
                </div>
                <div className="col-span-2 bg-green-400 flex justify-center items-center">
                   { !started && <Button
                        onClick={() =>
                            socket.send(
                                JSON.stringify({
                                    "type": "init_game",
                                })
                            )
                        }
                    >
                        Play
                    </Button>}
                </div>
            </div>
        </div>
    );
};

export default Game;
