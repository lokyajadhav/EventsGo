import Joi from 'joi';
import { Response,Request,NextFunction } from 'express';

export default function validate(schema:any){

    return function(request:Request,response :Response,next:NextFunction){

        schema.validateAsync(request.body).then((val:any)=>{

            request.body = val;
            next();
        }).catch((err:any)=>{
    
            console.log(err)
            response.status(202).send(err.message)
        })
    }
}