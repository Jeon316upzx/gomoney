"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./client/auth/auth.route"));
const teams_route_1 = __importDefault(require("./admin/teams/teams.route"));
const auth_route_2 = __importDefault(require("./admin/auth/auth.route"));
const fixture_route_1 = __importDefault(require("./admin/fixture/fixture.route"));
const team_route_1 = __importDefault(require("./client/team/team.route"));
const fixture_route_2 = __importDefault(require("./client/fixture/fixture.route"));
const rate_limiter_1 = require("../middlewares/rate_limiter");
function routes() {
    const router = express_1.Router();
    //CLIENT
    //Client Authentication Router Namespace
    router.use("/auth", rate_limiter_1.limiter, auth_route_1.default);
    // Client Teams Router Namespace
    router.use("/teams", rate_limiter_1.limiter, team_route_1.default);
    // Client Fixtures Router Namespace
    router.use("/fixtures", rate_limiter_1.limiter, fixture_route_2.default);
    //ADMIN
    //Admin Authentication Router Namespace
    router.use("/admin", auth_route_2.default);
    //Teams Router Namespace
    router.use("/admin/team", teams_route_1.default);
    //Fixtures Router Namespace
    router.use("/admin/fixture", fixture_route_1.default);
    return router;
}
exports.default = routes;
