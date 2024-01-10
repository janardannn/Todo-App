import React, { useState } from "react"
import { Link } from "react-router-dom";

export default function SignIn(props) {

    const [signInData, setSignInData] = useState({})
    const [viewPassword, setViewPassword] = useState(false);

    return (

        <div className="mt-[8.5rem] text-center">
            <h1 className="mb-[4.5rem] text-3xl">Sign in to Todo-App</h1>
            <div className="flex justify-center">
                <form className="flex flex-col">
                    <input type="text" placeholder="username" className=" text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem] bg-[#242424] focus:outline-none"></input>
                    <div className="flex flex-row text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 pl-2.5 ml-8 rounded-lg my-[0.3rem]">
                        <input type={viewPassword ? "text" : "password"} placeholder="password" className="focus:outline-none bg-[#242424] w-[400px]"></input>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setViewPassword(!viewPassword)
                        }} className="mx-2  pt-2.5 w-[50px] h-[50px] rounded-lg">{viewPassword ? "👀" : "🫣"}</button>
                    </div>
                    <button className="text-center text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem] bg-green-800">Sign in</button>
                </form>
            </div>
            <p className="mt-[2rem]">Dont have an account? <Link to={"/signup"} className="underline">Sign up!</Link></p>
        </div>
    )
} 