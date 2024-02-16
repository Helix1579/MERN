import User from "../Models/UserModel.js";
import { errorHandler } from "../Utilities/error.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
    res.json(
        {
            message: "Test API is working !"
        }
    );
};

export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "Not Authorized"))
    }

    try 
    {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}