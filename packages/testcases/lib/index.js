// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCase = exports.randomNumber = exports.randomHexString = exports.randomBytes = exports.saveTests = exports.loadTests = exports.loadData = void 0;
var disk_utils_1 = require("./disk-utils");
Object.defineProperty(exports, "loadData", { enumerable: true, get: function () { return disk_utils_1.loadData; } });
Object.defineProperty(exports, "loadTests", { enumerable: true, get: function () { return disk_utils_1.loadTests; } });
Object.defineProperty(exports, "saveTests", { enumerable: true, get: function () { return disk_utils_1.saveTests; } });
var random_1 = require("./random");
Object.defineProperty(exports, "randomBytes", { enumerable: true, get: function () { return random_1.randomBytes; } });
Object.defineProperty(exports, "randomHexString", { enumerable: true, get: function () { return random_1.randomHexString; } });
Object.defineProperty(exports, "randomNumber", { enumerable: true, get: function () { return random_1.randomNumber; } });
var TestCase = __importStar(require("./testcases"));
exports.TestCase = TestCase;
//# sourceMappingURL=index.js.map