import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoutes = async (req, res, next) => {
    try {
        //getting token from cookies
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message: "Unauthorized - No token provided"})
        }
        
        //decoding token to get user id
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        req.user = user
        //console.log("middleware passed", decoded)
        next()
    } catch (error) {
        console.log("error in protect routes controller", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}