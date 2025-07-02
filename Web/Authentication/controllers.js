import express from "express"
import bcrypt from "bcrypt"
import User from "../Models/User.js"
import jwt from "jsonwebtoken"


export const signup=async (req,res)=>{
    try{
        // console.log(process.env.JWT_SECRET);
        const {name, username, email, password}=req.body;

        if(!name || !username || !email || !password){
            return res.status(400).json({message:"Please fill all fields"});
        }
        console.log(username);
        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"username already exists"});
        }
        const existingEmail=await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:"email already exists"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Password length should be greater"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);

        const user=new User({name, username, email, password:hashedPassword});
        await user.save();
        console.log("User Saved to database");

        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.cookie("jwt-cookie",token,{maxAge:1*24*60*60*1000, httpOnly:true});
        res.status(200).json({message:"User Registered Successfuly"})

    }
    catch(e){
        console.log("Error in signup controler:",e.message);
        return res.status(400).json({message:"Internal server error"});
    }
}

export const login=async (req,res)=>{
    try {
        const {email, password} =req.body;
        if(!email || !password){
            return res.status(400).json({message:"Internal server"});
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"email doesnot exists"});
        }

        const ismatch=bcrypt.compare(password, user.password);
        if(!ismatch){
            return res.status(400).json({message:"incorrect password"});
        }

        const token=jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
        res.cookie("jwt-cookie", token, {httpOnly:true, maxAge:1*24*60*60*1000})

        res.json({message:"Logged in successfuly"});

    } catch (error) {
        console.log(`Error in login controller:${error.message}`);
        return res.status(400).json({message:"Internal Server error"});
    }
}

export function logout(req,res){
    res.clearCookie("jwt-cookie");
    res.status(200).json({message:"Logged out successfully"});
    console.log("User LogedOut");
}
