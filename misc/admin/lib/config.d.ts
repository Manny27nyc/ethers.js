// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
export declare const config: {
    get: (key: string) => Promise<string>;
    set: (key: string, value: string) => void;
    keys: () => Promise<string[]>;
    lock: () => void;
};
