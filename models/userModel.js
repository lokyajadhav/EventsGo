"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var registeredEventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, index: true },
    isRegistered: { type: Boolean, required: true },
    isAttended: { type: Boolean, required: true },
    isCancelled: { type: Boolean, required: true }
});
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: { type: [registeredEventSchema], required: true }
});
exports["default"] = (0, mongoose_1.model)('user', userSchema);
