import React from 'react'
import { useRooms } from '../context/RoomsContext'
import { Link } from 'react-router-dom'

function RoomsCard({room}) {
    const {deleteRooms} = useRooms()

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <header className='flex justify-between'>
        <h1 className="text-white text-2xl font-bold">{room.title}</h1>
        <div className='flex gap-x-2 items-center'>
            <button onClick={()=> {
                deleteRooms(room._id)
            }}>Delete</button>
            <Link to={`/rooms/${room._id}`}>Edit</Link>
        </div>
        </header>
        <p className="text-white text-2xl font-bold">{room.description}</p>
        <p>{new Date(room.date).toLocaleDateString()}</p>
    </div> 
  )
}

export default RoomsCard