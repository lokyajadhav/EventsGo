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
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.bucket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const eventModel_1 = __importDefault(require("../models/eventModel"));
const url = "mongodb+srv://Lokya_Jadhav:Lokyanaik9985@cluster0.cz6ew.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connection.on("connected", () => {
    var db = mongoose_1.default.connections[0].db;
    exports.bucket = new mongoose_1.default.mongo.GridFSBucket(db, {
        bucketName: "newBucket"
    });
    console.log("bucket connected");
});
function extension(file) {
    if (file.mimetype == 'image/jpeg')
        return 'jpeg';
    else
        return 'png';
}
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: url,
    file: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        let count = yield eventModel_1.default.count({});
        let a = "EventsGo-Event" + "" + (count + 1);
        return new Promise((resolve, reject) => {
            const imgTypes = ['image/jpeg', 'image/png'];
            if (!imgTypes.includes(file.mimetype)) {
                reject("select appropriate type");
            }
            const filename = `${a}.${extension(file)}`;
            const fileInfo = {
                filename: filename,
                bucketName: "newBucket"
            };
            resolve(fileInfo);
        });
    })
});
exports.upload = (0, multer_1.default)({
    storage
});
