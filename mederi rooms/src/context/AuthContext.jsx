import React, { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be userd within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            setErrors([])
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuth(true)
            console.log(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    } 

    const singin = async (user) => {
        try {
            setErrors([])
            const res = await loginRequest(user)
            console.log("Respuesta del login:", res.data)
            setUser(res.data)
            setIsAuth(true)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
            console.error(error)
        }
    }

    const logout = () => {
        Cookies.remove('token')
        setIsAuth(false)
        setUser(null)
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if(!cookies.token){
                setIsAuth(false)
                setLoading(false)
                return setUser(null)
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if(!res.data){
                    setIsAuth(false)
                    setLoading(false)
                    return
                }
                
                    
                setIsAuth(true)
                setUser(res.data)   
                setLoading(false)
            } catch (error) {
                setIsAuth(false)
                setUser(null) 
                setLoading(false)
            }
        }
        checkLogin()
    }, [])    

    return(
        <AuthContext.Provider 
        value={{
            signup, 
            singin,
            user,
            isAuth, 
            errors,
            loading,
            logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}