import HotelSchema from "../models/HotelModel.js";
import RoomSchema from "../models/RoomModel.js";
import { ReqRes } from "./hotelController.js";

export const createRoom: ReqRes = async (req, res, next) => {
	const body = req.body;
	const hotelid = req.params.hotelid;
	try {
		const newRoom = new RoomSchema(body);
		const savedRoom = await newRoom.save();
		try {
			await HotelSchema.findByIdAndUpdate(hotelid, {
				$push: { rooms: savedRoom._id },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json(savedRoom);
	} catch (error) {
		next(error);
	}
};

/* UPDATE */
export const updateRoom: ReqRes = async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	try {
		const updatedRoom = await RoomSchema.findByIdAndUpdate(
			id,
			{
				$set: body,
			},
			{ new: true }
		);
		res.status(200).json(updatedRoom);
	} catch (error) {
		next(error);
	}
};

/* DELETE */
export const deleteRoom: ReqRes = async (req, res, next) => {
	const { id } = req.params;
	const { hotelid } = req.params;
	try {
		await RoomSchema.findByIdAndDelete(id);
		try {
			await HotelSchema.findByIdAndUpdate(hotelid, {
				$pull: { rooms: id },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json({ message: "Room has been deleted" });
	} catch (error) {
		next(error);
	}
};

/* GET */
export const getRoom: ReqRes = async (req, res) => {
	const { id } = req.params;
	try {
		const room = await RoomSchema.findById(id);
		res.status(200).json(room);
	} catch (error) {
		res.status(500).json(error);
	}
};
/* GET ALL HOTELS */
export const getAllRooms: ReqRes = async (req, res) => {
	try {
		const hotels = await RoomSchema.find();
		res.status(200).json(hotels);
	} catch (error) {
		res.status(500).json(error);
	}
};
