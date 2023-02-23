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
import HotelSchema from "../models/HotelModel.js";
/* CREATE */
export const createHotel = async (req, res, next) => {
    const body = req.body;
    try {
        const newHotel = new HotelSchema(body);
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch (error) {
        // res.status(500).json(error);
        next(error);
    }
};
/* UPDATE */
export const updateHotel = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const updatedHotel = await HotelSchema.findByIdAndUpdate(id, {
            $set: body,
        }, { new: true });
        res.status(200).json(updatedHotel);
    }
    catch (error) {
        next(error);
    }
};
/* DELETE */
export const deleteHotel = async (req, res, next) => {
    const { id } = req.params;
    try {
        await HotelSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Hotel has been deleted" });
    }
    catch (error) {
        // res.status(500).json(error);
        next(error);
    }
};
/* GET */
export const getHotel = async (req, res, next) => {
    const { id } = req.params;
    try {
        const hotel = await HotelSchema.findById(id);
        res.status(200).json(hotel);
    }
    catch (error) {
        // res.status(500).json(error);
        next(error);
    }
};
/* GET ALL HOTELS */
export const getAllHotels = async (req, res, next) => {
    const _a = req.query, { min, max } = _a, others = __rest(_a, ["min", "max"]);
    try {
        const hotels = await HotelSchema.find(Object.assign(Object.assign({}, others), { cheapestPrice: {
                $gt: min | 1,
                $lt: max || 999,
            } })).limit(2);
        return res.status(200).json(hotels);
    }
    catch (error) {
        // res.status(500).json(error);
        next(error);
    }
};
export const countByCity = async (req, res) => {
    const cities = req.query.cities.split(",");
    console.log(cities, "city error");
    try {
        const list = await Promise.all(cities.map((city) => {
            return HotelSchema.countDocuments({ city: city });
        }));
        res.status(200).json(list);
    }
    catch (error) {
        console.log(cities, "res");
        res.status(500).json(error);
    }
};
export const countByType = async (req, res, next) => {
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
    }
    catch (error) {
        console.log("error");
        res.status(500).json(error);
        next(error);
    }
};
