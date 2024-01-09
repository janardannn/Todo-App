import React, { useState } from "react"
import { Link } from "react-router-dom";

export default function SignIn(props) {

    const [signInData, setSignInData] = useState({})

    
    return (
        // <div className="text-center flex flex-row justify-between w-[500px] h-[75px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg">
        //     <p className={`w-3/4 text-center ${status ? 'line-through decoration-4' : ''}`}>{props.taskTitle}</p>
        //     <button onClick={props.b} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">✅</button>
        //     <button onClick={props.a} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-slate-200 rounded-lg">🗑️</button>
        // </div >
        <div className="mt-[8.5rem] text-center">
            <h1 className="mb-[4.5rem] text-3xl">Sign in to Todo-App</h1>
            <div className="flex justify-center">
                <form className="flex flex-col">
                    <input type="text" placeholder="username" className=" text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem]"></input>
                    <input type="password" placeholder="password" className=" text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem]"></input>
                    <button className="text-center text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem] bg-green-800">Sign in</button>
                </form>
            </div>
            <p className="mt-[2rem]">Dont have an account? <Link to={"/signup"} className="underline">Sign up!</Link></p>
        </div>
    )
} 