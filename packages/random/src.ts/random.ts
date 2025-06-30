// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import { randomBytes as _randomBytes } from "crypto";

import { arrayify } from "@ethersproject/bytes";

export function randomBytes(length: number): Uint8Array {
    return arrayify(_randomBytes(length));
}
