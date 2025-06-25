/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var sha3 = require("js-sha3");
var bytes_1 = require("./bytes");
function keccak256(data) {
    return '0x' + sha3.keccak_256(bytes_1.arrayify(data));
}
exports.keccak256 = keccak256;
