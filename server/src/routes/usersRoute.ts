import { Router } from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verify.js";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from "../controllers/userController.js";
const router = Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
	res.send("hello user, you are logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
	res.json({message: "hello user, you are really really logged "})
});
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
	res.json({message: "hello Admin, you are logged in"});
});

/* UPDATE User */
router.post("/",verifyUser, createUser);

/* UPDATE User */
router.put("/:id",verifyUser, updateUser);

/* DELETE User */
router.delete("/:id",verifyUser, deleteUser);

/* GET User */
router.get("/:id",verifyUser, getUser);

/* GET ALL UserS */
router.get("/",verifyAdmin, getAllUsers);
export default router;
