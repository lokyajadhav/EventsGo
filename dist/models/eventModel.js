"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    contactDetails: { type: String, required: true },
    gallery: { type: Array() },
    organizedBy: { type: String },
    date: { type: Date, required: true },
    seatsFilled: { type: Number, required: true },
    seatCount: { type: Number, required: false }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('event', eventSchema);
