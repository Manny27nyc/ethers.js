// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";

import {
    Block,
    BlockTag,
    EventType,
    FeeData,
    Filter,
    Log,
    Listener,
    Provider,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse
} from "@ethersproject/abstract-provider";

import { getNetwork } from "@ethersproject/networks";
import { Network, Networkish } from "@ethersproject/networks";

import { BaseProvider, EnsProvider, EnsResolver, Resolver } from "./base-provider";

import { AlchemyProvider, AlchemyWebSocketProvider } from "./alchemy-provider";
import { CloudflareProvider } from "./cloudflare-provider";
import { EtherscanProvider } from "./etherscan-provider";
import { FallbackProvider } from "./fallback-provider";
import { IpcProvider } from "./ipc-provider";
import { InfuraProvider, InfuraWebSocketProvider } from "./infura-provider";
import { JsonRpcProvider, JsonRpcSigner } from "./json-rpc-provider";
import { JsonRpcBatchProvider } from "./json-rpc-batch-provider";
import { NodesmithProvider } from "./nodesmith-provider";
import { PocketProvider } from "./pocket-provider";
import { StaticJsonRpcProvider, UrlJsonRpcProvider } from "./url-json-rpc-provider";
import { Web3Provider } from "./web3-provider";
import { WebSocketProvider } from "./websocket-provider";
import { ExternalProvider, JsonRpcFetchFunc } from "./web3-provider";

import { CommunityResourcable, Formatter, isCommunityResourcable, isCommunityResource, showThrottleMessage } from "./formatter";

import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);

////////////////////////
// Helper Functions

function getDefaultProvider(network?: Network | string, options?: any): BaseProvider {
    if (network == null) { network = "homestead"; }

    // If passed a URL, figure out the right type of provider based on the scheme
    if (typeof(network) === "string") {
        // @TODO: Add support for IpcProvider; maybe if it ends in ".ipc"?

        // Handle http and ws (and their secure variants)
        const match = network.match(/^(ws|http)s?:/i);
        if (match) {
            switch (match[1]) {
                case "http":
                    return new JsonRpcProvider(network);
                case "ws":
                    return new WebSocketProvider(network);
                default:
                    logger.throwArgumentError("unsupported URL scheme", "network", network);
            }
        }
    }

    const n = getNetwork(network);
    if (!n || !n._defaultProvider) {
        logger.throwError("unsupported getDefaultProvider network", Logger.errors.NETWORK_ERROR, {
            operation: "getDefaultProvider",
            network: network
        });
    }

    return n._defaultProvider({
        FallbackProvider,

        AlchemyProvider,
        CloudflareProvider,
        EtherscanProvider,
        InfuraProvider,
        JsonRpcProvider,
        NodesmithProvider,
        PocketProvider,
        Web3Provider,

        IpcProvider,
    }, options);
}

////////////////////////
// Exports

export {

    // Abstract Providers (or Abstract-ish)
    Provider,
    BaseProvider,

    Resolver,

    UrlJsonRpcProvider,

    ///////////////////////
    // Concreate Providers

    FallbackProvider,

    AlchemyProvider,
    AlchemyWebSocketProvider,
    CloudflareProvider,
    EtherscanProvider,
    InfuraProvider,
    InfuraWebSocketProvider,
    JsonRpcProvider,
    JsonRpcBatchProvider,
    NodesmithProvider,
    PocketProvider,
    StaticJsonRpcProvider,
    Web3Provider,
    WebSocketProvider,

    IpcProvider,


    ///////////////////////
    // Signer

    JsonRpcSigner,


    ///////////////////////
    // Functions

    getDefaultProvider,
    getNetwork,
    isCommunityResource,
    isCommunityResourcable,
    showThrottleMessage,


    ///////////////////////
    // Objects

    Formatter,


    ///////////////////////
    // Types

    Block,
    BlockTag,
    EventType,
    FeeData,
    Filter,
    Log,
    Listener,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,

    ExternalProvider,
    JsonRpcFetchFunc,

    Network,
    Networkish,

    EnsProvider,
    EnsResolver,

    CommunityResourcable
};

