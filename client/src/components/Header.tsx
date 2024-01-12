import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header(props: any) {
    // props.username = "janardan";
    const navigate = useNavigate()

    const [btnText, setBtnText] = useState(`🔐  ${props.username}`)

    const handleLogout = () => {
        localStorage.clear()
        navigate("/sign-in")

    }

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-3xl text-center mt-16 mb-8">Todo App</h1>
            <button onClick={handleLogout} onMouseOver={() => { setBtnText("Log out!") }} onMouseOut={() => { setBtnText(`🔐  ${props.username}`) }} className="text-pretty whitespace-normal break-all mb-10 mx-auto text-center border-2 border-slate-300 rounded-lg my-[0.3rem] w-[175px] hover:bg-red-600">{btnText}</button>
        </div>
    )
}