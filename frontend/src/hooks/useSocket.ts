import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

export const useSocket=()=>{
    const [socket , setSocket]=useState<Socket | null >(null);
    useEffect(() => {
        const ws = io("ws://localhost:3000");

        const handleConnect = () => {
            console.log("connected");
            setSocket(ws);
        };

        const handleDisconnect = () => {
            console.log("disconnected");
            setSocket(null);
        };

        // Register event listeners
        ws.on("connect", handleConnect);
        ws.on("disconnect", handleDisconnect);

        // Cleanup function
        return () => {
            ws.close(); 
        };
    }, []);

    return socket;
}


