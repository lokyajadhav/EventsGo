"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var adminSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
exports["default"] = (0, mongoose_1.model)("admin", adminSchema);
