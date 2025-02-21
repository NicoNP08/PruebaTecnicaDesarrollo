import Rooms from "../models/rooms.model.js";

export const getRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find().populate("user");
        res.json(rooms);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getAllRooms = async (req, res) => {
    const rooms = await Rooms.find()
    res.json(rooms)
}

export const createRooms = async (req, res) => {
    try {
        const totalRoomsCount = await Rooms.countDocuments();

        if (totalRoomsCount >= 8) {
            return res.status(400).json({ message: 'The maximum number of rooms (8) has been reached' });
        }

        const {title, description, date, equipment, startDate, endDate} = req.body
        const newRoom = new Rooms({
        title,
        description,
        date,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        user: req.user.id,
        equipment: equipment || [],
        isOccupied: true
        })
        const savedRooms = await newRoom.save()

        res.json(savedRooms)
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong'})
    }
}



export const getRoom = async (req, res) => {
    try {
        const room= await Rooms.findById(req.params.id).populate('user')
        if(!room) return res.status(404).json({message: 'Room not found'})
        res.json(room) 
    } catch (error) {
        return res.status(404).json({message: 'Room not found'})
    }
}

export const deleteRooms = async (req, res) => {
    try {
        const room= await Rooms.findByIdAndDelete(req.params.id)
        if(!room) return res.status(404).json({message: 'Room not found'})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: 'Room not found'})
    }
}


export const updateRooms = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (startDate) req.body.startDate = new Date(startDate);
        if (endDate) req.body.endDate = new Date(endDate);

        const room = await Rooms.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.json(room);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const getOccupiedRooms = async (req, res) => {
    try {
        const occupiedRooms = await Rooms.find({ isOccupied: true }).populate("user");
        res.json(occupiedRooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching occupied rooms", error }); 
    }
}

