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
exports.viewCompletedFixtures = exports.viewPendingFixtures = void 0;
const Fixture_model_1 = __importDefault(require("../../../models/Fixture.model"));
const response_1 = require("../../../constants/response");
const fixture_1 = require("../../../constants/fixture");
const statuscode_1 = require("../../../constants/statuscode");
const redis_client_1 = require("../../../helpers/redis_client");
const viewPendingFixtures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_client_1.redisClient.get('pending', (err, data) => {
        if (data) {
            console.log(data);
            return res
                .status(statuscode_1.HTTP.OK)
                .send({
                data: {
                    fixtures: JSON.parse(data)
                },
                message: "Success",
                status: response_1.rResponse.SUCCESS
            });
        }
    });
    let fixtures = yield Fixture_model_1.default
        .find({ fixture_status: fixture_1.FIXTURE_STATUS.PENDING })
        .populate("team1")
        .populate("team2");
    yield redis_client_1.redisClient.set('pending', JSON.stringify(fixtures), 'EX', 10 * 60);
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
exports.viewPendingFixtures = viewPendingFixtures;
const viewCompletedFixtures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_client_1.redisClient.get('completed', (err, data) => {
        if (data) {
            console.log(data);
            return res
                .status(statuscode_1.HTTP.OK)
                .send({
                data: {
                    fixtures: JSON.parse(data)
                },
                message: "Success",
                status: response_1.rResponse.SUCCESS
            });
        }
    });
    let fixtures = yield Fixture_model_1.default
        .find({ fixture_status: fixture_1.FIXTURE_STATUS.COMPLETED })
        .populate("team1")
        .populate("team2");
    yield redis_client_1.redisClient.set('completed', JSON.stringify(fixtures), 'EX', 10 * 60);
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
exports.viewCompletedFixtures = viewCompletedFixtures;
