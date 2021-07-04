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
exports.generateFixtureLink = exports.editFixture = exports.viewFixtures = exports.viewFixture = exports.removeFixture = exports.addFixture = void 0;
const Fixture_model_1 = __importDefault(require("../../../models/Fixture.model"));
const response_1 = require("../../../constants/response");
const statuscode_1 = require("../../../constants/statuscode");
const fixture_validator_1 = require("./fixture.validator");
const Fixturelink_model_1 = __importDefault(require("../../../models/Fixturelink.model"));
const Team_model_1 = __importDefault(require("../../../models/Team.model"));
const shortid_1 = __importDefault(require("shortid"));
const addFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { team1, team2, fixture_date, fixture_status } = req.body;
    const team1exists = yield Team_model_1.default.findOne({ _id: team1 });
    const team2exists = yield Team_model_1.default.findOne({ _id: team2 });
    if (!team1exists || !team2exists) {
        return res
            .status(statuscode_1.HTTP.MISSING_PARAMS)
            .send({
            data: null,
            message: "Oops! some required fields are missing",
            status: response_1.rResponse.ERROR
        });
    }
    let newfixture = new Fixture_model_1.default({
        team1: team1,
        team2: team2,
        fixture_date: fixture_date,
        fixture_status: fixture_status
    });
    newfixture.save().then((result) => {
        return res
            .status(statuscode_1.HTTP.CREATED)
            .send({
            data: result,
            message: "Fixture created successfully",
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
exports.addFixture = addFixture;
const removeFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Fixture_model_1.default.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then((result) => {
        return res
            .status(statuscode_1.HTTP.ACCEPTED)
            .send({
            data: null,
            message: "Fixture successfully deleted",
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
exports.removeFixture = removeFixture;
const viewFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fixture = yield Fixture_model_1.default
        .findOne({ _id: req.params.id })
        .populate("team");
    if (!fixture) {
        return res
            .status(statuscode_1.HTTP.BAD_REQUEST)
            .send({
            data: null,
            message: "Fixture does not exist",
            status: response_1.rResponse.ERROR
        });
    }
    return res
        .status(statuscode_1.HTTP.OK)
        .send({
        data: {
            fixture: fixture
        },
        message: "Success",
        status: response_1.rResponse.SUCCESS
    });
});
exports.viewFixture = viewFixture;
const viewFixtures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fixtures = yield Fixture_model_1.default
        .find({})
        .populate("team");
    return res
        .status(statuscode_1.HTTP.OK)
        .send({
        data: {
            fixtures: fixtures
        },
        message: "Success",
        status: response_1.rResponse.SUCCESS
    });
});
exports.viewFixtures = viewFixtures;
const editFixture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = fixture_validator_1.fixtureSchema.validate(req.body);
    const { value, error } = result;
    const valid = error == null;
    console.log(result);
    if (!valid) {
        return res
            .status(statuscode_1.HTTP.MISSING_PARAMS)
            .send({
            data: null,
            message: "Oops! some required fields are missing",
            status: response_1.rResponse.ERROR
        });
    }
    yield Fixture_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, updatedteam) {
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
            message: "Fixture Successfully Updated",
            status: response_1.rResponse.SUCCESS
        });
    });
});
exports.editFixture = editFixture;
const generateFixtureLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fixture = yield Fixture_model_1.default
        .findOne({ _id: req.params.id })
        .populate("team");
    if (!fixture) {
        return res
            .status(statuscode_1.HTTP.BAD_REQUEST)
            .send({
            data: null,
            message: "Fixture does not exist",
            status: response_1.rResponse.ERROR
        });
    }
    let linkexists = yield Fixturelink_model_1.default.findOne({ fixture: fixture._id });
    if (linkexists) {
        return res
            .status(statuscode_1.HTTP.BAD_REQUEST)
            .send({
            data: null,
            message: "Fixture link already created",
            status: response_1.rResponse.ERROR
        });
    }
    let newlink = new Fixturelink_model_1.default({
        fixture: fixture._id,
        unique_link: shortid_1.default.generate()
    });
    newlink.save().then((result) => {
        return res
            .status(statuscode_1.HTTP.CREATED)
            .send({
            data: result,
            message: "Fixture link created successfully",
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
exports.generateFixtureLink = generateFixtureLink;
