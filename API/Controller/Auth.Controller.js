import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const { username, email, password } = req.body;
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
        res.status(500).json(error.message);
    }
    
}