"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAdmin = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const statuscode_1 = require("../constants/statuscode");
const response_1 = require("../constants/response");
//Checks if user has admin privileges 
const checkIfAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_model_1.default.findOne({ email: email });
        //checks if the usertype is admin
        if (user.usertype !== "admin") {
            return res.status(statuscode_1.HTTP.UNAUTHORIZED).send({
                data: null,
                message: 'Unauthorized Access',
                status: response_1.rResponse.ERROR
            });
        }
        else {
            next();
        }
    }
    catch (_a) {
        res.status(statuscode_1.HTTP.UNAUTHORIZED).send({
            data: null,
            message: 'Invalid request',
            status: response_1.rResponse.ERROR
        });
    }
});
exports.checkIfAdmin = checkIfAdmin;
