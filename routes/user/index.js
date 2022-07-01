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
var userModel_1 = require("../../models/userModel");
var jsonwebtoken_1 = require("jsonwebtoken");
var mailer_1 = require("../../mailer");
var otpModel_1 = require("../../models/otpModel");
var adminModel_1 = require("../../models/adminModel");
var qrcode_1 = require("qrcode");
var dotenv_1 = require("dotenv");
var indianDate_1 = require("../../miscellaneous/indianDate");
dotenv_1["default"].config();
var secret = process.env.secret || "ssankdlkdkajllshlahfdfhu";
var User = /** @class */ (function () {
    function User() {
    }
    User.sendMail = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var otp, date, expire, temp, result, res, otpDoc, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        otp = Math.floor(Math.random() * 10000);
                        if (otp < 1000)
                            otp = otp * 10;
                        date = new Date;
                        expire = date.getTime() + (600 * 1000);
                        temp = {
                            email: request.body.email,
                            otp: "".concat(otp),
                            expire: expire,
                            status: 'not verified'
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        if (request.body.email === undefined)
                            throw new Error('email is required');
                        return [4 /*yield*/, userModel_1["default"].exists({ 'email': request.body.email })];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (!request.body.shouldExist)
                                throw new Error('User already exists');
                        }
                        else {
                            if (request.body.shouldExist)
                                throw new Error('User does not exists');
                        }
                        return [4 /*yield*/, mailer_1["default"].mailer1("".concat(otp), request.body.email)];
                    case 3:
                        res = _a.sent();
                        otpDoc = new otpModel_1["default"](temp);
                        console.log(res);
                        if (!(res.accepted != undefined)) return [3 /*break*/, 8];
                        if (!(res.accepted.length != 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, otpModel_1["default"].deleteMany({ email: request.body.email })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, otpDoc.save()];
                    case 5:
                        _a.sent();
                        response.status(res.statusCode).send('success');
                        return [3 /*break*/, 7];
                    case 6:
                        response.status(202).send('something went wrong');
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8: throw new Error("something went wrong, Please try after sometime");
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_1 = _a.sent();
                        response.status(202).send(err_1.message);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    User.verifyotp = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res, currentTime, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (request.body.email === undefined || request.body.otp === undefined)
                            throw new Error('email or otp is missing');
                        return [4 /*yield*/, otpModel_1["default"].findOne({ email: request.body.email, otp: request.body.otp })];
                    case 1:
                        res = _a.sent();
                        currentTime = (new Date).getTime();
                        if (!res) return [3 /*break*/, 5];
                        if (!(res.expire > currentTime)) return [3 /*break*/, 3];
                        return [4 /*yield*/, otpModel_1["default"].deleteMany({ email: request.body.email })];
                    case 2:
                        _a.sent();
                        response.send('Success');
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(202).send('Expired');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5: throw new Error('Invalid');
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        response.status(202).send(err_2.message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    User.changepassword = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var secret, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secret = 'asdasdknafnalkdfsdnfusdkljsfs';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (request.body.email === undefined || request.body.email === '')
                            throw new Error('Email cannot be empty');
                        if (request.body.password === undefined || request.body.password === '')
                            throw new Error('password cannot be empty');
                        if (request.body.password.length < 8)
                            throw new Error('password length must be atleast 8 characters');
                        if (request.body.secret != secret) {
                            throw new Error('Unauthorized request');
                        }
                        return [4 /*yield*/, userModel_1["default"].updateOne({ 'email': request.body.email }, { $set: { 'password': request.body.password } })];
                    case 2:
                        res = _a.sent();
                        if (!res.modifiedCount)
                            throw Error('New password Cannot be same as OLD password');
                        response.send('Success');
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        response.status(202).send(err_3.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.getUserDetails = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res1, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1["default"].exists({
                                "events.eventId": request.body.eventId, "email": request.body.email
                            })];
                    case 1:
                        res1 = _a.sent();
                        if (res1)
                            response.send("true");
                        else
                            throw new Error("false");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        response.status(202).send("false");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.getUserProfileDetails = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res1, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1["default"].exists({
                                "events.eventId": request.body.eventId, "email": request.body.email
                            })];
                    case 1:
                        res1 = _a.sent();
                        if (res1)
                           {
                            let data = userModel_1.findIdBy(request.body.email);
                            response.send(data);
                           }
                        else
                            throw new Error("false");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        response.status(202).send("false");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.signUp = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, token, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1["default"].exists({ email: request.body.email })];
                    case 1:
                        res = _a.sent();
                        if (res)
                            throw new Error("User already exists");
                        data = new userModel_1["default"](request.body);
                        return [4 /*yield*/, data.save()];
                    case 2:
                        _a.sent();
                        token = jsonwebtoken_1["default"].sign({ email: request.body.email }, secret);
                        response.json({ token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        response.send(err_5.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var secret_1, res_1, token_1, res, token, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(request.body.email === "admin@events.com")) return [3 /*break*/, 2];
                        secret_1 = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
                        return [4 /*yield*/, adminModel_1["default"].exists({
                                email: request.body.email,
                                password: request.body.password
                            })];
                    case 1:
                        res_1 = _a.sent();
                        token_1 = jsonwebtoken_1["default"].sign({ email: request.body.email }, secret_1);
                        if (res_1)
                            response.json({ token: token_1 });
                        else
                            response.status(202).send("Please check Your username or password! ");
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, userModel_1["default"].exists({
                            email: request.body.email,
                            password: request.body.password
                        })];
                    case 3:
                        res = _a.sent();
                        token = jsonwebtoken_1["default"].sign({ email: request.body.email }, secret);
                        if (res)
                            response.json({ token: token });
                        else
                            response.status(202).send("Please check Your username or password! ");
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        response.status(202).send(err_6.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.changeIsAttended = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res1, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1["default"].exists({
                                "events.eventId": request.body.eventId,
                                "events.isAttended": true
                            })];
                    case 1:
                        res1 = _a.sent();
                        if (res1)
                            throw new Error("Already attended");
                        console.log(request.body);
                        return [4 /*yield*/, userModel_1["default"].updateOne({ email: request.body.email }, { $set: { "events.$[e].isAttended": true } }, { arrayFilters: [{ "e.eventId": request.body.eventId }] })];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        if (res.modifiedCount != 0)
                            response.send("success");
                        else
                            throw new Error("failure");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        response.status(202).send(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.changeIsCancelled = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1["default"].updateOne({ email: request.body.email }, { $set: { "events.$[e].isCancelled": true } }, { arrayFilters: [{ "e.eventId": request.body.eventId }] })];
                    case 1:
                        res = _a.sent();
                        if (res.modifiedCount != 0)
                            response.send("success");
                        else
                            throw new Error("failure");
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        response.status(202).send("failure");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.addEvent = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res1, eventInfo, dt, res, payload, res2, res3, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        console.log(request.body);
                        return [4 /*yield*/, userModel_1["default"].exists({
                                "events.eventId": request.body.eventId, "email": request.body.email
                            })];
                    case 1:
                        res1 = _a.sent();
                        return [4 /*yield*/, eventModel_1["default"].findOne({
                                eventId: request.body.eventId
                            })];
                    case 2:
                        eventInfo = _a.sent();
                        if (eventInfo.seatsFilled == eventInfo.seatCount)
                            throw new Error("Registrations full");
                        if (res1)
                            throw new Error("Already registered");
                        dt = (eventInfo.date + "").split(" ");
                        return [4 /*yield*/, qrcode_1["default"].toDataURL("asdhhakdoisauoaidgfiudgfiiau-" +
                                request.body.email +
                                "-" +
                                request.body.eventId)];
                    case 3:
                        res = _a.sent();
                        payload = {
                            eventId: request.body.eventId,
                            title: eventInfo.title,
                            date: dt[0] + " " + dt[1] + " " + dt[2] + " " + dt[3]
                        };
                        return [4 /*yield*/, mailer_1["default"].mailer(payload, request.body.email, res)];
                    case 4:
                        res2 = _a.sent();
                        console.log(res2);
                        if (res2.accepted == undefined)
                            throw new Error("something went wrong, Please try after sometime");
                        return [4 /*yield*/, userModel_1["default"].updateOne({ email: request.body.email }, { $push: { events: request.body } })];
                    case 5:
                        res3 = _a.sent();
                        return [4 /*yield*/, eventModel_1["default"].updateOne({ eventId: request.body.eventId }, { $inc: { seatsFilled: 1 } })];
                    case 6:
                        _a.sent();
                        if (res3.modifiedCount != 0)
                            response.send("success");
                        else
                            throw new Error("failure");
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        response.status(202).send(error_3.message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    User.getOnGoingEvents = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pipeline, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        pipeline = [{ $match: { date: new Date((0, indianDate_1["default"])()) } }];
                        return [4 /*yield*/, eventModel_1["default"].aggregate(pipeline)];
                    case 1:
                        res = _a.sent();
                        response.send(res);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        response.status(202).send(error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.getPastEvents = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pipeline, res, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        pipeline = [{ $match: { date: { $lt: new Date((0, indianDate_1["default"])()) } } }];
                        return [4 /*yield*/, eventModel_1["default"].aggregate(pipeline)];
                    case 1:
                        res = _a.sent();
                        response.send(res);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        response.status(202).send(error_5.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.getUpcomingEvents = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pipeline, res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        pipeline = [{ $match: { date: { $gt: new Date((0, indianDate_1["default"])()) } } }];
                        return [4 /*yield*/, eventModel_1["default"].aggregate(pipeline)];
                    case 1:
                        res = _a.sent();
                        response.send(res);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        response.status(202).send(error_6.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.getEventDetails = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, eventModel_1["default"].find({ eventId: request.body.eventId })];
                    case 1:
                        res = _a.sent();
                        response.send(res);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        response.status(202).send(error_7.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports["default"] = User;
