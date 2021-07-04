"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//Project configuration oprions
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const API_VERSION = process.env.API_VERSION;
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST;
//MongoDB configuration options
const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
const config_options = {
    PORT: PORT,
    MONGO_URL: MONGO_URL,
    MONGODB_OPTIONS: MONGODB_OPTIONS,
    API_VERSION: API_VERSION,
    JWT_TOKEN_KEY: JWT_TOKEN_KEY,
    REDIS_PORT: REDIS_PORT,
    REDIS_HOST: REDIS_HOST
};
exports.default = config_options;
