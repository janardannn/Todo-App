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

    const [accountCreationStatus, setAccountCreationStatus] = useState<Boolean>(true);

    const [accountCreationError, setAccountCreationError] = useState<String>()

    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleErrMessage(err: any) {
        setSubmitDisabled(false);
        console.log(err.message)
        setAccountCreationError(`[${err.response.status}] ${err.response.data.msg} `)
        setAccountCreationStatus(false);
    }

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
                // create user account
                const data = await axios.post(API_URL + "/user/sign-up",
                    {
                        username: userData.username,
                        password: userData.password
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    })

                //sign in user and store token in localStorage
                const signIn = await axios.post(API_URL + "/user/sign-in",
                    {
                        username: userData.username,
                        password: userData.password
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    })

                // console.log(data.status, todo.status, signIn.status)
                if (data.status === 200 && signIn.status === 200) {

                    const TOKEN = signIn.data.Token;
                    // console.log(data.data.Token)


                    // give a todo to user
                    try {
                        await axios.post(API_URL + "/todo/create_todo",
                            {
                                user: userData.username,
                                TodoTitle: `${userData.username}'s todo`
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${TOKEN}`
                                }
                            })
                    }
                    catch (err) {
                        handleErrMessage(err);
                    }

                    // clear previous 
                    localStorage.clear();

                    // set new
                    localStorage.setItem("username", userData.username)
                    localStorage.setItem("TOKEN", TOKEN)

                    navigate("/account-created")
                }
            }
            catch (err: any) {
                handleErrMessage(err)
            }
        }
        else {
            setSubmitDisabled(false);
            setAccountCreationError(`username and password must have 4 or more characters`)
            setAccountCreationStatus(false);

        }

    }

    return (
        <>
            <div className="mt-[8.5rem]">
                <h1 className="mb-[4.5rem] text-3xl text-center">Create an account</h1>
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
                        <button onClick={handleSubmit} disabled={submitDisabled} className={`text-center text-[1.3rem] w-[440px] h-[65px] border-2 border-slate-300 p-2.5 rounded-lg my-[0.3rem] bg-green-800 hover:${submitDisabled ? "bg-gray-700" : "bg-green-700"} ${submitDisabled ? "bg-gray-700" : ""}`}>Sign up</button>
                    </form>
                </div>
            </div>
            {accountCreationStatus ? <div /> : <div className="mt-[1.5rem] text-center text-red-600">{"!!! " + accountCreationError}</div>}
            <p className="mt-[2rem] text-center">Have an account? <Link to={"/sign-in"} className="underline">Sign in!</Link></p>
            <div className="mt-[8rem]" >
                <Footer />
            </div>
        </>
    )
} 