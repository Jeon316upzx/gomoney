"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP = void 0;
//HTTP status codes for response
var HTTP;
(function (HTTP) {
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP[HTTP["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    HTTP[HTTP["REDIRECT"] = 301] = "REDIRECT";
    HTTP[HTTP["CREATED"] = 201] = "CREATED";
    HTTP[HTTP["ACCEPTED"] = 202] = "ACCEPTED";
    HTTP[HTTP["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP[HTTP["CONFLICT"] = 409] = "CONFLICT";
    HTTP[HTTP["MISSING_PARAMS"] = 422] = "MISSING_PARAMS";
})(HTTP = exports.HTTP || (exports.HTTP = {}));
