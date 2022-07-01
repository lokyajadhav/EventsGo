"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const registeredEventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, index: true },
    isRegistered: { type: Boolean, required: true },
    isAttended: { type: Boolean, required: true },
    isCancelled: { type: Boolean, required: true }
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: { type: [registeredEventSchema], required: true }
});
exports.default = (0, mongoose_1.model)('user', userSchema);
