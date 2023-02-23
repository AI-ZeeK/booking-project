import { NextFunction, Request, Response } from "express";
import HotelSchema from "../models/HotelModel.js";
import UserSchema from "../models/AuthModel.js";

export interface ReqRes {
	(req: Request, res: Response, next: NextFunction): any;
}
/* CREATE */
export const createUser: ReqRes = async (req, res, next) => {
	const body = req.body;
	try {
		const newUser = new HotelSchema(body);
		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch (error) {
		// res.status(500).json(error);
		next(error);
	}
};

/* UPDATE */
export const updateUser: ReqRes = async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	try {
		const updatedUser = await HotelSchema.findByIdAndUpdate(
			id,
			{
				$set: body,
			},
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

/* DELETE */
export const deleteUser: ReqRes = async (req, res, next) => {
	const { id } = req.params;
	try {
		await HotelSchema.findByIdAndDelete(id);
		res.status(200).json({ message: "User has been deleted" });
	} catch (error) {
		// res.status(500).json(error);
		next(error);
	}
};

/* GET */
export const getUser: ReqRes = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await HotelSchema.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
};
/* GET ALL USERS */
export const getAllUsers: ReqRes = async (req, res) => {
	try {
		const users = await UserSchema.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error);
	}
};
