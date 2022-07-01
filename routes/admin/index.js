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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var eventModel_1 = require("../../models/eventModel");
var adminModel_1 = require("../../models/adminModel");
var jsonwebtoken_1 = require("jsonwebtoken");
var upload_1 = require("../../middlewares/upload");
var panels_1 = require("../../miscellaneous/panels");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var secret = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
var date = new Date();
var Admin = /** @class */ (function () {
    function Admin() {
    }
    var _a;
    _a = Admin;
    Admin.addevent = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var count, data, err_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, eventModel_1["default"].count({})];
                case 1:
                    count = _b.sent();
                    request.body.eventId = (0, panels_1["default"])(request.body.organizedBy) + "" + (count + 1);
                    request.body.seatsFilled = 0;
                    if (request.body.seatCount === undefined)
                        request.body.seatCount = 99999;
                    data = new eventModel_1["default"](request.body);
                    return [4 /*yield*/, data.save()];
                case 2:
                    _b.sent();
                    response.send("success");
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    response.status(202).send(err_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Admin.createAdmin = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var data, err_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    data = new eventModel_1["default"](request.body);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, data.save()];
                case 2:
                    _b.sent();
                    response.send("success");
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    response.status(202).send(err_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Admin.login = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var res, token, err_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, adminModel_1["default"].exists({ email: request.body.email, password: request.body.password })];
                case 1:
                    res = _b.sent();
                    token = jsonwebtoken_1["default"].sign({ email: request.body.email }, secret);
                    if (res)
                        response.json({ token: token });
                    else
                        response.status(202).send("failure");
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _b.sent();
                    response.status(202).send(err_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    Admin.temp = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            console.log(date);
            console.log(new Date());
            response.send("HIT");
            return [2 /*return*/];
        });
    }); };
    Admin.getImg = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var err_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, upload_1.bucket.find({ $or: [{ filename: "".concat(request.params.id, "-poster.jpeg") }, { filename: "".concat(request.params.id, "-poster.png") }] }).toArray(function (err, files) {
                            if (((files === null || files === undefined) ? 0 : files.length) !== 0 && files != undefined) {
                                upload_1.bucket.openDownloadStreamByName(files[0].filename).pipe(response);
                            }
                            else
                                response.send("nothing");
                        })];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _b.sent();
                    response.status(202).send(err_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    Admin.verifyAdmin = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            response.send("success");
            return [2 /*return*/];
        });
    }); };
    Admin.deleteEvent = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (request.body.eventId == undefined)
                        throw new Error("eventId required");
                    return [4 /*yield*/, eventModel_1["default"].deleteOne({ eventId: request.body.eventId })];
                case 1:
                    res = _b.sent();
                    if (res)
                        response.send("successfully deleted");
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _b.sent();
                    response.status(202).send(err_5.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return Admin;
}());
exports["default"] = Admin;
