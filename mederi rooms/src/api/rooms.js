import axios from "./axios";

export const getRoomsRequest = async () => {
    const res = await axios.get("/rooms"); 
    return res;
};

export const getRoomRequest = async (id) => {
    return axios.get(`/rooms/${id}`)
}

export const createRoomsRequest = async (room) => {
    return axios.post(`/rooms`, room)
}

export const updateRoomsRequest = async (id, room) => {
    return axios.put(`/rooms/${id}`, room)
}

export const deleteRoomsRequest = async (id) => {
    return axios.delete(`/rooms/${id}`)
}

export const allRoomsRequest = async () => {
    return axios.get(`/all-rooms`)
}
// export const getOccupiedRooms = async () => {
//     return axios.get(`/occupied`)
// }