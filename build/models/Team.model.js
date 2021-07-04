"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
//a simple team model consisting of a title, slogan, year founded, flag and owner
const teamSchema = new mongoose_1.Schema({
    team_title: {
        type: String,
        required: true
    },
    slogan: {
        type: String,
    },
    year_founded: {
        type: String,
        required: true
    },
    flag_thumbnail: {
        type: String,
    },
    owner: {
        type: String,
        required: true
    },
    made_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
const teamModel = mongoose_1.default.model('Team', teamSchema);
exports.default = teamModel;
