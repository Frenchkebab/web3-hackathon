"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.decode = void 0;
var ethers_1 = require("ethers");
var chunk_1 = __importDefault(require("lodash/chunk"));
var utils_1 = require("./utils");
// Certain types need to be parsed after ABI decoding happens
var TRANSFORMATIONS = {
    bytes32: ethers_1.ethers.utils.parseBytes32String,
    int256: function (value) { return value.toString(); },
    uint256: function (value) { return value.toString(); },
};
function buildDecodedMap(types, nameValuePairs) {
    return nameValuePairs.reduce(function (acc, pair, index) {
        var _a, _b;
        var _c = __read(pair, 2), encodedName = _c[0], encodedValue = _c[1];
        var name = ethers_1.ethers.utils.parseBytes32String(encodedName);
        var type = types[index];
        var transform = TRANSFORMATIONS[type];
        // If the type does not need to be transformed, return it as is
        if (!transform) {
            return __assign(__assign({}, acc), (_a = {}, _a[name] = encodedValue, _a));
        }
        var parsedValue = transform(encodedValue);
        return __assign(__assign({}, acc), (_b = {}, _b[name] = parsedValue, _b));
    }, {});
}
function decode(encodedData) {
    // Special cases for empty parameters
    if (encodedData === '0x') {
        return {};
    }
    // Alternatively:
    // const header = encodedData.substring(0, 66);
    var header = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.arrayify(encodedData).slice(0, 32));
    var parsedHeader = ethers_1.ethers.utils.parseBytes32String(header);
    // Get and validate the first character of the header
    var encodedEncodingVersion = parsedHeader.substring(0, 1);
    if (encodedEncodingVersion !== '1') {
        throw new Error("Unknown ABI schema version: " + encodedEncodingVersion);
    }
    // The version is specified by the first byte and the parameters are specified by the rest
    var encodedParameterTypes = parsedHeader.substring(1);
    // Replace encoded types with full type names
    var fullParameterTypes = Array.from(encodedParameterTypes).map(function (type) { return utils_1.PARAMETER_SHORT_TYPES[type]; });
    // The first `bytes32` is the type encoding
    var initialDecodedTypes = ['bytes32'];
    var decodingTypes = fullParameterTypes.reduce(function (acc, type) {
        // Each parameter is expected to have a `bytes32` name
        return __spread(acc, ['bytes32', type]);
    }, initialDecodedTypes);
    // It's important to leave the `encodedData` intact here and not try to trim off the first
    // 32 bytes (i.e. the header) because that results in the decoding failing. So decode
    // exactly what you got from the contract, including the header.
    var decodedData = ethers_1.ethers.utils.defaultAbiCoder.decode(decodingTypes, encodedData);
    var _a = __read(decodedData), _version = _a[0], decodedParameters = _a.slice(1);
    var nameValuePairs = chunk_1.default(decodedParameters, 2);
    return buildDecodedMap(fullParameterTypes, nameValuePairs);
}
exports.decode = decode;
//# sourceMappingURL=decoding.js.map