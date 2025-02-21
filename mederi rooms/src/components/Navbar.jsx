import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

    const {isAuth, logout, user} = useAuth()
  return (
    <nav className='bg-[#f05a03] w-full  flex justify-between p-5 text-white'>
        <Link to='/'>
            <h1 className='text-2xl font-bold'>Task Manager</h1>
        </Link>
        <ul className='flex gap-x-10 mx-10'>
            {isAuth ? (
                <>
                    <li className='font-bold text-2xl mx-5'>
                        Welcome {user.username}
                    </li>
                    { user?.role !== 'admin' && <li >
                        <Link to='/add-rooms' className='bg-[#f57931] px-4 py-1 rounded-sm'>Add Room</Link>
                    </li>}
                    <li>
                        <Link to='/' onClick={() =>{logout()}} className='bg-[#f57931] p-3 rounded-sm'>Log out</Link>
                    </li>
                </>
            ): (
                <div>
                    <li>
                        <Link to='/login' className='bg-[#f57931] p-3 rounded-sm'>Login</Link>
                    </li>
                    <li>
                        <Link to='/register' className='bg-[#f57931] p-3 rounded-sm'>Register</Link>
                    </li>
                </div> 
            )}
        </ul>
    </nav>
  )
}

export default Navbar