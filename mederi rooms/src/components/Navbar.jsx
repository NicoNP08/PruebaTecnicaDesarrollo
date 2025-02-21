import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

    const {isAuth, logout, user} = useAuth()
    console.log(user)
  return (
    <nav className='bg-[#f05a03] my-3 flex justify-between py-5 px-10'>
        <Link to='/'>
            <h1 className='text-2xl font-bold'>Task Manager</h1>
        </Link>
        <ul className='flex gap-x-2'>
            {isAuth ? (
                <>
                    <li>
                        Welcome {user.username}
                    </li>
                    { user?.role !== 'admin' && <li >
                        <Link to='/add-rooms' className='bg-[#f57931] px-4 py-1 rounded-sm'>Add Room</Link>
                    </li>}
                    <li>
                        <Link to='/' onClick={() =>{logout()}}>Log out</Link>
                    </li>
                </>
            ): (
                <>
                    <li>
                        <Link to='/login' className='bg-indigo-500 px-4 py-1 rounded-sm'>Login</Link>
                    </li>
                    <li>
                        <Link to='/register' className='bg-indigo-500 px-4 py-1 rounded-sm'>Register</Link>
                    </li>
                </> 
            )}
        </ul>
    </nav>
  )
}

export default Navbar