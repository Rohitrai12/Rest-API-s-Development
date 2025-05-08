import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";
import { config } from "../../config/config";
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body

        if (!name || !password || !email) {
            const error = createHttpError(400, "All feilds are required")
            return next(error)
        }

        const userExists = await userModel.findOne({ email })

        if (userExists) {
            const error = createHttpError(400, "User Already exits")
            return next(error)
        }

        if (password.length < 6) {
            const error = createHttpError(400, "Password must be 6 characters")
            return next(error)
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name,
            email,
            password: hashPassword
        })

        try {
            const token = sign({ sub: newUser._id }, config.JWT_SECRET as string, {
                expiresIn: "7d",
                algorithm: "HS256",
            });
            res.status(201).json({ accessToken: token });
        } catch (error) {
            return next(createHttpError(500, "Error while creating user."));
        }
    } catch (error) {
        return next(createHttpError(500, "Error while creating user."));
    }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!password! || email) {
        const error = createHttpError(400, "All feilds are required")
        return next(error)
    }

    const userExists = await userModel.findById({ email })

    if (!userExists) {
        const error = createHttpError(400, "User not Found")
        return next(error)
    }

    const MatchPassword = await bcrypt.compare(password, userExists.password)

    if (!MatchPassword) {
        const error = createHttpError(400, "Invalid Credentials")
        return next(error)
    }

    // Create accesstoken
    const token = sign({ sub: userExists._id }, config.JWT_SECRET as string, {
        expiresIn: "7d",
        algorithm: "HS256",
    });

    res.json({ accessToken: token });

};
export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("accessToken");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return next(createHttpError(500, "Error while logging out"));
    }
};