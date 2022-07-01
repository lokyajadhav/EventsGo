"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var eventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    contactDetails: { type: String, required: true },
    gallery: { type: Array() },
    organizedBy:{type: String},
    date: { type: Date, required: true },
    seatsFilled: { type: Number, required: true },
    seatCount: { type: Number, required: false }
}, {
    timestamps: true
});
exports["default"] = (0, mongoose_1.model)('event', eventSchema);
