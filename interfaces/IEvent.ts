export default interface IEvent{

    eventId:string;
    title:string;
    description:string;
    contactDetails:string;
    gallery?:Array<any>;
    organizedBy:string;
    date:Date;
    seatsFilled:number;
    seatCount:number;
}