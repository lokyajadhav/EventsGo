import eventModel from "../../models/eventModel";
import adminModel from "../../models/adminModel";
import jwt from 'jsonwebtoken';
import {bucket} from '../../middlewares/upload'
import panels from '../../miscellaneous/panels'
import dotenv from 'dotenv'
import {Request,Response} from 'express';
dotenv.config()
let secret = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
let date = new Date();
export default class Admin{
    static addevent=async(request:Request,response:Response)=>{
        try {
            let count = await eventModel.count({});
            request.body.eventId = "EventsGo-Event"+ "" + (count + 1);
            request.body.seatsFilled = 0;
            if (request.body.seatCount === undefined)
                request.body.seatCount = 99999;
            let data = new eventModel(request.body);
            await data.save();
            response.send("success");
        } catch (err:any) {
            response.status(202).send(err.message);
        }
    }

    static createAdmin=async(request:Request,response:Response)=>{
    let data = new eventModel(request.body);
    try {
        await data.save();
        response.send("success");
    }
    catch (err:any) {
        response.status(202).send(err.message);
    }
    }

    static login=async(request:Request,response:Response)=>{
        try {
            let res = await adminModel.exists({ email: request.body.email, password: request.body.password });
            let token = jwt.sign({ email: request.body.email }, secret);
            if (res)
                response.json({ token: token });
            else
                response.status(202).send("failure");
        }
        catch (err:any) {
            response.status(202).send(err.message);
        }
    }

    static temp = async(request:Request,response:Response)=>{
        console.log(date)
        console.log(new Date())
        response.send("HIT");
    }

    static getImg = async(request:Request,response:Response)=>{
        try {
            await bucket.find({ $or: [{ filename: `${request.params.id}.jpeg` }, { filename: `${request.params.id}.png` }] }).toArray((err, files) => {
                if (((files === null || files === undefined )? 0 : files.length) !== 0 && files != undefined) {
                    bucket.openDownloadStreamByName(files[0].filename).pipe(response);
                }
                else
                    response.send("nothing");
            });
        }
        catch (err:any) {
            response.status(202).send(err.message);
        }
    }

    static verifyAdmin = async(request:Request,response:Response)=>{
        response.send("success");
    }
    static deleteEvent = async(request:Request,response:Response)=>{
        try {
            if (request.body.eventId == undefined)
            throw new Error("eventId required");
        let res = await eventModel.deleteOne({ eventId: request.body.eventId });
        if (res)
            response.send("successfully deleted");
        } catch (err:any) {
            response.status(202).send(err.message);
        }
    }

    
}