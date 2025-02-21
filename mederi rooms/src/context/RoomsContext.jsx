import React, { useState, createContext, useContext } from "react";
import { createRoomsRequest, getRoomsRequest, deleteRoomsRequest, getRoomRequest, updateRoomsRequest, allRoomsRequest } from "../api/rooms";

const RoomsContext = createContext()

export const useRooms = () => {
    const context = useContext(RoomsContext)

    if(!context){
        throw new Error('UseRooms must be used within a RoomsProvider')
    }
    return context
}

export function RoomsProvider({children}) {
    const [rooms, setRooms] = useState([])

    const createRooms = async (room) => {
        try {
            const res = await createRoomsRequest(room)
            //
            setRooms([...rooms, res.data]);
            console.log(res)
            return { success: true };
        } catch (error) {
            console.error(error.response?.data?.message || "Error creating room");
            return { success: false, message: error.response?.data?.message || "Error creating room" };
        }
    }

    const getRooms = async (id) => {
        try {
            const res = await getRoomsRequest();
            if (Array.isArray(res.data)) {
                if(id){
                    const filter = res.data.filter((room) => room.user._id === id)

                    setRooms(filter)
                    return res.data
                }
                setRooms(res.data);
                return res.data; 
            } else {
                console.error("API did not return an array:", res.data);
                setRooms([]); 
                return []; 
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setRooms([]); 
            return []; 
        }
    };

    const getAllRooms = async () => {
        try {
            const res = await allRoomsRequest()
            console.log(res)
            setRooms(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRooms = async (id) => {
        try {
            const res = await deleteRoomsRequest(id)
            if(res.status === 204) setRooms(rooms.filter((room) => room._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const getRoom = async (id) => {
        try {
            const res = await getRoomRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateRoom = async (id, room) => {
        try {
            await updateRoomsRequest(id, room)
        } catch (error) {
            console.log(error)
        }
    }

    // // Función para obtener salas ocupadas
    // const fetchOccupiedRooms = async () => {
    //     try {
    //         setLoadingRooms(true);
    //         setRoomsError(null);
    //         const res = await getOccupiedRooms();
    //         console.log("Respuesta de la API:", res.data); // 🔍 Verifica qué devuelve la API
    //         setOccupiedRooms(res.data);
    //     } catch (error) {
    //         console.error("Error al obtener salas ocupadas:", error);
    //         setRoomsError("Error fetching occupied rooms");
    //     } finally {
    //         setLoadingRooms(false);
    //     }
    // };

    return (
        <RoomsContext.Provider value={{
            rooms, 
            createRooms,
            getRooms,
            deleteRooms,
            getRoom,
            updateRoom,
            getAllRooms
            // occupiedRooms,
            //                 fetchOccupiedRooms,
            //                 loadingRooms,
            //                 roomsError,
            }}>
            {children}
        </RoomsContext.Provider>
    )
}