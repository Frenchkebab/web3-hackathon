"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
var ethers_1 = require("ethers");
var flatMap_1 = __importDefault(require("lodash/flatMap"));
var utils_1 = require("./utils");
// Certain types need to be encoded/transformed before ABI encoding happens
var TRANSFORMATIONS = {
    bytes32: ethers_1.ethers.utils.formatBytes32String,
};
function buildSchemaHeader(types) {
    var allShortTypes = Object.keys(utils_1.PARAMETER_SHORT_TYPES);
    // Shorten all selected types with the corresponding "short" type
    // i.e. 'address' types get set as simply 'a' and 'bytes32' becomes
    // simply 'b' etc
    var selectedShortTypes = types.reduce(function (acc, type) {
        var shortType = allShortTypes.find(function (st) { return utils_1.PARAMETER_SHORT_TYPES[st] === type; });
        return __spread(acc, [shortType]);
    }, []);
    // '1' must be the first character as it indicates the version
    return "1" + selectedShortTypes.join('');
}
function buildNameValuePairs(parameters) {
    return flatMap_1.default(parameters, function (parameter) {
        var name = parameter.name, value = parameter.value, type = parameter.type;
        var transform = TRANSFORMATIONS[type];
        var encodedName = ethers_1.ethers.utils.formatBytes32String(name);
        // If the type does not need to be transformed, return it as is
        if (!transform) {
            return [encodedName, value];
        }
        var encodedValue = transform(value);
        return [encodedName, encodedValue];
    });
}
function encode(parameters) {
    var types = parameters.map(function (parameter) { return parameter.type; });
    // Each parameter name is represented by a `bytes32` string. The value
    // types are what the user provides
    var nameTypePairs = flatMap_1.default(types, function (type) { return ['bytes32', type]; });
    // The first type is always a bytes32 as it represents the schema header
    var allTypes = __spread(['bytes32'], nameTypePairs);
    // Build the schema which includes the version and the abbreviated list of parameters
    var schemaHeader = buildSchemaHeader(types);
    var encodedHeader = ethers_1.ethers.utils.formatBytes32String(schemaHeader);
    // Map and encode each name/value pair where necessary
    var flatNameValues = buildNameValuePairs(parameters);
    // The schema header is always the first value to be encoded
    var allValues = __spread([encodedHeader], flatNameValues);
    var encoder = new ethers_1.ethers.utils.AbiCoder();
    return encoder.encode(allTypes, allValues);
}
exports.encode = encode;
//# sourceMappingURL=encoding.js.map