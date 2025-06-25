/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var bytes_1 = require("./bytes");
///////////////////////////////
/*
declare class Buffer implements ArrayLike<number> {
    constructor(data: any, encoding?: string);
    toString(encoding?: string): any;
    [key: number]: number;
    length: number;
}
*/
function decode(textData) {
    return bytes_1.arrayify(new Uint8Array(Buffer.from(textData, 'base64')));
}
exports.decode = decode;
;
function encode(data) {
    return Buffer.from(bytes_1.arrayify(data)).toString('base64');
}
exports.encode = encode;
