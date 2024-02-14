import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/UserRoute.js";
import authRoute from "./Routes/AuthRoute.js"

dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error : ", err);
    })

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000 :)");
});

app.get("/test", (req, res) => {
    res.json(
        {
        message: "Hello World !"
        }
    );
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})