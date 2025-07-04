// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";

import { arrayify, BytesLike } from "@ethersproject/bytes";

import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);

///////////////////////////////

export enum UnicodeNormalizationForm {
    current  = "",
    NFC      = "NFC",
    NFD      = "NFD",
    NFKC     = "NFKC",
    NFKD     = "NFKD"
};

export enum Utf8ErrorReason {
    // A continuation byte was present where there was nothing to continue
    // - offset = the index the codepoint began in
    UNEXPECTED_CONTINUE   = "unexpected continuation byte",

    // An invalid (non-continuation) byte to start a UTF-8 codepoint was found
    // - offset = the index the codepoint began in
    BAD_PREFIX            = "bad codepoint prefix",

    // The string is too short to process the expected codepoint
    // - offset = the index the codepoint began in
    OVERRUN               = "string overrun",

    // A missing continuation byte was expected but not found
    // - offset = the index the continuation byte was expected at
    MISSING_CONTINUE      = "missing continuation byte",

    // The computed code point is outside the range for UTF-8
    // - offset       = start of this codepoint
    // - badCodepoint = the computed codepoint; outside the UTF-8 range
    OUT_OF_RANGE          = "out of UTF-8 range",

    // UTF-8 strings may not contain UTF-16 surrogate pairs
    // - offset       = start of this codepoint
    // - badCodepoint = the computed codepoint; inside the UTF-16 surrogate range
    UTF16_SURROGATE       = "UTF-16 surrogate",

    // The string is an overlong reperesentation
    // - offset       = start of this codepoint
    // - badCodepoint = the computed codepoint; already bounds checked
    OVERLONG              = "overlong representation",
};


export type Utf8ErrorFunc = (reason: Utf8ErrorReason, offset: number, bytes: ArrayLike<number>, output: Array<number>, badCodepoint?: number) => number;

function errorFunc(reason: Utf8ErrorReason, offset: number, bytes: ArrayLike<number>, output: Array<number>, badCodepoint?: number): number {
    return logger.throwArgumentError(`invalid codepoint at offset ${ offset }; ${ reason }`, "bytes", bytes);
}

function ignoreFunc(reason: Utf8ErrorReason, offset: number, bytes: ArrayLike<number>, output: Array<number>, badCodepoint?: number): number {

    // If there is an invalid prefix (including stray continuation), skip any additional continuation bytes
    if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
        let i = 0;
        for (let o = offset + 1; o < bytes.length; o++) {
            if (bytes[o] >> 6 !== 0x02) { break; }
            i++;
        }
        return i;
    }

    // This byte runs us past the end of the string, so just jump to the end
    // (but the first byte was read already read and therefore skipped)
    if (reason === Utf8ErrorReason.OVERRUN) {
        return bytes.length - offset - 1;
    }

    // Nothing to skip
    return 0;
}

function replaceFunc(reason: Utf8ErrorReason, offset: number, bytes: ArrayLike<number>, output: Array<number>, badCodepoint?: number): number {

    // Overlong representations are otherwise "valid" code points; just non-deistingtished
    if (reason === Utf8ErrorReason.OVERLONG) {
        output.push(badCodepoint);
        return 0;
    }

    // Put the replacement character into the output
    output.push(0xfffd);

    // Otherwise, process as if ignoring errors
    return ignoreFunc(reason, offset, bytes, output, badCodepoint);
}

// Common error handing strategies
export const Utf8ErrorFuncs: { [ name: string ]: Utf8ErrorFunc } = Object.freeze({
    error: errorFunc,
    ignore: ignoreFunc,
    replace: replaceFunc
});

