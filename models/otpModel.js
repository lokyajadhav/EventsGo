"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var otp = new mongoose_1.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expire: { type: Number, required: true },
    status: { type: String, required: true }
}, {
    timestamps: true
});
exports["default"] = (0, mongoose_1.model)('otp', otp);
