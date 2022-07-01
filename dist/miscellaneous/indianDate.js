"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIndianTime() {
    let a = new Date().toLocaleDateString('en-Us', { timeZone: 'Asia/Kolkata' }).split('/');
    if (a[0].length < 2)
        a[0] = '0' + a[0];
    if (a[1].length < 2)
        a[1] = '0' + a[1];
    return (a[2] + '-' + a[0] + '-' + a[1]);
}
exports.default = getIndianTime;
