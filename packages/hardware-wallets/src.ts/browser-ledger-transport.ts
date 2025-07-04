// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";

import u2f from "@ledgerhq/hw-transport-u2f";

export type TransportCreator = {
    create: () => Promise<Transport>;
};

export const transports: { [ name: string ]: TransportCreator } = {
    "u2f": u2f,
    "default": u2f
};
