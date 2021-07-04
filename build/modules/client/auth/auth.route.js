"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const Authrouter = express_1.Router();
Authrouter.post("/register", auth_controller_1.register);
Authrouter.post("/login", auth_controller_1.login);
exports.default = Authrouter;
