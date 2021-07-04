"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const admin_only_1 = require("../../../middlewares/admin_only");
const Adminrouter = express_1.Router();
Adminrouter.post("/register", auth_controller_1.register);
Adminrouter.post("/login", admin_only_1.checkIfAdmin, auth_controller_1.login);
exports.default = Adminrouter;
