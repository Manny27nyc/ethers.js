// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
var bytes_1 = require("@ethersproject/bytes");
function decode(textData) {
    return bytes_1.arrayify(new Uint8Array(Buffer.from(textData, "base64")));
}
exports.decode = decode;
;
function encode(data) {
    return Buffer.from(bytes_1.arrayify(data)).toString("base64");
}
exports.encode = encode;
//# sourceMappingURL=base64.js.map