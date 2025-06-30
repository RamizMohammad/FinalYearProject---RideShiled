import express from 'express'
import dotenv from 'dotenv'



const app=express();
dotenv.config();
const PORT=process.env.PORT||8000;

app.get('/',(req,res)=>{
    res.send('Web server is running');
})

app.listen(PORT,()=>{
    console.log(`Web server is running on ${PORT}`);
    console.log(`Access on http://localhost:${PORT}`);
})