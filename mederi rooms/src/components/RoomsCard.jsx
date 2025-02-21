import React from 'react'
import { useRooms } from '../context/RoomsContext'
import { Link } from 'react-router-dom'

function RoomsCard({room}) {
    const {deleteRooms} = useRooms()

  return (
    <div className="max-w-md w-full p-4 rounded-md border border-black h-auto flex flex-col gap-2">
    <p className="text-black text-lg">{room.description}</p>
    <p className="text-gray-500 text-sm">{new Date(room.date).toLocaleDateString()}</p>
    <div>
        <h2 className="text-lg font-semibold">Equipamiento:</h2>
        <ul className="list-disc list-inside">
            {room.equipment?.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
            ))}
        </ul>
    </div>
    <div className="mt-auto flex justify-between">
      <button 
          className="text-red-500 border border-red-500 px-4 py-1 rounded-md hover:bg-red-500 hover:text-white transition" onClick={() => deleteRooms(room._id)}>
          Delete</button>
      <Link to={`/rooms/${room._id}`} className="text-blue-500 border border-blue-500 px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white transition">
          Edit
      </Link>
    </div>
</div>
  )
}

export default RoomsCard