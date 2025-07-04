// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxInt256 = exports.MinInt256 = exports.MaxUint256 = exports.WeiPerEther = exports.Two = exports.One = exports.Zero = exports.NegativeOne = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var NegativeOne = ( /*#__PURE__*/bignumber_1.BigNumber.from(-1));
exports.NegativeOne = NegativeOne;
var Zero = ( /*#__PURE__*/bignumber_1.BigNumber.from(0));
exports.Zero = Zero;
var One = ( /*#__PURE__*/bignumber_1.BigNumber.from(1));
exports.One = One;
var Two = ( /*#__PURE__*/bignumber_1.BigNumber.from(2));
exports.Two = Two;
var WeiPerEther = ( /*#__PURE__*/bignumber_1.BigNumber.from("1000000000000000000"));
exports.WeiPerEther = WeiPerEther;
var MaxUint256 = ( /*#__PURE__*/bignumber_1.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
exports.MaxUint256 = MaxUint256;
var MinInt256 = ( /*#__PURE__*/bignumber_1.BigNumber.from("-0x8000000000000000000000000000000000000000000000000000000000000000"));
exports.MinInt256 = MinInt256;
var MaxInt256 = ( /*#__PURE__*/bignumber_1.BigNumber.from("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
exports.MaxInt256 = MaxInt256;
//# sourceMappingURL=bignumbers.js.map