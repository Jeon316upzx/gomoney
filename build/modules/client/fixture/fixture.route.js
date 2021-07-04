"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fixture_controller_1 = require("./fixture.controller");
const checktoken_1 = require("../../../middlewares/checktoken");
const ClientFixturesrouter = express_1.Router();
ClientFixturesrouter.get("/pending", checktoken_1.checktoken, fixture_controller_1.viewPendingFixtures);
ClientFixturesrouter.get("/completed", checktoken_1.checktoken, fixture_controller_1.viewCompletedFixtures);
exports.default = ClientFixturesrouter;
