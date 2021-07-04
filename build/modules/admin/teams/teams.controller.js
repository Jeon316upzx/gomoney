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
exports.editTeam = exports.viewTeams = exports.viewTeam = exports.removeTeam = exports.addTeam = void 0;
const Team_model_1 = __importDefault(require("../../../models/Team.model"));
const teams_validator_1 = require("./teams.validator");
const statuscode_1 = require("../../../constants/statuscode");
const response_1 = require("../../../constants/response");
const addTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { team_title, slogan, year_founded, flag_thumbnail, owner, made_by } = req.body;
    const result = teams_validator_1.teamSchema.validate(req.body);
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
    const teamexists = yield Team_model_1.default.findOne({ team_title });
    if (teamexists) {
        return res
            .status(statuscode_1.HTTP.CONFLICT)
            .send({
            data: null,
            message: "A team with this team title already exist",
            status: response_1.rResponse.ERROR
        });
    }
    const newteam = new Team_model_1.default({
        team_title: team_title,
        slogan: slogan,
        year_founded: year_founded,
        flag_thumbnail: flag_thumbnail,
        owner: owner,
        made_by: made_by
    });
    newteam.save().then((result) => {
        return res
            .status(statuscode_1.HTTP.CREATED)
            .send({
            data: result,
            message: "Team created Successfully",
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
exports.addTeam = addTeam;
const removeTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Team_model_1.default.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then((result) => {
        return res
            .status(statuscode_1.HTTP.ACCEPTED)
            .send({
            data: null,
            message: "Team successfully deleted",
            status: response_1.rResponse.SUCCESS
        });
    })
        .catch((err) => {
        return res
            .status(statuscode_1.HTTP.BAD_REQUEST)
            .send({
            data: null,
            message: "Sorry, deletion was not successful",
            status: response_1.rResponse.ERROR
        });
    });
});
exports.removeTeam = removeTeam;
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
    let teams = yield Team_model_1.default.find({});
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
const editTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = teams_validator_1.teamSchema.validate(req.body);
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
    yield Team_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, updatedteam) {
        if (err) {
            return res
                .status(statuscode_1.HTTP.BAD_REQUEST)
                .send({
                data: null,
                message: "Update was not completed.",
                status: response_1.rResponse.ERROR
            });
        }
        return res
            .status(statuscode_1.HTTP.ACCEPTED)
            .send({
            data: result,
            message: "Team Successfully Updated",
            status: response_1.rResponse.SUCCESS
        });
    });
});
exports.editTeam = editTeam;
