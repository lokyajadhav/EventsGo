import joi from 'joi';

export default class schema{

    event = joi.object().keys({
        eventId: joi.string().trim(),
        title: joi.string().trim().required(),
        description: joi.string().required(),
        contactDetails: joi.string().required(),
        gallery: joi.array(),
        poster: joi.any().required(),
        organizedBy: joi.string().required(),
        date: joi.date().required(),
        seatCount: joi.number()
    });

    login = joi.object().keys({
        email: joi.string().trim().email().required(),
        password: joi.string().min(5).max(20).required()
    });

    signup = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().trim().email().required(),
        password: joi.string().min(8).max(20).required()
    });

    changeEvent = joi.object().keys({
        eventId: joi.string().required(),
        isRegistered: joi.boolean().required(),
        isCancelled: joi.boolean().required(),
        isAttended: joi.boolean().required()
    });

}