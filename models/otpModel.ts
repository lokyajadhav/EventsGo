import {Schema , model} from 'mongoose'
import IOtp from '../interfaces/IOtp'

const otp = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expire: { type: Number, required: true },
    status: { type: String, required: true }
}, {
    timestamps: true
});

export default model<IOtp>('otp',otp);