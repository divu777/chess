import { useNavigate } from "react-router-dom";
import chessImg from "../assets/chess.png"

let Landing=()=>{
    const navigate=useNavigate();
    return <div className="flex-col lg:flex-row flex justify-evenly items-center h-screen bg-slate-800">
        
        <div>
        <img src={chessImg} alt="" />
        </div>
        <div className="flex justify-evenly items-center flex-col h-full">
            <h1 className="text-5xl font-semibold text-white">Play Chess Online on the #1 Site </h1>
            <div>
                <button className="  bg-green-400 text-white px-10 py-5 rounded-2xl" onClick={()=>navigate("/game")}>
                Play Chess
            </button>
            </div>

        </div>
    </div>
}

export default Landing;