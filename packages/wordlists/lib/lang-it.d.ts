// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import { Wordlist } from "./wordlist";
declare class LangIt extends Wordlist {
    constructor();
    getWord(index: number): string;
    getWordIndex(word: string): number;
}
declare const langIt: LangIt;
export { langIt };
//# sourceMappingURL=lang-it.d.ts.map