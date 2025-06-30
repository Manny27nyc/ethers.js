// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import { Coder, Reader, Writer } from "./abstract-coder";
export declare class AddressCoder extends Coder {
    constructor(localName: string);
    defaultValue(): string;
    encode(writer: Writer, value: string): number;
    decode(reader: Reader): any;
}
//# sourceMappingURL=address.d.ts.map