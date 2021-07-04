"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checktoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const options_1 = __importDefault(require("../config/options"));
const statuscode_1 = require("../constants/statuscode");
const response_1 = require("../constants/response");
//checktoken middleware verifies the token from requests
const checktoken = (req, res, next) => {
    try {
        let token = '';
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log(req.params);
        const decodedToken = jsonwebtoken_1.default.verify(token, options_1.default.JWT_TOKEN_KEY);
        const userId = decodedToken.userId;
        //extract made by ie who made the request
        req.body.made_by = decodedToken._id;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
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
};
exports.checktoken = checktoken;
