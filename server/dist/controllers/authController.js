var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import UserSchema from "../models/AuthModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserSchema({
            username,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const _a = user._doc, { isAdmin } = _a, others = __rest(_a, ["isAdmin"]);
        res.status(201).json(Object.assign({}, others));
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await UserSchema.findOne({
            username,
        });
        if (!user)
            return next(new ErrorResponse("Please provide an Email and Password", 400));
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            return next(new ErrorResponse("Wrong Password or username", 400));
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, `${process.env.JWT_SECRET}`);
        const _a = user._doc, { isAdmin } = _a, others = __rest(_a, ["isAdmin"]);
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(201)
            .json(Object.assign({}, others));
    }
    catch (error) {
        next(error);
    }
};
