import eventModel from "../../models/eventModel";
import dat from 'date-and-time'
import userModel from "../../models/userModel";
import jwt from 'jsonwebtoken';
import mailer from "../../mailer";
import otpModel from "../../models/otpModel";
import adminModel from "../../models/adminModel";
import qrCode from "qrcode";
import dotenv from 'dotenv';
import IOtp from '../../interfaces/IOtp'
import {Request,Response} from 'express'
import getIndianTime from "../../miscellaneous/indianDate";

dotenv.config();
let secret = process.env.secret || "ssankdlkdkajllshlahfdfhu";


export default class User{
    static async sendMail(request:Request,response:Response){

        let otp = Math.floor(Math.random()*10000);
        if(otp<1000)
        otp = otp*10

        let date = new Date;

        let expire = date.getTime() + (600*1000);

        let temp:IOtp = {
            email:request.body.email,
            otp:`${otp}`,
            expire:expire,
            status:'not verified'
        }

        try{
            if(request.body.email === undefined)
            throw new Error('email is required');


                let result:any = await userModel.exists({'email':request.body.email});
                 if(result){
                    
                    if(!request.body.shouldExist)
                     throw new Error('User already exists');
                 }
                 else{
                     if(request.body.shouldExist)
                     throw new Error('User does not exists');
                 }


            let res:any  = await mailer.mailer1(`${otp}`,request.body.email);
            
            let otpDoc = new otpModel(temp);

            console.log(res)
            if(res.accepted != undefined)
            if(res.accepted.length != 0)
            {
                await otpModel.deleteMany({email:request.body.email})
                await otpDoc.save();
                response.status(res.statusCode).send('success');
            }
            else
            response.status(202).send('something went wrong');
            else
            throw new Error("something went wrong, Please try after sometime");
        }
        catch(err:any){
            response.status(202).send(err.message);

        }
    }
    static async verifyotp(request:Request,response:Response){

        try{
            if(request.body.email === undefined || request.body.otp === undefined)
            throw new Error('email or otp is missing');

             let res:any = await otpModel.findOne({email:request.body.email,otp:request.body.otp});
             
             let currentTime = (new Date).getTime();
             
             if(res)
             if(res.expire > currentTime){
                
                     await otpModel.deleteMany({email:request.body.email})
                    response.send('Success');
            }
             else{
                 response.status(202).send('Expired')
             }
             else
             throw new Error('Invalid');

        }
        catch(err:any){
            response.status(202).send(err.message);
        }
    }
    static async changepassword(request:Request,response:Response){

        let secret = 'asdasdknafnalkdfsdnfusdkljsfs';

        try{
            if(request.body.email === undefined || request.body.email === '')
            throw new Error('Email cannot be empty');

            if(request.body.password === undefined || request.body.password === '')
            throw new Error('password cannot be empty');

            if(request.body.password.length < 8)
            throw new Error('password length must be atleast 8 characters')
            if(request.body.secret != secret){
                
                throw new Error('Unauthorized request');
                
            }

            let res = await userModel.updateOne({'email':request.body.email},{$set:{'password':request.body.password}});

            if(!res.modifiedCount)
            throw Error('New password Cannot be same as OLD password');

            response.send('Success');
        }
        catch(err:any){
            response.status(202).send(err.message);
        }
    }
    static async getUserDetails(request:Request,response:Response){
        try {
            let res1 = await userModel.exists({
                "events.eventId": request.body.eventId, "email": request.body.email
            });
            console.log(res1);
            if (res1)
                response.send("true");
            else
                throw new Error("false");
        }
        catch (err:any) {
            response.status(202).send("false");
        }
    }
    static async getUserProfileDetails(request:Request,response:Response){
        try {
            
                
                let data=await userModel.findOne({email:request.body.email});
                
                if(data)
                {
                    response.send(data);
                }
            
                else
                    throw new Error("false");
        }
        catch (err:any) {
            response.status(202).send("false");
        }
    }

    static async signUp(request:Request,response:Response){
        try {
            let res = await userModel.exists({ email: request.body.email });
            if (res)
                throw new Error("User already exists");
            let data = new userModel(request.body);
            await data.save();
            let token = jwt.sign({ email: request.body.email }, secret);
            response.json({ token: token });
        }
        catch (err:any) {
            response.send(err.message);
        }
    }

