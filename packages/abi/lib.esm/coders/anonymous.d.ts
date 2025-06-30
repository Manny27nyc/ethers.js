// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import { Coder, Reader, Writer } from "./abstract-coder";
export declare class AnonymousCoder extends Coder {
    private coder;
    constructor(coder: Coder);
    defaultValue(): any;
    encode(writer: Writer, value: any): number;
    decode(reader: Reader): any;
}
//# sourceMappingURL=anonymous.d.ts.map