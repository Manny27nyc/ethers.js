// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";

import { AbiCoder, checkResultErrors, ConstructorFragment, defaultAbiCoder, ErrorFragment, EventFragment, FormatTypes, Fragment, FunctionFragment, Indexed, Interface, LogDescription, ParamType, Result, TransactionDescription }from "@ethersproject/abi";
import { getAddress, getCreate2Address, getContractAddress, getIcapAddress, isAddress } from "@ethersproject/address";
import * as base64 from "@ethersproject/base64";
import { Base58 as base58 } from "@ethersproject/basex";
import { arrayify, concat, hexConcat, hexDataSlice, hexDataLength, hexlify, hexStripZeros, hexValue, hexZeroPad, isBytes, isBytesLike, isHexString, joinSignature, zeroPad, splitSignature, stripZeros } from "@ethersproject/bytes";
import { _TypedDataEncoder, hashMessage, id, isValidName, namehash } from "@ethersproject/hash";
import { defaultPath, entropyToMnemonic, getAccountPath, HDNode, isValidMnemonic, mnemonicToEntropy, mnemonicToSeed } from "@ethersproject/hdnode";
import { getJsonWalletAddress } from "@ethersproject/json-wallets";
import { keccak256 } from "@ethersproject/keccak256";
import { Logger } from "@ethersproject/logger";
import { computeHmac, ripemd160, sha256, sha512 } from "@ethersproject/sha2";
import { keccak256 as solidityKeccak256, pack as solidityPack, sha256 as soliditySha256 } from "@ethersproject/solidity";
import { randomBytes, shuffled } from "@ethersproject/random";
import { checkProperties, deepCopy, defineReadOnly, getStatic, resolveProperties, shallowCopy } from "@ethersproject/properties";
import * as RLP from "@ethersproject/rlp";
import { computePublicKey, recoverPublicKey, SigningKey } from "@ethersproject/signing-key";
import { formatBytes32String, nameprep, parseBytes32String, _toEscapedUtf8String, toUtf8Bytes, toUtf8CodePoints, toUtf8String, Utf8ErrorFuncs } from "@ethersproject/strings";
import { accessListify, computeAddress, parse as parseTransaction, recoverAddress, serialize as serializeTransaction, TransactionTypes } from "@ethersproject/transactions";
import { commify, formatEther, parseEther, formatUnits, parseUnits } from "@ethersproject/units";
import { verifyMessage, verifyTypedData } from "@ethersproject/wallet";
import { _fetchData, fetchJson, poll } from "@ethersproject/web";

////////////////////////
// Enums

import { SupportedAlgorithm } from "@ethersproject/sha2";
import { UnicodeNormalizationForm, Utf8ErrorReason } from "@ethersproject/strings";
import { UnsignedTransaction } from "@ethersproject/transactions";

////////////////////////
// Types and Interfaces

import { CoerceFunc } from "@ethersproject/abi";
import { Bytes, BytesLike, Hexable } from "@ethersproject/bytes"
import { Mnemonic } from "@ethersproject/hdnode";
import { EncryptOptions, ProgressCallback } from "@ethersproject/json-wallets";
import { Deferrable } from "@ethersproject/properties";
import { Utf8ErrorFunc } from "@ethersproject/strings";
import { AccessList, AccessListish } from "@ethersproject/transactions";
import { ConnectionInfo, FetchJsonResponse, OnceBlockable, OncePollable, PollOptions } from "@ethersproject/web";

////////////////////////
// Exports

export {
    AbiCoder,
    defaultAbiCoder,

    Fragment,
    ConstructorFragment,
    ErrorFragment,
    EventFragment,
    FunctionFragment,
    ParamType,
    FormatTypes,

    checkResultErrors,
    Result,

    Logger,

    RLP,

    _fetchData,
    fetchJson,
    poll,

    checkProperties,
    deepCopy,
    defineReadOnly,
    getStatic,
    resolveProperties,
    shallowCopy,

    arrayify,

    concat,
    stripZeros,
    zeroPad,

    isBytes,
    isBytesLike,

    defaultPath,
    HDNode,
    SigningKey,

    Interface,

    LogDescription,
    TransactionDescription,

    base58,
    base64,

    hexlify,
    isHexString,
    hexConcat,
    hexStripZeros,
    hexValue,
    hexZeroPad,
    hexDataLength,
    hexDataSlice,

    nameprep,
    _toEscapedUtf8String,
    toUtf8Bytes,
    toUtf8CodePoints,
    toUtf8String,
    Utf8ErrorFuncs,

    formatBytes32String,
    parseBytes32String,

    hashMessage,
    namehash,
    isValidName,
    id,

    _TypedDataEncoder,

    getAddress,
    getIcapAddress,
    getContractAddress,
    getCreate2Address,
    isAddress,

    formatEther,
    parseEther,

    formatUnits,
    parseUnits,

    commify,

    computeHmac,
    keccak256,
    ripemd160,
    sha256,
    sha512,

    randomBytes,
    shuffled,

    solidityPack,
    solidityKeccak256,
    soliditySha256,

    splitSignature,
    joinSignature,

    accessListify,
    parseTransaction,
    serializeTransaction,
    TransactionTypes,

    getJsonWalletAddress,

    computeAddress,
    recoverAddress,

    computePublicKey,
    recoverPublicKey,

    verifyMessage,
    verifyTypedData,

    getAccountPath,
    mnemonicToEntropy,
    entropyToMnemonic,
    isValidMnemonic,
    mnemonicToSeed,


    ////////////////////////
    // Enums

    SupportedAlgorithm,

    UnicodeNormalizationForm,
    Utf8ErrorReason,

    ////////////////////////
    // Types

    Bytes,
    BytesLike,
    Hexable,

    AccessList,
    AccessListish,
    UnsignedTransaction,

    CoerceFunc,

    Indexed,

    Mnemonic,

    Deferrable,

    Utf8ErrorFunc,

    ConnectionInfo,
    OnceBlockable,
    OncePollable,
    PollOptions,
    FetchJsonResponse,

    EncryptOptions,
    ProgressCallback
}

