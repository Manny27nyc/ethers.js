/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var bytes_1 = require("./bytes");
var crypto_1 = require("crypto");
function randomBytes(length) {
    return bytes_1.arrayify(crypto_1.randomBytes(length));
}
exports.randomBytes = randomBytes;
