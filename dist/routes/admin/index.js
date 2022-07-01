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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const eventModel_1 = __importDefault(require("../../models/eventModel"));
const adminModel_1 = __importDefault(require("../../models/adminModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const upload_1 = require("../../middlewares/upload");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let secret = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
let date = new Date();
class Admin {
}
exports.default = Admin;
_a = Admin;
Admin.addevent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = yield eventModel_1.default.count({});
        request.body.eventId = "EventsGo-Event" + "" + (count + 1);
        request.body.seatsFilled = 0;
        if (request.body.seatCount === undefined)
            request.body.seatCount = 99999;
        let data = new eventModel_1.default(request.body);
        yield data.save();
        response.send("success");
    }
    catch (err) {
        response.status(202).send(err.message);
    }
});
Admin.createAdmin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let data = new eventModel_1.default(request.body);
    try {
        yield data.save();
        response.send("success");
    }
    catch (err) {
        response.status(202).send(err.message);
    }
});
Admin.login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield adminModel_1.default.exists({ email: request.body.email, password: request.body.password });
        let token = jsonwebtoken_1.default.sign({ email: request.body.email }, secret);
        if (res)
            response.json({ token: token });
        else
            response.status(202).send("failure");
    }
    catch (err) {
        response.status(202).send(err.message);
    }
});
Admin.temp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(date);
    console.log(new Date());
    response.send("HIT");
});
Admin.getImg = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield upload_1.bucket.find({ $or: [{ filename: `${request.params.id}.jpeg` }, { filename: `${request.params.id}.png` }] }).toArray((err, files) => {
            if (((files === null || files === undefined) ? 0 : files.length) !== 0 && files != undefined) {
                upload_1.bucket.openDownloadStreamByName(files[0].filename).pipe(response);
            }
            else
                response.send("nothing");
        });
    }
    catch (err) {
        response.status(202).send(err.message);
    }
});
Admin.verifyAdmin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("success");
});
Admin.deleteEvent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.body.eventId == undefined)
            throw new Error("eventId required");
        let res = yield eventModel_1.default.deleteOne({ eventId: request.body.eventId });
        if (res)
            response.send("successfully deleted");
    }
    catch (err) {
        response.status(202).send(err.message);
    }
});
