import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 12);
    
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    
    
    try
    {
        await newUser.save();
        res.status(201).json({
                message: "User created successfully !"
            });
    } catch (error) {
        res.status(500).json(error.message);
    }
}