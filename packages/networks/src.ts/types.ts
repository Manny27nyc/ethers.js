// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";

export type Network = {
    name: string,
    chainId: number,
    ensAddress?: string,
    _defaultProvider?: (providers: any, options?: any) => any
}

export type Networkish = Network | string | number;
