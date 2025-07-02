import express from "express"
import { signup, login, logout } from "./controllers.js";

const router=express.Router();

router.post("/",(req,res)=>{
    res.json({message:"Auth Route"})
})
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);


export default router;