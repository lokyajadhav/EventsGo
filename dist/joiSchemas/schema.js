"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class schema {
    constructor() {
        this.event = joi_1.default.object().keys({
            eventId: joi_1.default.string().trim(),
            title: joi_1.default.string().trim().required(),
            description: joi_1.default.string().required(),
            contactDetails: joi_1.default.string().required(),
            gallery: joi_1.default.array(),
            poster: joi_1.default.any().required(),
            organizedBy: joi_1.default.string().required(),
            date: joi_1.default.date().required(),
            seatCount: joi_1.default.number()
        });
        this.login = joi_1.default.object().keys({
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().min(5).max(20).required()
        });
        this.signup = joi_1.default.object().keys({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().min(8).max(20).required()
        });
        this.changeEvent = joi_1.default.object().keys({
            eventId: joi_1.default.string().required(),
            isRegistered: joi_1.default.boolean().required(),
            isCancelled: joi_1.default.boolean().required(),
            isAttended: joi_1.default.boolean().required()
        });
    }
}
exports.default = schema;
