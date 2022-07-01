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
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
class mailer {
    static mailer1(otp, recepient) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = recepient;
            let parts = email.split("@");
            if (parts[parts.length - 1] !== "rgukt.ac.in")
                throw new Error("Please use rgukt domain mail");
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                port: 587,
                secure: false,
                pool: true,
                maxConnections: 3000,
                maxMessages: 5,
                auth: {
                    user: 'events.go.rgukt@gmail.com',
                    pass: 'btntiuwoweaexczz'
                }
            });
            let mailOptions = {
                from: 'events.go.rgukt@gmail.com',
                to: recepient,
                subject: 'OTP for verification',
                text: `${otp} is your otp for verification \n\n Thank you.\n\n Regards,\n EventsGo.`
            };
            try {
                let info = yield transporter.sendMail(mailOptions);
                transporter.close();
                info.statusCode = 200;
                return info;
            }
            catch (err) {
                err.statusCode = 202;
                return err;
            }
        });
    }
}
exports.default = mailer;
_a = mailer;
mailer.mailer = (payload, recepient, url) => __awaiter(void 0, void 0, void 0, function* () {
    let content = fs_1.default.readFileSync(path_1.default.join(__dirname, '/html/index.html'), 'utf-8');
    const template = handlebars_1.default.compile(content);
    const replacements = {
        eventId: payload.eventId,
        title: payload.title,
        date: payload.date
    };
    const htmlToSend = template(replacements);
    let transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        pool: true,
        port: 587,
        secure: false,
        maxConnections: 3000,
        maxMessages: 5,
        auth: {
            user: 'events.go.rgukt@gmail.com',
            pass: 'btntiuwoweaexczz'
        }
    });
    let mailOptions = {
        from: 'events.go.rgukt@gmail.com',
        to: recepient,
        subject: 'Event Registration',
        html: htmlToSend,
        attachments: [
            {
                filename: "qrcode",
                path: url,
                cid: "img123"
            },
            {
                filename: "banner",
                path: path_1.default.join(__dirname, 'img.jpg'),
                cid: "img123"
            }
        ]
    };
    try {
        let info = yield transporter.sendMail(mailOptions);
        transporter.close();
        info.statusCode = 200;
        return info;
    }
    catch (err) {
        err.statusCode = 202;
        return err;
    }
});
