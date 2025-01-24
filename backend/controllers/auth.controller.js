import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import {generateToken} from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) =>{
    const {fullName, email, password, profilePic} = req.body
    try {

        if(!fullName || !password || !email){
            return res.status(400).json({message: "must fill all blanks"})
        }

        if(password.length < 6){
            return res.status(400).json({message: "password must be atleast 6 characters long"})
        }
        const user = await User.findOne({email: email})
        if(user){
            return res.status(400).json({message: "User already exists"})   
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profilePic
        })

        if(newUser){
            //generate jwt token
            generateToken(newUser._id, res)
            await newUser.save()
 
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            return res.status(400).json({message: "Invalid user data"})
        }

    } catch (error) {
        console.log("error in signup controller", error.message)
        return res.status(500).json({message: "internal server error"})
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "incorrect password"})
        }

        generateToken(user._id, res)

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("error with login controller:", error.message)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const logout = async (req, res)=>{
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        return res.status(200).json({message: "logged out successfully"})
    } catch (error) {
        console.log("error in logout controller:", error.message)
        return res.status(500).json({message: "internal server error"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body
        const userId = req.user._id
        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required!"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new: true})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile controller", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const checkAuth = async (req, res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in check auth controller", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}