import mongoose from "mongoose";
import dotenv from "dotenv"

export async function connectDB() {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Is connected")
    } catch (error) {
        console.error(`Error in connecting with MongoDB:${error.message}`);
    }
}