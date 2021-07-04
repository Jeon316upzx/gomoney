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
exports.searchTeams = exports.viewTeams = exports.viewTeam = void 0;
const Team_model_1 = __importDefault(require("../../../models/Team.model"));
const statuscode_1 = require("../../../constants/statuscode");
const response_1 = require("../../../constants/response");
const redis_client_1 = require("../../../helpers/redis_client");
const viewTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let team = yield Team_model_1.default.findOne({ _id: req.params.id });
    if (!team) {
        return res
            .status(statuscode_1.HTTP.BAD_REQUEST)
            .send({
            data: null,
            message: "Team does not exist",
            status: response_1.rResponse.ERROR
        });
    }
    return res
        .status(statuscode_1.HTTP.OK)
        .send({
        data: {
            team: team
        },
        message: "Success",
        status: response_1.rResponse.SUCCESS
    });
});
exports.viewTeam = viewTeam;
const viewTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_client_1.redisClient.get('teams', (err, data) => {
        if (data) {
            console.log(data);
            return res
                .status(statuscode_1.HTTP.OK)
                .send({
                data: {
                    teams: JSON.parse(data)
                },
                message: "Success",
                status: response_1.rResponse.SUCCESS
            });
        }
    });
    let teams = yield Team_model_1.default.find({});
    yield redis_client_1.redisClient.set('teams', JSON.stringify(teams), 'EX', 10 * 60);
    return res
        .status(statuscode_1.HTTP.OK)
        .send({
        data: {
            teams: teams
        },
        message: "Success",
        status: response_1.rResponse.SUCCESS
    });
});
exports.viewTeams = viewTeams;
const searchTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.query.q;
    yield redis_client_1.redisClient.get('search', (err, data) => {
        if (data) {
            console.log(data);
            return res
                .status(statuscode_1.HTTP.OK)
                .send({
                data: {
                    teams: JSON.parse(data)
                },
                message: "Success",
                status: response_1.rResponse.SUCCESS
            });
        }
    });
    let teams = yield Team_model_1.default
        .find({
        $or: [
            { team_title: { $regex: ".*" + query + ".*" } },
            { slogan: { $regex: ".*" + query + ".*" } },
            { owner: { $regex: ".*" + query + ".*" } }
        ]
    });
    yield redis_client_1.redisClient.set('search', JSON.stringify(teams), 'EX', 2 * 60);
    return res
        .status(statuscode_1.HTTP.OK)
        .send({
        data: {
            teams: teams
        },
        message: "Success",
        status: response_1.rResponse.SUCCESS
    });
});
exports.searchTeams = searchTeams;
