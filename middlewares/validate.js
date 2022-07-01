"use strict";
exports.__esModule = true;
function validate(schema) {
    return function (request, response, next) {
        schema.validateAsync(request.body).then(function (val) {
            request.body = val;
            next();
        })["catch"](function (err) {
            console.log(err);
            response.status(202).send(err.message);
        });
    };
}
exports["default"] = validate;
