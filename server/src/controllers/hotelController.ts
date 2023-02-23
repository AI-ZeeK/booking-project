import { NextFunction, Request, Response } from "express";
import HotelSchema from "../models/HotelModel.js";

export interface ReqRes {
	(req: Request, res: Response, next: NextFunction): any;
}
/* CREATE */
export const createHotel: ReqRes = async (req, res, next) => {
	const body = req.body;
	try {
		const newHotel = new HotelSchema(body);
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		// res.status(500).json(error);
		next(error);
	}
};

/* UPDATE */
export const updateHotel: ReqRes = async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	try {
		const updatedHotel = await HotelSchema.findByIdAndUpdate(
			id,
			{
				$set: body,
			},
			{ new: true }
		);
		res.status(200).json(updatedHotel);
	} catch (error) {
		next(error);
	}
};

/* DELETE */
export const deleteHotel: ReqRes = async (req, res, next) => {
	const { id } = req.params;
	try {
		await HotelSchema.findByIdAndDelete(id);
		res.status(200).json({ message: "Hotel has been deleted" });
	} catch (error) {
		// res.status(500).json(error);
		next(error);
	}
};

/* GET */
export const getHotel: ReqRes = async (req, res, next) => {
	const { id } = req.params;
	try {
		const hotel = await HotelSchema.findById(id);
		res.status(200).json(hotel);
	} catch (error) {
		// res.status(500).json(error);
		next(error);
	}
};
/* GET ALL HOTELS */
export const getAllHotels: ReqRes = async (req, res, next) => {
	const { min, max, ...others }: any = req.query;
	try {
		const hotels = await HotelSchema.find({
			...others,
			cheapestPrice: {
				$gt: min | 1,
				$lt: max || 999,
			},
		}).limit(2);
		return res.status(200).json(hotels);
	} catch (error) {
		// res.status(500).json(error);
		next(error);
	}
};
export const countByCity: ReqRes = async (req: any, res) => {
	const cities = req.query.cities.split(",");
	console.log(cities, "city error");
	try {
		const list: any = await Promise.all(
			cities.map((city: any) => {
				return HotelSchema.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (error) {
		console.log(cities, "res");
		res.status(500).json(error);
	}
};
export const countByType: ReqRes = async (req: any, res, next) => {
	try {
		const hotelCount = await HotelSchema.countDocuments({ type: "hotel" });
		const apartmentCount = await HotelSchema.countDocuments({
			type: "apartment",
		});
		const resortCount = await HotelSchema.countDocuments({ type: "resort" });
		const villaCount = await HotelSchema.countDocuments({ type: "villa" });
		const cabinCount = await HotelSchema.countDocuments({ type: "cabin" });
		console.log("not really error");
		res.status(200).json([
			{
				type: "hotel",
				count: hotelCount,
			},
			{ type: "apartment", count: apartmentCount },
			{ type: "resort", count: resortCount },
			{ type: "villa", count: villaCount },
			{ type: "cabin", count: cabinCount },
		]);
	} catch (error) {
		console.log("error");
		res.status(500).json(error);
		next(error);
	}
};
