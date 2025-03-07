"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusRoute = void 0;
/**
 * @param req
 * @param res
 */
const StatusRoute = (_req, res) => {
    res.status(200).json({
        status: "success",
        message: "API is running properly",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
    });
};
exports.StatusRoute = StatusRoute;
