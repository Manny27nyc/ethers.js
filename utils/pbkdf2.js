/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var bytes_1 = require("./bytes");
function bufferify(value) {
    return Buffer.from(bytes_1.arrayify(value));
}
function pbkdf2(password, salt, iterations, keylen, hashAlgorithm) {
    return bytes_1.arrayify(crypto_1.pbkdf2Sync(bufferify(password), bufferify(salt), iterations, keylen, hashAlgorithm));
}
exports.pbkdf2 = pbkdf2;
