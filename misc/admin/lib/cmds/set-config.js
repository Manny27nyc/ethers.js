// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const log_1 = require("../log");
if (process.argv.length !== 3) {
    console.log("Usage: set-config KEY");
    process.exit(1);
}
const key = process.argv[2];
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const value = yield log_1.getPassword("Value: ");
        yield config_1.config.set(key, value);
    });
})().catch((error) => {
    console.log(`Error running ${process.argv[0]}: ${error.message}`);
    process.exit(1);
});
