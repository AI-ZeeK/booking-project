import { Router } from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel, } from "../controllers/hotelController.js";
import { verifyAdmin } from "../middleware/verify.js";
const router = Router();
router.get("/countByType", countByType);
router.get("/countByCity", countByCity);
/* UPDATE HOTEL */
router.post("/", verifyAdmin, createHotel);
/* UPDATE HOTEL */
router.put("/:id", verifyAdmin, updateHotel);
/* DELETE HOTEL */
router.delete("/:id", verifyAdmin, deleteHotel);
/* GET HOTEL */
router.get("/:id", getHotel);
/* GET ALL HOTELS */
router.get("/", getAllHotels);
export default router;
