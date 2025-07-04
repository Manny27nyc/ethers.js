// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";
import { arrayify } from "@ethersproject/bytes";
import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);
let anyGlobal = null;
try {
    anyGlobal = window;
    if (anyGlobal == null) {
        throw new Error("try next");
    }
}
catch (error) {
    try {
        anyGlobal = global;
        if (anyGlobal == null) {
            throw new Error("try next");
        }
    }
    catch (error) {
        anyGlobal = {};
    }
}
let crypto = anyGlobal.crypto || anyGlobal.msCrypto;
if (!crypto || !crypto.getRandomValues) {
    logger.warn("WARNING: Missing strong random number source");
    crypto = {
        getRandomValues: function (buffer) {
            return logger.throwError("no secure random source avaialble", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "crypto.getRandomValues"
            });
        }
    };
}
export function randomBytes(length) {
    if (length <= 0 || length > 1024 || (length % 1)) {
        logger.throwArgumentError("invalid length", "length", length);
    }
    const result = new Uint8Array(length);
    crypto.getRandomValues(result);
    return arrayify(result);
}
;
//# sourceMappingURL=random.js.map