// http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499
function getUtf8CodePoints(bytes: BytesLike, onError?: Utf8ErrorFunc): Array<number> {
    if (onError == null) { onError = Utf8ErrorFuncs.error; }

    bytes = arrayify(bytes);

    const result: Array<number> = [];
    let i = 0;

    // Invalid bytes are ignored
    while(i < bytes.length) {

        const c = bytes[i++];

        // 0xxx xxxx
        if (c >> 7 === 0) {
            result.push(c);
            continue;
        }

        // Multibyte; how many bytes left for this character?
        let extraLength = null;
        let overlongMask = null;

        // 110x xxxx 10xx xxxx
        if ((c & 0xe0) === 0xc0) {
            extraLength = 1;
            overlongMask = 0x7f;

        // 1110 xxxx 10xx xxxx 10xx xxxx
        } else if ((c & 0xf0) === 0xe0) {
            extraLength = 2;
            overlongMask = 0x7ff;

        // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
        } else if ((c & 0xf8) === 0xf0) {
            extraLength = 3;
            overlongMask = 0xffff;

        } else {
            if ((c & 0xc0) === 0x80) {
                i += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i - 1, bytes, result);
            } else {
                i += onError(Utf8ErrorReason.BAD_PREFIX, i - 1, bytes, result);
            }
            continue;
        }

        // Do we have enough bytes in our data?
        if (i - 1 + extraLength >= bytes.length) {
            i += onError(Utf8ErrorReason.OVERRUN, i - 1, bytes, result);
            continue;
        }

        // Remove the length prefix from the char
        let res = c & ((1 << (8 - extraLength - 1)) - 1);

        for (let j = 0; j < extraLength; j++) {
            let nextChar = bytes[i];

            // Invalid continuation byte
            if ((nextChar & 0xc0) != 0x80) {
                i += onError(Utf8ErrorReason.MISSING_CONTINUE, i, bytes, result);
                res = null;
                break;
            };

            res = (res << 6) | (nextChar & 0x3f);
            i++;
        }

        // See above loop for invalid contimuation byte
        if (res === null) { continue; }

        // Maximum code point
        if (res > 0x10ffff) {
            i += onError(Utf8ErrorReason.OUT_OF_RANGE, i - 1 - extraLength, bytes, result, res);
            continue;
        }

        // Reserved for UTF-16 surrogate halves
        if (res >= 0xd800 && res <= 0xdfff) {
            i += onError(Utf8ErrorReason.UTF16_SURROGATE, i - 1 - extraLength, bytes, result, res);
            continue;
        }

        // Check for overlong sequences (more bytes than needed)
        if (res <= overlongMask) {
            i += onError(Utf8ErrorReason.OVERLONG, i - 1 - extraLength, bytes, result, res);
            continue;
        }

        result.push(res);
    }

    return result;
}

// http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
export function toUtf8Bytes(str: string, form: UnicodeNormalizationForm = UnicodeNormalizationForm.current): Uint8Array {

    if (form != UnicodeNormalizationForm.current) {
        logger.checkNormalize();
        str = str.normalize(form);
    }

    let result = [];
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);

        if (c < 0x80) {
            result.push(c);

        } else if (c < 0x800) {
            result.push((c >> 6) | 0xc0);
            result.push((c & 0x3f) | 0x80);

        } else if ((c & 0xfc00) == 0xd800) {
            i++;
            const c2 = str.charCodeAt(i);

            if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
                throw new Error("invalid utf-8 string");
            }

            // Surrogate Pair
            const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
            result.push((pair >> 18) | 0xf0);
            result.push(((pair >> 12) & 0x3f) | 0x80);
            result.push(((pair >> 6) & 0x3f) | 0x80);
            result.push((pair & 0x3f) | 0x80);

        } else {
            result.push((c >> 12) | 0xe0);
            result.push(((c >> 6) & 0x3f) | 0x80);
            result.push((c & 0x3f) | 0x80);
        }
    }

    return arrayify(result);
};

function escapeChar(value: number) {
    const hex = ("0000" + value.toString(16));
    return "\\u" + hex.substring(hex.length - 4);
}

export function _toEscapedUtf8String(bytes: BytesLike, onError?: Utf8ErrorFunc): string {
    return '"' + getUtf8CodePoints(bytes, onError).map((codePoint) => {
        if (codePoint < 256) {
            switch (codePoint) {
                case 8:  return "\\b";
                case 9:  return "\\t";
                case 10: return "\\n"
                case 13: return "\\r";
                case 34: return "\\\"";
                case 92: return "\\\\";
            }

            if (codePoint >= 32 && codePoint < 127) {
                return String.fromCharCode(codePoint);
            }
        }

        if (codePoint <= 0xffff) {
            return escapeChar(codePoint);
        }

        codePoint -= 0x10000;
        return escapeChar(((codePoint >> 10) & 0x3ff) + 0xd800) + escapeChar((codePoint & 0x3ff) + 0xdc00);
    }).join("") + '"';
}

export function _toUtf8String(codePoints: Array<number>): string {
    return codePoints.map((codePoint) => {
        if (codePoint <= 0xffff) {
            return String.fromCharCode(codePoint);
        }
        codePoint -= 0x10000;
        return String.fromCharCode(
            (((codePoint >> 10) & 0x3ff) + 0xd800),
            ((codePoint & 0x3ff) + 0xdc00)
        );
    }).join("");
}

export function toUtf8String(bytes: BytesLike, onError?: Utf8ErrorFunc): string {
    return _toUtf8String(getUtf8CodePoints(bytes, onError));
}

export function toUtf8CodePoints(str: string, form: UnicodeNormalizationForm = UnicodeNormalizationForm.current): Array<number> {
    return getUtf8CodePoints(toUtf8Bytes(str, form));
}
