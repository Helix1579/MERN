import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';

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