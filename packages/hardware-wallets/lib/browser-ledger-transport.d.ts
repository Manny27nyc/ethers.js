// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
export declare type TransportCreator = {
    create: () => Promise<Transport>;
};
export declare const transports: {
    [name: string]: TransportCreator;
};
//# sourceMappingURL=browser-ledger-transport.d.ts.map