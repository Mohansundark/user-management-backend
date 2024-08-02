"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message = 'Request successful') => {
    res.status(200).json({ success: true, data, message });
};
exports.successResponse = successResponse;
const errorResponse = (res, message = 'Request failed', statusCode = 500) => {
    res.status(statusCode).json({ success: false, message });
};
exports.errorResponse = errorResponse;
