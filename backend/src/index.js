import express from "express"
import authRoutes from "../routes/auth.route.js"
import messageRoutes from "../routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from "../lib/connect.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import {app, io, server} from "../lib/socket.js"
import path from "path"


dotenv.config()
const __dirname = path.resolve()

app.use(express.json({
    limit: '50mb'
  }));

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}
))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

if(process.env.NODE_ENV==="production"){
    //dirname goes to backend
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    console.log("server is listening on port", PORT)
    connectDB(MONGO_URI)
})