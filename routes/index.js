"use strict";
exports.__esModule = true;
var express_1 = require("express");
var adminRoutes_1 = require("./admin/adminRoutes");
var userRoutes_1 = require("./user/userRoutes");
var router = (0, express_1.Router)();
router.use('/', userRoutes_1["default"]);
router.use('/admin', adminRoutes_1["default"]);
exports["default"] = router;
