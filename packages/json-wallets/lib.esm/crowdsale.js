// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";
import aes from "aes-js";
import { getAddress } from "@ethersproject/address";
import { arrayify } from "@ethersproject/bytes";
import { keccak256 } from "@ethersproject/keccak256";
import { pbkdf2 } from "@ethersproject/pbkdf2";
import { toUtf8Bytes } from "@ethersproject/strings";
import { Description } from "@ethersproject/properties";
import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);
import { getPassword, looseArrayify, searchPath } from "./utils";
export class CrowdsaleAccount extends Description {
    isCrowdsaleAccount(value) {
        return !!(value && value._isCrowdsaleAccount);
    }
}
// See: https://github.com/ethereum/pyethsaletool
export function decrypt(json, password) {
    const data = JSON.parse(json);
    password = getPassword(password);
    // Ethereum Address
    const ethaddr = getAddress(searchPath(data, "ethaddr"));
    // Encrypted Seed
    const encseed = looseArrayify(searchPath(data, "encseed"));
    if (!encseed || (encseed.length % 16) !== 0) {
        logger.throwArgumentError("invalid encseed", "json", json);
    }
    const key = arrayify(pbkdf2(password, password, 2000, 32, "sha256")).slice(0, 16);
    const iv = encseed.slice(0, 16);
    const encryptedSeed = encseed.slice(16);
    // Decrypt the seed
    const aesCbc = new aes.ModeOfOperation.cbc(key, iv);
    const seed = aes.padding.pkcs7.strip(arrayify(aesCbc.decrypt(encryptedSeed)));
    // This wallet format is weird... Convert the binary encoded hex to a string.
    let seedHex = "";
    for (let i = 0; i < seed.length; i++) {
        seedHex += String.fromCharCode(seed[i]);
    }
    const seedHexBytes = toUtf8Bytes(seedHex);
    const privateKey = keccak256(seedHexBytes);
    return new CrowdsaleAccount({
        _isCrowdsaleAccount: true,
        address: ethaddr,
        privateKey: privateKey
    });
}
//# sourceMappingURL=crowdsale.js.map