import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(new ErrorResponse("You are not authenticated", 400));
    }
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, user) => {
        if (err)
            return next(new ErrorResponse("Token is not valid", 403));
        req.user = user;
        next();
    });
};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next),
        () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            }
            else {
                return next(new ErrorResponse("You are not authorised", 403));
            }
        };
};
