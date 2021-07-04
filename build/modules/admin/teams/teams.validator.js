"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.teamSchema = joi_1.default.object().keys({
    team_title: joi_1.default.string().required(),
    slogan: joi_1.default.string().required(),
    year_founded: joi_1.default.string().required(),
    flag_thumbnail: joi_1.default.string().required(),
    owner: joi_1.default.string().required(),
    made_by: joi_1.default.string().required()
});
