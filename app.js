"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var routes_1 = require("./routes");
var mongoose_1 = require("mongoose");
var app = (0, express_1["default"])();
var url = "mongodb+srv://Lokya_Jadhav:Lokyanaik9985@cluster0.cz6ew.mongodb.net/?retryWrites=true&w=majority";
mongoose_1["default"].connect(url)
    .then(function (res) { return console.log("successfully connected"); })["catch"](function (err) {
    console.log(err.message);
});
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])(({ origin: ['http://192.168.85.143:3000','http://localhost:3000', 'https://realshiva.rocks', 'https://sgc-events.turntbloke.tech/'], credentials: true })));
app.use((0, cookie_parser_1["default"])());
app.use('/', routes_1["default"]);
exports["default"] = app;
