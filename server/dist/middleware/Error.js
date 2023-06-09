import ErrorResponse from "../utils/ErrorResponse.js";
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    console.log(err);
    if (err.code === 11000) {
        const message = "Duplicate Field Value Enter";
        error = new ErrorResponse(message, 400);
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
        message: "error here",
    });
};
export default errorHandler;
