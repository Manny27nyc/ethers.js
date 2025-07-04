// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticErrorSeverity = exports.ValueNode = exports.ScopeNode = exports.PopNode = exports.OpcodeNode = exports.Node = exports.LiteralNode = exports.LinkNode = exports.LabelledNode = exports.LabelNode = exports.ExecutionNode = exports.EvaluationNode = exports.DataNode = exports.parse = exports.formatBytecode = exports.disassemble = exports.assemble = exports.Opcode = void 0;
var assembler_1 = require("./assembler");
Object.defineProperty(exports, "assemble", { enumerable: true, get: function () { return assembler_1.assemble; } });
Object.defineProperty(exports, "DataNode", { enumerable: true, get: function () { return assembler_1.DataNode; } });
Object.defineProperty(exports, "disassemble", { enumerable: true, get: function () { return assembler_1.disassemble; } });
Object.defineProperty(exports, "EvaluationNode", { enumerable: true, get: function () { return assembler_1.EvaluationNode; } });
Object.defineProperty(exports, "ExecutionNode", { enumerable: true, get: function () { return assembler_1.ExecutionNode; } });
Object.defineProperty(exports, "formatBytecode", { enumerable: true, get: function () { return assembler_1.formatBytecode; } });
Object.defineProperty(exports, "LabelNode", { enumerable: true, get: function () { return assembler_1.LabelNode; } });
Object.defineProperty(exports, "LabelledNode", { enumerable: true, get: function () { return assembler_1.LabelledNode; } });
Object.defineProperty(exports, "LinkNode", { enumerable: true, get: function () { return assembler_1.LinkNode; } });
Object.defineProperty(exports, "LiteralNode", { enumerable: true, get: function () { return assembler_1.LiteralNode; } });
Object.defineProperty(exports, "Node", { enumerable: true, get: function () { return assembler_1.Node; } });
Object.defineProperty(exports, "OpcodeNode", { enumerable: true, get: function () { return assembler_1.OpcodeNode; } });
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return assembler_1.parse; } });
Object.defineProperty(exports, "PopNode", { enumerable: true, get: function () { return assembler_1.PopNode; } });
Object.defineProperty(exports, "ScopeNode", { enumerable: true, get: function () { return assembler_1.ScopeNode; } });
Object.defineProperty(exports, "ValueNode", { enumerable: true, get: function () { return assembler_1.ValueNode; } });
var opcodes_1 = require("./opcodes");
Object.defineProperty(exports, "Opcode", { enumerable: true, get: function () { return opcodes_1.Opcode; } });
var assembler_2 = require("./assembler");
Object.defineProperty(exports, "SemanticErrorSeverity", { enumerable: true, get: function () { return assembler_2.SemanticErrorSeverity; } });
//# sourceMappingURL=index.js.map