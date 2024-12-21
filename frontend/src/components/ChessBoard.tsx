import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { Socket } from "socket.io-client";

export const ChessBoard = ({
    board,
    socket,
    setBoard,
    chess
}: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: Socket;
    setBoard : any;
    chess: any
}) => {
    const [from, setFrom] = useState<Square | null>(null);
    const [to, setTo] = useState<Square | null>(null);

    const pieceSymbols = {
        k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙",
        K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟",
    };


    return (
        <div className="text-white-200">
            {board.map((row, i) => {
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        const squareRepresentation = `${String.fromCharCode(97 + j)}${8 - i}` as Square;
                        return (<div
                            key={j}
                            className={`w-16 h-16 ${
                                (i + j) % 2 === 0 ? "bg-green-500" : "bg-white"
                            }`}
                            onClick={() => {
                                if(!from){
                                    setFrom(squareRepresentation);
                                }else{
                                    socket.send(JSON.stringify({
                                        type:"move",
                                        payload:{
                                            move:{
                                                from,
                                                to:squareRepresentation
                                            }
                                        }
                                    }))
                                    setFrom(null)
                                    chess.move({
                                        from,
                                        to:squareRepresentation
                                    })
                                    setBoard(chess.board())
                                    console.log({
                                        from,
                                        to:squareRepresentation
                                    })
                                }
                            }}
                        >
                            <div className="h-full flex justify-center items-center">
                                {square ? pieceSymbols[square.type] : ""}
                            </div>
                        </div>)
            })}
                </div>
})}
        </div>
    );
};
