import React, { useEffect } from "react";
import { useRooms } from "../context/RoomsContext";
import CalendarComp from "../components/Calendar";

function ProfilePage() {
    const {  loadingRooms, roomsError, getAllRooms, rooms } = useRooms();

    useEffect(() => {
        
        getAllRooms()
    }, []);

    if (loadingRooms) return <p>Cargando salas ocupadas...</p>;
    if (roomsError) return <p>Error: {roomsError}</p>;
    return(
        <div className="w-full">
            <h1 className="text-2xl font-bold py-2">Gestion de Reuniones</h1>
            <div className=" w-full p-10 rounded-md flex justify-between">
                <ul className="gap-2 flex flex-col">
                    {rooms.map((room) => (
                        <li key={room._id} className="flex flex-col gap-x-2 justify-between bg-[#f05a03] text-black p-2 rounded">
                            <p>
                                Titulo: {room.title}
                            </p> 
                            <p>
                                Descripción: {room.description}
                            </p>  
                            <p>
                                Fecha de reunion: {room.startDate}
                            </p>    
                        </li>
                    ))}

                </ul>
                <CalendarComp events={rooms}/>
            </div>
        </div>
    )
}

export default ProfilePage