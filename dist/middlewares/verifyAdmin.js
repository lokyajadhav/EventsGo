"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyAdmin(request, responsoe, next) {
    let secret = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
    try {
        let payload = request.headers.authorization || "ss";
        let decodedToken = jsonwebtoken_1.default.verify(payload, secret);
        request.body.email = decodedToken.email;
        console.log(decodedToken);
        next();
    }
    catch (error) {
        responsoe.status(202).send("You are not authenticated please login/signup");
    }
}
exports.default = verifyAdmin;
