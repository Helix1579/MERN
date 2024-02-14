import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../Utilities/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    // Data from the client
    const { username, email, password } = req.body;
    
    // Hashing the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    //Creating a new user
    const newUser = new User(
        { 
            username,
            email,
            password : hashedPassword
        });

    try {
        await newUser.save();
    
        res.status(201).json({
            success: true,
            message: "User Created Successfully !"
        });
        
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try
    {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, "Invalid Credentials"));
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, "Invalid Password"));
        }

        const token = jwt.sign({
            id: validUser._id },
            process.env.JWT_SECRET
        );

        res.cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json(validUser)

    } catch (error) {
        next(error);
    }
}