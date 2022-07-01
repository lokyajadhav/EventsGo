"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const url = "mongodb+srv://Lokya_Jadhav:Lokyanaik9985@cluster0.cz6ew.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(url)
    .then((res) => console.log("successfully connected"))
    .catch((err) => {
    console.log(err.message);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(({ origin: ['http://192.168.103.143:3000', 'http://localhost:3000', 'https://realshiva.rocks', 'https://sgc-events.turntbloke.tech/'], credentials: true })));
app.use((0, cookie_parser_1.default)());
app.use('/', routes_1.default);
exports.default = app;
