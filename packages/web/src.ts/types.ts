// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";

export type GetUrlResponse = {
    statusCode: number,
    statusMessage: string;
    headers: { [ key: string] : string };
    body: Uint8Array;
};

export type Options = {
    method?: string,
    allowGzip?: boolean;
    body?: Uint8Array
    headers?: { [ key: string] : string },
};

