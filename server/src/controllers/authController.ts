import UserSchema from "../models/AuthModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { ReqRes } from "./hotelController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register: ReqRes = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt: any = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserSchema({
      username,
      email,
      password: hashedPassword,
    });

    const user: any = await newUser.save();
    const { isAdmin, ...others } = user._doc;
    res.status(201).json({ ...others });
  } catch (error) {
    next(error);
  }
};
export const login: ReqRes = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user: any = await UserSchema.findOne({
      username,
    });
    if (!user)
      return next(
        new ErrorResponse("Please provide an Email and Password", 400)
      );
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(new ErrorResponse("Wrong Password or username", 400));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      `${process.env.JWT_SECRET}`
    );
    const { isAdmin, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};
