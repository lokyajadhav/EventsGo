import { Schema,model } from "mongoose";
import IEvent from '../interfaces/IAdmin'

const eventSchema = new Schema({
    eventId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    contactDetails: { type: String, required: true },
    gallery: { type: Array() },
    organizedBy:{type: String},
    date: { type: Date, required: true },
    seatsFilled: { type: Number, required: true },
    seatCount: { type: Number, required: false }
}, {
    timestamps: true
});

export default model<IEvent>('event',eventSchema);