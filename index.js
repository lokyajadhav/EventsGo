"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var http = require("http");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var port = process.env.PORT || 5000;
var server = http.createServer(app_1["default"]);
server.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
