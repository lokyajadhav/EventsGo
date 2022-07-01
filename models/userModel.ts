import { Schema,model } from "mongoose";
import Iuser from '../interfaces/Iuser'

const registeredEventSchema = new Schema({
    eventId: { type: String, required: true, index: true },
    isRegistered: { type: Boolean, required: true },
    isAttended: { type: Boolean, required: true },
    isCancelled: { type: Boolean, required: true }
});
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: { type: [registeredEventSchema], required: true }
});

export default model<Iuser>('user',userSchema);