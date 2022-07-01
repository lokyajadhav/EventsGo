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
const eventModel_1 = __importDefault(require("../../models/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = __importDefault(require("../../mailer"));
const otpModel_1 = __importDefault(require("../../models/otpModel"));
const adminModel_1 = __importDefault(require("../../models/adminModel"));
const qrcode_1 = __importDefault(require("qrcode"));
const dotenv_1 = __importDefault(require("dotenv"));
const indianDate_1 = __importDefault(require("../../miscellaneous/indianDate"));
dotenv_1.default.config();
let secret = process.env.secret || "ssankdlkdkajllshlahfdfhu";
class User {
    static sendMail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let otp = Math.floor(Math.random() * 10000);
            if (otp < 1000)
                otp = otp * 10;
            let date = new Date;
            let expire = date.getTime() + (600 * 1000);
            let temp = {
                email: request.body.email,
                otp: `${otp}`,
                expire: expire,
                status: 'not verified'
            };
            try {
                if (request.body.email === undefined)
                    throw new Error('email is required');
                let result = yield userModel_1.default.exists({ 'email': request.body.email });
                if (result) {
                    if (!request.body.shouldExist)
                        throw new Error('User already exists');
                }
                else {
                    if (request.body.shouldExist)
                        throw new Error('User does not exists');
                }
                let res = yield mailer_1.default.mailer1(`${otp}`, request.body.email);
                let otpDoc = new otpModel_1.default(temp);
                console.log(res);
                if (res.accepted != undefined)
                    if (res.accepted.length != 0) {
                        yield otpModel_1.default.deleteMany({ email: request.body.email });
                        yield otpDoc.save();
                        response.status(res.statusCode).send('success');
                    }
                    else
                        response.status(202).send('something went wrong');
                else
                    throw new Error("something went wrong, Please try after sometime");
            }
            catch (err) {
                response.status(202).send(err.message);
            }
        });
    }
    static verifyotp(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.body.email === undefined || request.body.otp === undefined)
                    throw new Error('email or otp is missing');
                let res = yield otpModel_1.default.findOne({ email: request.body.email, otp: request.body.otp });
                let currentTime = (new Date).getTime();
                if (res)
                    if (res.expire > currentTime) {
                        yield otpModel_1.default.deleteMany({ email: request.body.email });
                        response.send('Success');
                    }
                    else {
                        response.status(202).send('Expired');
                    }
                else
                    throw new Error('Invalid');
            }
            catch (err) {
                response.status(202).send(err.message);
            }
        });
    }
    static changepassword(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let secret = 'asdasdknafnalkdfsdnfusdkljsfs';
            try {
                if (request.body.email === undefined || request.body.email === '')
                    throw new Error('Email cannot be empty');
                if (request.body.password === undefined || request.body.password === '')
                    throw new Error('password cannot be empty');
                if (request.body.password.length < 8)
                    throw new Error('password length must be atleast 8 characters');
                if (request.body.secret != secret) {
                    throw new Error('Unauthorized request');
                }
                let res = yield userModel_1.default.updateOne({ 'email': request.body.email }, { $set: { 'password': request.body.password } });
                if (!res.modifiedCount)
                    throw Error('New password Cannot be same as OLD password');
                response.send('Success');
            }
            catch (err) {
                response.status(202).send(err.message);
            }
        });
    }
    static getUserDetails(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res1 = yield userModel_1.default.exists({
                    "events.eventId": request.body.eventId, "email": request.body.email
                });
                console.log(res1);
                if (res1)
                    response.send("true");
                else
                    throw new Error("false");
            }
            catch (err) {
                response.status(202).send("false");
            }
        });
    }
    static getUserProfileDetails(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield userModel_1.default.findOne({ email: request.body.email });
                if (data) {
                    response.send(data);
                }
                else
                    throw new Error("false");
            }
            catch (err) {
                response.status(202).send("false");
            }
        });
    }
    static signUp(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield userModel_1.default.exists({ email: request.body.email });
                if (res)
                    throw new Error("User already exists");
                let data = new userModel_1.default(request.body);
                yield data.save();
                let token = jsonwebtoken_1.default.sign({ email: request.body.email }, secret);
                response.json({ token: token });
            }
            catch (err) {
                response.send(err.message);
            }
        });
    }
    static login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.body.email === "admin@events.com") {
                    let secret = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
                    let res = yield adminModel_1.default.exists({
                        email: request.body.email,
                        password: request.body.password,
                    });
                    let token = jsonwebtoken_1.default.sign({ email: request.body.email }, secret);
                    if (res)
                        response.json({ token: token });
                    else
                        response.status(202).send("Please check Your username or password! ");
                    return;
                }
                let res = yield userModel_1.default.exists({
                    email: request.body.email,
                    password: request.body.password,
                });
                let token = jsonwebtoken_1.default.sign({ email: request.body.email }, secret);
                if (res)
                    response.json({ token: token });
                else
                    response.status(202).send("Please check Your username or password! ");
            }
            catch (err) {
                response.status(202).send(err.message);
            }
        });
    }
    static changeIsAttended(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res1 = yield userModel_1.default.exists({
                    "events.eventId": request.body.eventId,
                    "events.isAttended": true,
                });
                if (res1)
                    throw new Error("Already attended");
                console.log(request.body);
                let res = yield userModel_1.default.updateOne({ email: request.body.email }, { $set: { "events.$[e].isAttended": true } }, { arrayFilters: [{ "e.eventId": request.body.eventId }] });
                console.log(res);
                if (res.modifiedCount != 0)
                    response.send("success");
                else
                    throw new Error("failure");
            }
            catch (error) {
                console.log(error);
                response.status(202).send(error.message);
            }
        });
    }
    static changeIsCancelled(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield userModel_1.default.updateOne({ email: request.body.email }, { $set: { "events.$[e].isCancelled": true } }, { arrayFilters: [{ "e.eventId": request.body.eventId }] });
                if (res.modifiedCount != 0)
                    response.send("success");
                else
                    throw new Error("failure");
            }
            catch (error) {
                response.status(202).send("failure");
            }
        });
    }
    static addEvent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(request.body);
                let res1 = yield userModel_1.default.exists({
                    "events.eventId": request.body.eventId, "email": request.body.email
                });
                let eventInfo = yield eventModel_1.default.findOne({
                    eventId: request.body.eventId,
                });
                if (eventInfo.seatsFilled == eventInfo.seatCount)
                    throw new Error("Registrations full");
                if (res1)
                    throw new Error("Already registered");
                let dt = (eventInfo.date + "").split(" ");
                let res = yield qrcode_1.default.toDataURL("asdhhakdoisauoaidgfiudgfiiau-" +
                    request.body.email +
                    "-" +
                    request.body.eventId);
                let payload = {
                    eventId: request.body.eventId,
                    title: eventInfo.title,
                    date: dt[0] + " " + dt[1] + " " + dt[2] + " " + dt[3],
                };
                let res2 = yield mailer_1.default.mailer(payload, request.body.email, res);
                console.log(res2);
                if (res2.accepted == undefined)
                    throw new Error("something went wrong, Please try after sometime");
                let res3 = yield userModel_1.default.updateOne({ email: request.body.email }, { $push: { events: request.body } });
                yield eventModel_1.default.updateOne({ eventId: request.body.eventId }, { $inc: { seatsFilled: 1 } });
                if (res3.modifiedCount != 0)
                    response.send("success");
                else
                    throw new Error("failure");
            }
            catch (error) {
                response.status(202).send(error.message);
            }
        });
    }
    static getOnGoingEvents(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pipeline = [{ $match: { date: new Date((0, indianDate_1.default)()) } }];
                let res = yield eventModel_1.default.aggregate(pipeline);
                response.send(res);
                // response.send("shiv")
            }
            catch (error) {
                response.status(202).send(error.message);
            }
        });
    }
    static getPastEvents(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pipeline = [{ $match: { date: { $lt: new Date((0, indianDate_1.default)()) } } }];
                let res = yield eventModel_1.default.aggregate(pipeline);
                response.send(res);
            }
            catch (error) {
                response.status(202).send(error.message);
            }
        });
    }
    static getUpcomingEvents(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pipeline = [{ $match: { date: { $gt: new Date((0, indianDate_1.default)()) } } }];
                let res = yield eventModel_1.default.aggregate(pipeline);
                response.send(res);
            }
            catch (error) {
                response.status(202).send(error.message);
            }
        });
    }
    static getEventDetails(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield eventModel_1.default.find({ eventId: request.body.eventId });
                response.send(res);
            }
            catch (error) {
                response.status(202).send(error.message);
            }
        });
    }
}
exports.default = User;
