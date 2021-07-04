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
exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../../../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const options_1 = __importDefault(require("../../../config/options"));
const statuscode_1 = require("../../../constants/statuscode");
const response_1 = require("../../../constants/response");
const auth_validator_1 = require("./auth.validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    const result = auth_validator_1.registrationSchema.validate(req.body);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        return res
            .status(statuscode_1.HTTP.MISSING_PARAMS)
            .send({
            data: null,
            message: "Oops! some required fields are missing",
            status: response_1.rResponse.ERROR
        });
    }
    const userexists = yield User_model_1.default.findOne({ email });
    if (userexists) {
        return res
            .status(statuscode_1.HTTP.CONFLICT)
            .send({
            data: null,
            message: "An account with this email already exists",
            status: response_1.rResponse.ERROR
        });
    }
    const newuser = new User_model_1.default({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    });
    newuser.save().then((result) => {
        return res
            .status(statuscode_1.HTTP.CREATED)
            .send({
            data: null,
            message: "Account created Successfully",
            status: response_1.rResponse.SUCCESS
        });
    }).catch((error) => {
        return res
            .status(statuscode_1.HTTP.BAD_REQUEST)
            .send({
            data: error,
            message: error.message,
            status: response_1.rResponse.ERROR
        });
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = auth_validator_1.loginSchema.validate(req.body);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        res.status(statuscode_1.HTTP.MISSING_PARAMS).json({
            message: 'Oops! Some required fields are missing',
            data: req.body
        });
    }
    const user = yield User_model_1.default.findOne({ email });
    if (!user) {
        return res.status(statuscode_1.HTTP.BAD_REQUEST).send({
            data: null,
            message: "Account with this email address does not exist.",
            status: response_1.rResponse.ERROR
        });
    }
    const Isvalidpass = yield bcryptjs_1.default.compare(password, user.password);
    if (!Isvalidpass) {
        return res.status(statuscode_1.HTTP.BAD_REQUEST).send({
            data: null,
            message: "Password is incorrect",
            status: response_1.rResponse.ERROR
        });
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, options_1.default.JWT_TOKEN_KEY);
    return res.status(200).send({
        data: {
            token: token,
            user: user
        },
        message: "Login successful",
        status: response_1.rResponse.SUCCESS
    });
});
exports.login = login;
