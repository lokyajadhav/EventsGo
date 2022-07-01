"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
function verifyAdmin(request, responsoe, next) {
    var secret = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
    try {
        var payload = request.headers.authorization || "ss";
        var decodedToken = jsonwebtoken_1["default"].verify(payload, secret);
        request.body.email = decodedToken.email;
        console.log(decodedToken);
        next();
    }
    catch (error) {
        responsoe.status(202).send("You are not authenticated please login/signup");
    }
}
exports["default"] = verifyAdmin;
