import exp from "constants";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
},
    { timestamps: true }
);

const user = mongoose.model("User", userSchema);

export default User;