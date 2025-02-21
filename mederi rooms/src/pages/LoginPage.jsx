import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage(){

    const {register, handleSubmit, formState:{errors} } = useForm()
    const {singin, errors: singinErrors, isAuth, user} = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        singin(data)
    })

    useEffect(() => {
        console.log("User:", user);
        if (isAuth && user?.role) {
            if (user.role === "admin") {
                navigate("/profile");
            } else {
                navigate("/rooms");
            }
        }
    }, [isAuth, user, navigate]);

    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="max-w-md w-full p-10 rounded-md border border-black">
            {
                singinErrors.map((error, i)=> (
                    <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                        {error}
                    </div>
                ))
            }
                <h1 className="text-2xl font-bold py-5">Login</h1>

                <form onSubmit={onSubmit}>
                    <input type="email" {...register('email', {required:true})} className="border border-black text-black px-4 py-2 rounded-md my-2 w-full" placeholder="Email"/>
                    {
                        errors.email && (<p className="text-red-500">Email is required</p>)
                    }
                    <input type="password" {...register('password', {required:true})} className="w-full border border-black text-black px-4 py-2 rounded-md my-2" placeholder="Password"/>
                    {
                        errors.password && (<p className="text-red-500">Password is required</p>)
                    }
                    <div className="flex justify-center w-full my-5">
                        <button type="submit" className="text-white text-align-center bg-[#f05a03] rounded p-3 w-full">Login</button>
                    </div>
                </form>
                <p className="flex gap-x-2 justify-between text-[#f05a03]">
                    Dont have an account yet? <Link to='/register' className="text-[#f05a03] flex flex-col">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage