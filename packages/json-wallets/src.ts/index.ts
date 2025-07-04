// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";

import { Bytes } from "@ethersproject/bytes";
import { ExternallyOwnedAccount } from "@ethersproject/abstract-signer";

import { decrypt as decryptCrowdsale } from "./crowdsale";
import { getJsonWalletAddress, isCrowdsaleWallet, isKeystoreWallet } from "./inspect";
import { decrypt as decryptKeystore, decryptSync as decryptKeystoreSync, encrypt as encryptKeystore, EncryptOptions, ProgressCallback } from "./keystore";

function decryptJsonWallet(json: string, password: Bytes | string, progressCallback?: ProgressCallback): Promise<ExternallyOwnedAccount> {
    if (isCrowdsaleWallet(json)) {
        if (progressCallback) { progressCallback(0); }
        const account = decryptCrowdsale(json, password)
        if (progressCallback) { progressCallback(1); }
        return Promise.resolve(account);
    }

    if (isKeystoreWallet(json)) {
        return decryptKeystore(json, password, progressCallback);
    }

    return Promise.reject(new Error("invalid JSON wallet"));
}

function decryptJsonWalletSync(json: string, password: Bytes | string): ExternallyOwnedAccount {
    if (isCrowdsaleWallet(json)) {
        return decryptCrowdsale(json, password)
    }

    if (isKeystoreWallet(json)) {
        return decryptKeystoreSync(json, password);
    }

    throw new Error("invalid JSON wallet");
}

export {
    decryptCrowdsale,

    decryptKeystore,
    decryptKeystoreSync,
    encryptKeystore,

    isCrowdsaleWallet,
    isKeystoreWallet,
    getJsonWalletAddress,

    decryptJsonWallet,
    decryptJsonWalletSync,

    ProgressCallback,
    EncryptOptions,
};
