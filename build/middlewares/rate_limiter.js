"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
//a simple rate limiter that has a 
//maximum of 50 requests per hour
exports.limiter = express_rate_limit_1.default({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests are coming from this IP address, try again in an hour"
});
