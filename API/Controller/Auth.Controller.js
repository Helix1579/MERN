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

// export const signin = async (req, res, next) => {
//     const { email, password } = req.body;

//     try
//     {
//         const validUser = await User.findOne({ email });
//         if (!validUser) return next(errorHandler(404, 'User not found!'));
//         const validPassword = bcrypt.compareSync(password, validUser.password);
//         if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
//         const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//         const { password: pass, ...rest } = validUser._doc;
//         res
//             .cookie('access_token', token, { httpOnly: true })
//             .status(200)
//             .json(rest);
        
//     } catch (error) {
//         next(error);
//     }
// };
  


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try
    {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, "User Not Found"));
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, "Invalid Password"));
        }

        const token = jwt.sign({
            id: validUser._id },
            process.env.JWT_SECRET
        );

        res.cookie('access_token', token, {
            httpOnly: true
        })
        .status(200)
        .json(validUser)

    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    const { name, email, photo } = req.body;
    try 
    {
        const user = await User.findOne({
            email : req.body.email
        })
        if (user) {
            const token = jwt.sign({
                id: user._id },
                process.env.JWT_SECRET
            );

            res.cookie('access_token', token, {
                httpOnly: true
            })
            .status(200)
            .json(user);

            console.log(token);
            return;

        } else {
            const generatedPassword = Math.random().toString(36).slice(-8)
                + Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toUpperCase() 
                    + Math.random().toString(36).slice(-4),
                email : req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            
            res.cookie('access_token', token, {
                httpOnly: true
            })
            .status(200)
            .json(newUser);
        }
    }
    catch (error) {
        next(error);
    }
}