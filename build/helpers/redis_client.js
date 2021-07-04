"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = __importDefault(require("redis"));
const options_1 = __importDefault(require("../config/options"));
//A Simple Redis configuration
exports.redisClient = redis_1.default.createClient({
    host: options_1.default.REDIS_HOST,
    port: options_1.default.REDIS_PORT,
});
