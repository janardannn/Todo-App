import axios from "axios";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Footer from "../components/Footer";
import { API_URL } from "../App";

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

    const [accountSignInStatus, setAccountSignInStatus] = useState<Boolean>(true);

    const [accountSignInMessage, setAccountSignInMessage] = useState<String>("")

    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserData((prevState) => {
            return (
                {
                    ...prevState,
                    [e.target.name]: e.target.value.trim()
                }
            )
        })
    }

    async function handleSubmit(e: React.MouseEvent | React.KeyboardEvent) {
        e.preventDefault();
        setSubmitDisabled(true);
        // console.log(userData)
        if (userData.username.length >= 4 && userData.password.length >= 4) {
            try {
                const data = await axios.post(API_URL + "/user/sign-in",
                    {
                        username: userData.username,
                        password: userData.password
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    })

                if (data.status == 200) {
                    setAccountSignInStatus(true);
                    setAccountSignInMessage("Logged In Successfully!")

                    const TOKEN = data.data.Token;
                    // console.log(data.data.Token)

                    // clear previous 
                    localStorage.clear();

                    // set new
                    localStorage.setItem("username", userData.username)
                    localStorage.setItem("TOKEN", TOKEN)

                    // console.log(localStorage.username, localStorage.TOKEN)


                    setTimeout(() => {
                        navigate("/")
                    }, 2157);
                }
            }
            catch (err: any) {
                setSubmitDisabled(false);
                console.log(err.message)
                setAccountSignInMessage(`[${err.response.status}] ${err.response.data.msg} `)
                setAccountSignInStatus(false);
            }
        }
        else {
            setSubmitDisabled(false);
            setAccountSignInMessage(`username and password must have 4 or more characters`)
            setAccountSignInStatus(false);

        }

    }

    return (
        <>
            <div className="mt-[8.5rem]">
                <h1 className="mb-[4.5rem] text-3xl text-center">Sign in to Todo-App</h1>
                <div className="flex justify-center">
                    <form className="flex flex-col">
                        <input type="text" placeholder="username" name="username" value={userData.username} onChange={handleChange} className=" text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 rounded-lg my-[0.3rem] bg-[#242424] focus:outline-none"></input>
                        <div className="flex flex-row text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 pl-2.5 pb- rounded-lg my-[0.3rem]">
                            <input type={viewPassword ? "text" : "password"} placeholder="password" name="password" value={userData.password} onChange={handleChange} disabled={submitDisabled} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e);
                                }
                            }} className="focus:outline-none bg-[#242424] w-[400px]"></input>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setViewPassword(!viewPassword)
                            }} className="mx-2 my-auto w-[50px] h-[50px] rounded-lg">{viewPassword ? "👀" : "🫣"}</button>
                        </div>
                        <button onClick={handleSubmit} disabled={submitDisabled} className={`text-center text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 rounded-lg my-[0.3rem] bg-green-800 hover:${submitDisabled ? "bg-gray-700" : "bg-green-700"} ${submitDisabled ? "bg-gray-700" : ""}`}>Sign in</button>
                    </form>
                </div>
                {<div className={`mt-[1.5rem] mb-[1.2rem] text-center ${accountSignInStatus ? "text-green-600" : "text-red-600"}`}>{accountSignInStatus ? accountSignInMessage : "!!! " + accountSignInMessage}</div>}
                <p className="mt-[2rem] text-center">Dont have an account? <Link to={"/sign-up"} className="underline">Sign up!</Link></p>
            </div >
            <div className="mt-[8rem]" >
                <Footer />
            </div>
        </>
    )
} 