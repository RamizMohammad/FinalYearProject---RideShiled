import express, { json } from 'express'
import dotenv from 'dotenv'

import { connectDB } from './Lib/db.js';
import authRoutes from "./Authentication/authRoutes.js"



const app=express();
app.use(express.json({limit:'5mb'}));
dotenv.config();

const PORT=process.env.PORT||8000;

app.get('/',(req,res)=>{
    res.send('Web server is running');
})

app.use("/api/v1/auth",authRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Web server is running on ${PORT}`);
    console.log(`Access on http://localhost:${PORT}`);
})