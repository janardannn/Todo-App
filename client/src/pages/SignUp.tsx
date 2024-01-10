import axios from "axios";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import Footer from "../components/Footer";

export default function SignUp() {

    type User = {
        username: string,
        password: string
    }

    const [userData, setUserData] = useState<User>({
        username: "",
        password: ""
    })

    const [viewPassword, setViewPassword] = useState<Boolean>(false);

    const [accountCreattionStatus, setAccountCreattionStatus] = useState<Boolean>();

    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserData((prevState) => {
            return (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        })
    }

    async function handleSubmit(e: React.MouseEvent | React.KeyboardEvent) {
        e.preventDefault();
        // console.log(userData)

        const data = await axios.post("http://localhost:7777/user/sign-up",
            {
                username: userData.username,
                password: userData.password
            },
            {
                headers: { 'Content-Type': 'application/json' },
            })

        if (data.status == 200) {
            navigate("/account-created")
        }
    }

    return (
        <>
            <div className="mt-[8.5rem]">
                <h1 className="mb-[4.5rem] text-3xl text-center">Create an account</h1>
                <div className="flex justify-center">
                    <form className="flex flex-col">
                        <input type="text" placeholder="username" name="username" value={userData.username} onChange={handleChange} className=" text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem] bg-[#242424] focus:outline-none"></input>
                        <div className="flex flex-row text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 pl-2.5 pb- ml-8 rounded-lg my-[0.3rem]">
                            <input type={viewPassword ? "text" : "password"} placeholder="password" name="password" value={userData.password} onChange={handleChange} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e);
                                }
                            }} className="focus:outline-none bg-[#242424] w-[400px]"></input>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setViewPassword(!viewPassword)
                            }} className="mx-2 my-auto w-[50px] h-[50px] rounded-lg">{viewPassword ? "👀" : "🫣"}</button>
                        </div>
                        <button onClick={handleSubmit} className="text-center text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 ml-8 rounded-lg my-[0.3rem] bg-green-800">Sign up</button>
                    </form>
                </div>
            </div>
            <div className="mt-[13rem]" >
                <Footer />
            </div>
        </>
    )
} 