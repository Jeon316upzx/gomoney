"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.fixtureSchema = joi_1.default.object().keys({
    team1: joi_1.default.string().required(),
    team2: joi_1.default.string().required(),
    fixture_date: joi_1.default.date().required(),
    fixture_status: joi_1.default.string().required(),
    made_by: joi_1.default.string().required()
});
