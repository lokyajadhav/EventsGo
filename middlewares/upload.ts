import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import panels from "../miscellaneous/panels";
import eventModel from "../models/eventModel";

const url = "mongodb+srv://Lokya_Jadhav:Lokyanaik9985@cluster0.cz6ew.mongodb.net/?retryWrites=true&w=majority";


export let bucket:GridFSBucket;
mongoose.connection.on("connected",()=>{
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "newBucket"
      });
    
     console.log("bucket connected")
})

function extension(file:any) {
    if (file.mimetype == 'image/jpeg')
        return 'jpeg';
    else
        return 'png';
}

const storage = new GridFsStorage({
    url: url,
    file: async(req, file) => {
        let count = await eventModel.count({});
        let a = "EventsGo-Event" + "" + (count+1);
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
    }
  });

export const upload = multer({
    storage
  });



