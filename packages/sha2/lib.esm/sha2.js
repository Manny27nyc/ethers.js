// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";
import hash from "hash.js";
//const _ripemd160 = _hash.ripemd160;
import { arrayify } from "@ethersproject/bytes";
import { SupportedAlgorithm } from "./types";
import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);
export function ripemd160(data) {
    return "0x" + (hash.ripemd160().update(arrayify(data)).digest("hex"));
}
export function sha256(data) {
    return "0x" + (hash.sha256().update(arrayify(data)).digest("hex"));
}
export function sha512(data) {
    return "0x" + (hash.sha512().update(arrayify(data)).digest("hex"));
}
export function computeHmac(algorithm, key, data) {
    if (!SupportedAlgorithm[algorithm]) {
        logger.throwError("unsupported algorithm " + algorithm, Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "hmac",
            algorithm: algorithm
        });
    }
    return "0x" + hash.hmac(hash[algorithm], arrayify(key)).update(arrayify(data)).digest("hex");
}
//# sourceMappingURL=sha2.js.map