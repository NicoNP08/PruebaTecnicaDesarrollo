// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRooms } from "../context/RoomsContext";
// import { useNavigate, useParams } from "react-router-dom";
// import CalendarComp from "../components/Calendar";

// function RoomsFormPage() {
//     const { register, handleSubmit, setValue, watch } = useForm();
//     const { createRooms, getRoom, updateRoom, getRooms } = useRooms(); // Añadir getRooms
//     const navigate = useNavigate();
//     const params = useParams();

//     const [errorMessage, setErrorMessage] = useState("");
//     const [availableRooms, setAvailableRooms] = useState([]); // Guardamos salas disponibles
//     const equipmentOptions = ["Pantalla", "Proyector", "Altavoces", "Microfono", "Pizarra", "Sillas", "Mesas", "Marcadores"];

//     useEffect(() => {
//         async function loadRoom() {
//             if (params.id) {
//                 const room = await getRoom(params.id);
//                 setValue("title", room.title);
//                 setValue("description", room.description);
//                 setValue("equipment", room.equipment || []);
//             }
//         }
//         loadRoom();
//     }, [params.id, setValue]);

//     // 🟢 Obtener salas disponibles según el rango de fechas seleccionado
//     const checkAvailability = async () => {
//         const startDate = watch("startDate");
//         const endDate = watch("endDate");
    
//         if (startDate && endDate) {
//             const rooms = await getRooms({ startDate, endDate });
//             console.log("Salas disponibles:", rooms); // 👀 Verifica qué devuelve
//             setAvailableRooms(rooms);
//         }
//     };

//     const onSubmit = handleSubmit(async (data) => {
//         data.equipment = data.equipment || [];
//         if (params.id) {
//             updateRoom(params.id, data);
//         } else {
//             const response = await createRooms(data);
//             if (!response.success) {
//                 setErrorMessage(response.message);
//                 return;
//             }
//         }
//         navigate("/rooms");
//     });

//     const onSelectSlot = ({ start, end }) => {
//         const formattedStart = moment(start).format("YYYY-MM-DDTHH:mm");
//         const formattedEnd = moment(end).format("YYYY-MM-DDTHH:mm");
    
//         setValue("startDate", formattedStart);
//         setValue("endDate", formattedEnd);
    
//         checkAvailability(); // Verifica la disponibilidad de salas en este horario
//     };
//     return (
//         <div className="flex gap-5">
//         {/* 📌 Formulario */}
//         <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
//             <form onSubmit={onSubmit}>
//                 <input type="text" placeholder="Title" {...register("title")} autoFocus className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2" />
//                 <textarea rows="3" placeholder="Description" {...register("description")} className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"></textarea>

//                 <h3 className="text-white">Selecciona el equipamiento:</h3>
//                 {equipmentOptions.map((item) => (
//                         <label key={item} className="block text-white">
//                             <input
//                                 type="checkbox"
//                                 value={item}
//                                 {...register("equipment")}
//                                 className="mr-2"
//                                 checked={Array.isArray(watch("equipment")) ? watch("equipment").includes(item) : false}
//                                 onChange={(e) => {
//                                     const selectedItems = Array.isArray(watch("equipment")) ? watch("equipment") : [];
//                                     if (e.target.checked) {
//                                         setValue("equipment", [...selectedItems, item]);
//                                     } else {
//                                         setValue("equipment", selectedItems.filter((el) => el !== item));
//                                     }
//                                 }}                                
//                             />
//                             {item}
//                         </label>
//                     ))}
//                     <h3 className="text-white mt-4">Selecciona las fechas:</h3>
//                     <input type="datetime-local" {...register("startDate")} className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2" required />
//                     <input type="datetime-local" {...register("endDate")} className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2" required />

//                 {/* 📌 Salas Disponibles */}
//                 <select {...register("roomId")} className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2">
//                     {availableRooms.length > 0 ? (
//                         availableRooms.map((room) => (
//                             <option key={room._id} value={room._id}>
//                                 {room.title} ({room.description})
//                             </option>
//                         ))
//                     ) : (
//                         <option value="">No hay salas disponibles</option>
//                     )}
//                 </select>

//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">Guardar</button>
//             </form>
//         </div>

//         {/* 📅 Calendario */}
//         <CalendarComp onSelectSlot={onSelectSlot} />
//     </div>
//     );
// }

// export default RoomsFormPage;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRooms } from "../context/RoomsContext";
import { useNavigate, useParams } from "react-router-dom";
import CalendarComp from "../components/Calendar";

function RoomsFormPage() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const { createRooms, getRoom, updateRoom } = useRooms();
    const navigate = useNavigate();
    const params = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const equipmentOptions = ["Pantalla", "Proyector", "Altavoces", "Microfono", "Pizarra", "Sillas", "Mesas", "Marcadores"];

    useEffect(() => {
        async function loadRoom() {
            if (params.id) {
                const room = await getRoom(params.id);
                setValue("title", room.title);
                setValue("description", room.description);
                setValue("equipment", room.equipment || []);
                setValue("startDate", room.startDate ? new Date(room.startDate).toISOString().slice(0, 16) : "");
                setValue("endDate", room.endDate ? new Date(room.endDate).toISOString().slice(0, 16) : "");
            }
        }
        loadRoom();
    }, [params.id, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        data.equipment = data.equipment || [];

        if (params.id) {
            updateRoom(params.id, data);
        } else {
            const response = await createRooms(data);
            if (!response.success) {
                setErrorMessage(response.message);
                return;
            }
        }
        navigate("/rooms");
    });
    const onSelectSlot = ({ start, end }) => {
                const formattedStart = moment(start).format("YYYY-MM-DDTHH:mm");
                const formattedEnd = moment(end).format("YYYY-MM-DDTHH:mm");
            
                setValue("startDate", formattedStart);
                setValue("endDate", formattedEnd);
            
                checkAvailability(); // Verifica la disponibilidad de salas en este horario
            };

    return (
        <div className="flex">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <form onSubmit={onSubmit}>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <input type="text" placeholder="Title" {...register("title")} autoFocus className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2" />
                    <textarea rows="3" placeholder="Description" {...register("description")} className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"></textarea>

                    <h3 className="text-white">Selecciona el equipamiento:</h3>
                    {equipmentOptions.map((item) => (
                        <label key={item} className="block text-white">
                            <input
                                type="checkbox"
                                value={item}
                                {...register("equipment")}
                                className="mr-2"
                                checked={Array.isArray(watch("equipment")) ? watch("equipment").includes(item) : false}

                                onChange={(e) => {
                                    const selectedItems = Array.isArray(watch("equipment")) ? watch("equipment") : [];
                                    if (e.target.checked) {
                                        setValue("equipment", [...selectedItems, item]);
                                    } else {
                                        setValue("equipment", selectedItems.filter((el) => el !== item));
                                    }
                                }}
                            />
                            {item}
                        </label>
                    ))}

                    <h3 className="text-white mt-4">Selecciona las fechas:</h3>
                    <input type="datetime-local" {...register("startDate")} className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2" required />
                    <input type="datetime-local" {...register("endDate")} className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2" required />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RoomsFormPage;
