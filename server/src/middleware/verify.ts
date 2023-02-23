import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import { ReqRes } from "../controllers/userController.js";

export const verifyToken: any = (req: any, res: any, next: any) => {
	const token = req.cookies.access_token;
	if (!token) {
		console.log("you are not authorised");
		return next(new ErrorResponse("You are not authenticated", 400));
	}

	jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, user: any) => {
		if (err) return next(new ErrorResponse("Token is not valid", 403));
		req.user = user;

		next();
	});
};

export const verifyUser: ReqRes = (req: any, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return next(new ErrorResponse("You are not authorised", 403));
		}
	});
};

export const verifyAdmin: ReqRes = (req: any, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.isAdmin) {
			console.log("req. user admin", req.user);
			return next();
		} else {
			console.log("You are not authorised", 403, req.user);
			return next(new ErrorResponse("You are not authorised", 403));
		}
	});
};
