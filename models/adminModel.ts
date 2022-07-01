import {Schema,model} from 'mongoose';
import IAdmin from '../interfaces/IAdmin';

const adminSchema = new Schema<IAdmin>({

    name: {type : String ,required:true},
    email:{type:String ,required:true},
    password:{type:String , required:true}
})

export default model<IAdmin>("admin",adminSchema);