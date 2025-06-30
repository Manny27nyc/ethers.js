// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
export declare type Change = {
    title: string;
    version: string;
    date: string;
    content: string;
};
export declare function generate(): Promise<string>;
export declare function getLatestChange(): Change;
