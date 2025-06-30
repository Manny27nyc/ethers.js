// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
interface Runner {
    on(event: string, callback: (...args: Array<any>) => void): Runner;
}
export declare function ReporterKeepAlive(runner: Runner): void;
export {};
//# sourceMappingURL=reporter-keepalive.d.ts.map