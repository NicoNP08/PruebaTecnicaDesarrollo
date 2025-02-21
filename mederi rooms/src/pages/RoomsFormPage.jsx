import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRooms } from "../context/RoomsContext";
import { useNavigate, useParams } from "react-router-dom";

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

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="max-w-md w-full p-10 rounded-md border border-black">
                <form onSubmit={onSubmit}>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <input type="text" placeholder="Title" {...register("title")} autoFocus className="border border-black text-black px-4 py-2 rounded-md my-2 w-full" />
                    <textarea rows="3" placeholder="Description" {...register("description")} className="border border-black text-black px-4 py-2 rounded-md my-2 w-full"></textarea>

                    <h3 className="text-black">Selecciona el equipamiento:</h3>
                    {equipmentOptions.map((item) => (
                        <label key={item} className="block text-black">
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

                    <h3 className="text-black mt-4">Selecciona la fecha y hora de inicio:</h3>
                    <input type="datetime-local" {...register("startDate")} className="border border-black text-black px-4 py-2 rounded-md my-2 w-full" required />
                    <h3 className="text-black mt-4">Selecciona la fecha y hora de finalización:</h3>
                    <input type="datetime-local" {...register("endDate")} className="border border-black text-black px-4 py-2 rounded-md my-2 w-full" required />
                    <button className="text-white text-align-center bg-[#f05a03] rounded p-3 w-full">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RoomsFormPage;
