import React from "react"

export default function SignUp() {
    return (
        <div className="mt-[8.5rem]">
            <h1 className="mb-[4.5rem] text-3xl text-center">Create an account</h1>
            <div className="flex justify-center">
                <form className="flex flex-col">
                    <input type="text" placeholder="username" className=" text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem]"></input>
                    <input type="password" placeholder="password" className=" text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem]"></input>
                    <button className="text-center text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem] bg-green-800">Sign up</button>
                </form>
            </div>
        </div>
    )
} 