    static async login(request:Request,response:Response){
        
        try {
            if (request.body.email === "admin@events.com") {
                let secret = process.env.secret1 || "ssankdlkdkajllshlahfdfhu";
                let res = await adminModel.exists({
                    email: request.body.email,
                    password: request.body.password,
                });
                let token = jwt.sign({ email: request.body.email }, secret);
                if (res)
                    response.json({ token: token });
                else
                    response.status(202).send("Please check Your username or password! ");
                return;
            }
            let res = await userModel.exists({
                email: request.body.email,
                password: request.body.password,
            });
            let token = jwt.sign({ email: request.body.email }, secret);
            if (res)
                response.json({ token: token });
            else
                response.status(202).send("Please check Your username or password! ");
        }
        catch (err:any) {
            response.status(202).send(err.message);
        }
    }
    static async changeIsAttended(request:Request,response:Response){
        try {
            let res1 = await userModel.exists({
                "events.eventId": request.body.eventId,
                "events.isAttended": true,
            });
            if (res1)
                throw new Error("Already attended");
            console.log(request.body);
            let res = await userModel.updateOne({ email: request.body.email }, { $set: { "events.$[e].isAttended": true } }, { arrayFilters: [{ "e.eventId": request.body.eventId }] });
            console.log(res);
            if (res.modifiedCount != 0)
                response.send("success");
            else
                throw new Error("failure");
        }
        catch (error:any) {
            console.log(error);
            response.status(202).send(error.message);
        }
    }
    static async changeIsCancelled(request:Request,response:Response){
        try {
            let res = await userModel.updateOne({ email: request.body.email }, { $set: { "events.$[e].isCancelled": true } }, { arrayFilters: [{ "e.eventId": request.body.eventId }] });
            if (res.modifiedCount != 0)
                response.send("success");
            else
                throw new Error("failure");
        }
        catch (error:any) {
            response.status(202).send("failure");
        }
    }
    static async addEvent(request:Request,response:Response){
        try {
            console.log(request.body);
            let res1 = await userModel.exists({
                "events.eventId": request.body.eventId, "email": request.body.email
            });
            let eventInfo:any = await eventModel.findOne({
                eventId: request.body.eventId,
            });
            if (eventInfo.seatsFilled == eventInfo.seatCount)
                throw new Error("Registrations full");
            if (res1)
                throw new Error("Already registered");
            let dt = (eventInfo.date + "").split(" ");
            let res = await qrCode.toDataURL("asdhhakdoisauoaidgfiudgfiiau-" +
                request.body.email +
                "-" +
                request.body.eventId);
            let payload = {
                eventId: request.body.eventId,
                title: eventInfo.title,
                date: dt[0] + " " + dt[1] + " " + dt[2] + " " + dt[3],
            };
            let res2 = await mailer.mailer(payload, request.body.email, res);
            console.log(res2);
            if (res2.accepted == undefined)
                throw new Error("something went wrong, Please try after sometime");
            let res3 = await userModel.updateOne({ email: request.body.email }, { $push: { events: request.body } });
            await eventModel.updateOne({ eventId: request.body.eventId }, { $inc: { seatsFilled: 1 } });
            if (res3.modifiedCount != 0)
                response.send("success");
            else
                throw new Error("failure");
        }
        catch (error:any) {
            response.status(202).send(error.message);
        }
    }

    static async getOnGoingEvents(request:Request,response:Response){
        try {

            let pipeline = [{ $match: { date: new Date(getIndianTime()) } }];
            let res = await eventModel.aggregate(pipeline);
            response.send(res);
            // response.send("shiv")
        }
        catch (error:any) {
            response.status(202).send(error.message);
        }
    }
    static async getPastEvents(request:Request,response:Response){
        try {
            let pipeline = [{ $match: { date: { $lt: new Date(getIndianTime()) } } }];
            let res = await eventModel.aggregate(pipeline);
            response.send(res);
        }
        catch (error:any) {
            response.status(202).send(error.message);
        }
    }
    
    static async getUpcomingEvents(request:Request,response:Response){
        try {
            let pipeline = [{ $match: { date: { $gt: new Date(getIndianTime()) } } }];
            let res = await eventModel.aggregate(pipeline);
            response.send(res);
        }
        catch (error:any) {
            response.status(202).send(error.message);
        }
    }

    static async getEventDetails(request:Request,response:Response){
        try {
            let res = await eventModel.find({ eventId: request.body.eventId });
            response.send(res);
        }
        catch (error:any) {
            response.status(202).send(error.message);
        }   
    }

}