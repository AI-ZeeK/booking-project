import { Router } from "express";
import {
	createRoom,
	deleteRoom,
	getAllRooms,
	getRoom,
	updateRoom,
} from "../controllers/roomsController.js";
import { verifyAdmin } from "../middleware/verify.js";
const router = Router();

/* UPDATE Room */
router.post("/:hotelid", verifyAdmin, createRoom);

/* UPDATE Room */
router.put("/:id", verifyAdmin, updateRoom);

/* DELETE Room */
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

/* GET Room */
router.get("/:id", getRoom);

/* GET ALL RoomS */
router.get("/", getAllRooms);

export default router;
