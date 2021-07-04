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
const app_1 = __importDefault(require("../app"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
require("mocha");
const fixture_1 = require("../constants/fixture");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe("Gomoney project Admin testCase", () => __awaiter(void 0, void 0, void 0, function* () {
    let admintoken = null;
    before("Authenticate admin before runnng test", () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield chai_1.default
            .request(app_1.default)
            .post("/gomoney/api/v1/admin/login")
            .send({ email: "jeon316@gmail.com", password: "dada12345" });
        admintoken = res.body.data.token;
    }));
    //Admin authentication
    describe("Register", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return an admin already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .post("/gomoney/api/v1/admin/register")
                .send({ firstname: "Dan", lastname: "Brown", email: "jeon316@gmail.com", password: "dada12345" });
            expect(res.status).to.equal(409);
        }));
    }));
    //Fixture
    describe("Add fixture", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return create new fixture", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .post("/gomoney/api/v1/admin/fixture/add")
                .send({ team1: "60df4ce12cf37a561c60dbe2", team2: "60df4c762cf37a561c60dbda", fixture_date: "2025-12-08", fixture_status: fixture_1.FIXTURE_STATUS.COMPLETED })
                .set({ "Authorization": `Bearer ${admintoken}` });
            expect(res.status).to.equal(201);
        }));
    }));
    describe("View fixture", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return one single fixture resource", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/admin/fixture/view/60dfd72094516f4ca4f59fa5")
                .set({ "Authorization": `Bearer ${admintoken}` });
            expect(res.status).to.equal(200);
        }));
    }));
    describe("View fixtures", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return all fixtures", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/admin/fixture/view")
                .set({ "Authorization": `Bearer ${admintoken}` });
            expect(res.status).to.equal(200);
        }));
    }));
    //Team
    describe("View team", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return a team", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/admin/team/view/60df4bc42cf37a561c60dbca")
                .set({ "Authorization": `Bearer ${admintoken}` });
            expect(res.status).to.equal(200);
        }));
    }));
    describe("View teams", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return all teams", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/admin/fixture/view")
                .set({ "Authorization": `Bearer ${admintoken}` });
            expect(res.status).to.equal(200);
        }));
    }));
}));
