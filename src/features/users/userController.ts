import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcryptjs"
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password, name} = req.body

        if(!name || !password !||email){
            const error = createHttpError(400, "All feilds are required")
            return next(error)
        }

        const userExists = await userModel.findById({email})

        if(!userExists){
            const error = createHttpError(400, "User Already exits")
            return next(error)
        }

        if(password < 6){
            const error = createHttpError(400, "Password must be 6 characters")
            return next(error)
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password:hashPassword
        })
    } catch (error) {
        return next(createHttpError(500, "Error while creating user."));
    }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body

    if(!password !||email){
        const error = createHttpError(400, "All feilds are required")
        return next(error)
    }

    const userExists = await userModel.findById({email})

    if(!userExists){
        const error = createHttpError(400, "User not Found")
        return next(error)
    }

    const MatchPassword = await bcrypt.compare(password, userExists.password)

    if(!MatchPassword){
        const error = createHttpError(400, "Invalid Credentials")
        return next(error)
    }

    
};
export const logout = async () => {};