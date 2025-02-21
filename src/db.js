import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://nicoriverap08:De7FMUrjjLY2L0QR@pruebat.ektjj.mongodb.net/')
        console.log('DB is conected')
    }catch (error){
        console.log(error)
    }

}