"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const namespace_routes_1 = __importDefault(require("./modules/namespace.routes"));
const options_1 = __importDefault(require("./config/options"));
//Initialize database
const database_1 = __importDefault(require("./config/database"));
database_1.default;
//Initialize Express App
const app = express_1.default();
//Initialize Express Body Parser and Dev logger
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const apiURL = `/gomoney/api/${options_1.default.API_VERSION}`;
app.use(apiURL, namespace_routes_1.default());
exports.default = app;
