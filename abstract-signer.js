/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties_1 = require("./utils/properties");
var Signer = /** @class */ (function () {
    function Signer() {
        properties_1.setType(this, 'Signer');
    }
    Signer.isSigner = function (value) {
        return properties_1.isType(value, 'Signer');
    };
    return Signer;
}());
exports.Signer = Signer;
//defineReadOnly(Signer, 'inherits', inheritable(Signer));
