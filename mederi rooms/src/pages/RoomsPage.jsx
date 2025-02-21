import React, { useEffect } from "react";
import { useRooms } from "../context/RoomsContext";
import RoomsCard from "../components/RoomsCard";
import CalendarComp from "../components/Calendar";

function RoomsPage() {
    const {getRoom, rooms} = useRooms()

    useEffect(() => {
      getRoom()
    
    }, [])
    
    if (!Array.isArray(rooms)) return <h1>Loading...</h1>;

    if(rooms.length === 0) return (<h1>No rooms</h1>)

    return(
        <div className="grid grid-cols-3 gap-2">
            {rooms.map((room) => (
                   <RoomsCard room={room} key={room._id}/>
                ))}
                <CalendarComp events={rooms}/>
        </div>
    )
}

export default RoomsPage