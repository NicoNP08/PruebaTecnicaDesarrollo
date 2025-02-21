import React, { useEffect } from "react";
import { useRooms } from "../context/RoomsContext";
import RoomsCard from "../components/RoomsCard";
import CalendarComp from "../components/Calendar";
import { useAuth } from "../context/AuthContext";

function RoomsPage() {
    const {getRooms, rooms} = useRooms()
    const {user} = useAuth()
    
    useEffect(() => {
      getRooms(user.id)
    
    }, [])
    
    if (!Array.isArray(rooms)) return <h1>Loading...</h1>;

    if(rooms.length === 0) return (<h1>No rooms</h1>)

    return(
        <div className="w-4/5 justify-center flex gap-10">
            <div className="flex gap-5">
                {rooms.map((room) => (
                    <RoomsCard room={room} key={room._id}/>
                ))}
            </div>
                <CalendarComp events={rooms}/>
        </div>
    )
}

export default RoomsPage