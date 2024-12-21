export const Button=({onClick,children}:{onClick:()=>void, children:React.ReactNode})=>{
    return (
        <button className=" bg-red-400 text-white px-10 py-5 rounded-2xl" onClick={onClick}>
    {children}
    </button>
    )
    
}