/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties_1 = require("../utils/properties");
;
;
///////////////////////////////
// Exported Abstracts
var Provider = /** @class */ (function () {
    function Provider() {
        properties_1.setType(this, 'Provider');
    }
    Provider.isProvider = function (value) {
        return properties_1.isType(value, 'Provider');
    };
    return Provider;
}());
exports.Provider = Provider;
//defineReadOnly(Signer, 'inherits', inheritable(Abstract));
