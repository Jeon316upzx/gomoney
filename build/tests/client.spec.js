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
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe("Gomoney project Client testCase", () => __awaiter(void 0, void 0, void 0, function* () {
    let token = null;
    before("Authenticate client before runnng test", () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield chai_1.default
            .request(app_1.default)
            .post("/gomoney/api/v1/auth/login")
            .send({ email: "jeon316@gmail.com", password: "dada12345" });
        token = res.body.data.token;
    }));
    //Client authentication
    describe("Register", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return an account already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .post("/gomoney/api/v1/auth/register")
                .send({ firstname: "Mazi", lastname: "Uwa", email: "jeon316@gmail.com", password: "dada12345" });
            expect(res.status).to.equal(409);
        }));
    }));
    //Fixture    
    describe("GET pending fixtures", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return all pending fixtures", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/fixtures/pending")
                .set({ "Authorization": `Bearer ${token}` });
            expect(res.status).to.equal(200);
        }));
    }));
    describe("GET completed fixtures", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return all completed fixtures", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/fixtures/completed")
                .set({ "Authorization": `Bearer ${token}` });
            expect(res.status).to.equal(200);
        }));
    }));
    //Team
    describe("GET team", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return a team", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/teams/view/60df4bc42cf37a561c60dbca")
                .set({ "Authorization": `Bearer ${token}` });
            expect(res.status).to.equal(200);
        }));
    }));
    describe("GET teams", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should return all teams", () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield chai_1.default
                .request(app_1.default)
                .get("/gomoney/api/v1/teams/view")
                .set({ "Authorization": `Bearer ${token}` });
            expect(res.status).to.equal(200);
        }));
    }));
}));
