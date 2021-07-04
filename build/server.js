"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = __importDefault(require("./config/options"));
const logger_1 = __importDefault(require("./logger"));
const app_1 = __importDefault(require("./app"));
const PORT = options_1.default.PORT || 3000;
app_1.default.listen(PORT, () => {
    logger_1.default.info(`server is running on PORT ${PORT}`);
});
