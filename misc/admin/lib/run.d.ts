// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
/// <reference types="node" />
export declare type RunResult = {
    stderr: string | null;
    _stderr: string | Buffer;
    stdout: string;
    _stdout: string | Buffer;
    status: number;
    ok: boolean;
};
export declare function run(progname: string, args?: Array<string>, currentWorkingDirectory?: string): RunResult;
