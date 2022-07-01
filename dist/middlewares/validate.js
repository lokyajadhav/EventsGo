"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(schema) {
    return function (request, response, next) {
        schema.validateAsync(request.body).then((val) => {
            request.body = val;
            next();
        }).catch((err) => {
            console.log(err);
            response.status(202).send(err.message);
        });
    };
}
exports.default = validate;
