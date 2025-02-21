import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isOccupied: {type: Boolean,
        default: false
    },
    equipment: [{ type: String, enum: ["Pantalla", "Proyector", "Altavoces", "Microfono", "Pizarra", "Sillas", "Mesas", "Marcadores"] }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
}, {
    timestamps:true
})

export default mongoose.model('Rooms', roomsSchema)