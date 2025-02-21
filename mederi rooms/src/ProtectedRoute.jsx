import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from './context/AuthContext'

function ProtectedRoute() {
    const {loading, isAuth} = useAuth()

    if(loading) return <h1>cargando</h1>
    if(!isAuth && !loading) return <Navigate to='/login' replace/>

  return <Outlet />
}

export default ProtectedRoute