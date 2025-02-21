import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage(){

    const {register, handleSubmit, formState:{errors}} = useForm()
    const {signup, isAuth, errors: registerErrors, user} = useAuth()
    const navigate = useNavigate()

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
  
    const onSubmit=handleSubmit(async (values) => {
        signup(values)
    })

    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center p-10 rounded-md w-full">
            <div className="max-w-md w-full p-10 rounded-md border border-black">
                {
                    registerErrors.map((error, i)=> (
                        <div className="bg-red-500 p-2 text-white" key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-2xl font-bold py-5">Register</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register('username', {required:true})} className="w-fullborder border border-black text-black px-4 py-2 rounded-md my-2 w-full" placeholder="Username"/>
                    {
                        errors.username && (<p className="text-red-500">Username is required</p>)
                    }
                    <input type="email" {...register('email', {required:true})} className="w-fullborder border border-black text-black px-4 py-2 rounded-md my-2 w-full" placeholder="Email"/>
                    {
                        errors.email && (<p className="text-red-500">Email is required</p>)
                    }
                    <input type="password" {...register('password', {required:true})} className="w-fullborder border border-black text-black px-4 py-2 rounded-md my-2 w-full" placeholder="Password"/>
                    {
                        errors.password && (<p className="text-red-500">Password is required</p>)
                    }
                    <select {...register("role", { required: true })} className="w-fullborder border border-black text-black px-4 py-2 rounded-md my-2 w-full">
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="text-red-500">Role is required</p>}
                    <div>
                        <button type="submit" className="text-white text-align-center bg-[#f05a03] rounded p-3 w-full">Register</button>
                    </div>
                </form>
                <p className="flex gap-x-2 justify-between text-[#f05a03]">
                        Already have an account? <Link to='/login' className="text-[#f05a03] flex flex-col">Login</Link>
                </p>
            </div>

        </div>
    )
}

export default RegisterPage