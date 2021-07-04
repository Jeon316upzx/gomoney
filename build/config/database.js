"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const options_1 = __importDefault(require("./options"));
const logger_1 = __importDefault(require("../logger"));
//Database configuration 
const db = mongoose_1.default.connect(options_1.default.MONGO_URL, options_1.default.MONGODB_OPTIONS).then(() => {
    logger_1.default.info(`Database Connected 🚀`);
}).catch((error) => {
    logger_1.default.error(`${error} 😱`);
});
exports.default = db;
