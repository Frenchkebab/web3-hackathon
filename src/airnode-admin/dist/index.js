"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthorizers = exports.updateProviderAdmin = exports.createProvider = exports.checkWithdrawalRequest = exports.requestWithdrawal = exports.createTemplate = exports.unendorseClient = exports.endorseClient = exports.deriveDesignatedWallet = exports.updateRequesterAdmin = exports.createRequester = void 0;
var ethers_1 = require("ethers");
var airnodeAbi = __importStar(require("@api3/airnode-abi"));
function createRequester(airnode, requesterAdmin) {
    return __awaiter(this, void 0, void 0, function () {
        var receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.createRequester(requesterAdmin)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.requesterIndex.toString());
                            });
                        })];
            }
        });
    });
}
exports.createRequester = createRequester;
function updateRequesterAdmin(airnode, requesterIndex, requesterAdmin) {
    return __awaiter(this, void 0, void 0, function () {
        var receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.updateRequesterAdmin(requesterIndex, requesterAdmin)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.admin);
                            });
                        })];
            }
        });
    });
}
exports.updateRequesterAdmin = updateRequesterAdmin;
function deriveDesignatedWallet(airnode, providerId, requesterIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, hdNode, designatedWalletNode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.getProvider(providerId)];
                case 1:
                    provider = _a.sent();
                    hdNode = ethers_1.ethers.utils.HDNode.fromExtendedKey(provider.xpub);
                    designatedWalletNode = hdNode.derivePath("m/0/" + requesterIndex);
                    return [2 /*return*/, designatedWalletNode.address];
            }
        });
    });
}
exports.deriveDesignatedWallet = deriveDesignatedWallet;
function endorseClient(airnode, requesterIndex, clientAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.updateClientEndorsementStatus(requesterIndex, clientAddress, true)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.clientAddress);
                            });
                        })];
            }
        });
    });
}
exports.endorseClient = endorseClient;
function unendorseClient(airnode, requesterIndex, clientAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.updateClientEndorsementStatus(requesterIndex, clientAddress, false)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.clientAddress);
                            });
                        })];
            }
        });
    });
}
exports.unendorseClient = unendorseClient;
function createTemplate(airnode, template) {
    return __awaiter(this, void 0, void 0, function () {
        var encodedParameters, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof template.parameters == 'string') {
                        encodedParameters = template.parameters;
                    }
                    else {
                        encodedParameters = airnodeAbi.encode(template.parameters);
                    }
                    return [4 /*yield*/, airnode.createTemplate(template.providerId, template.endpointId, template.requesterIndex, template.designatedWallet, template.fulfillAddress, template.fulfillFunctionId, encodedParameters)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.templateId);
                            });
                        })];
            }
        });
    });
}
exports.createTemplate = createTemplate;
function requestWithdrawal(airnode, providerId, requesterIndex, destination) {
    return __awaiter(this, void 0, void 0, function () {
        var designatedWalletAddress, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    designatedWalletAddress = deriveDesignatedWallet(airnode, providerId, requesterIndex);
                    return [4 /*yield*/, airnode.requestWithdrawal(providerId, requesterIndex, designatedWalletAddress, destination)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.withdrawalRequestId);
                            });
                        })];
            }
        });
    });
}
exports.requestWithdrawal = requestWithdrawal;
function checkWithdrawalRequest(airnode, withdrawalRequestId) {
    return __awaiter(this, void 0, void 0, function () {
        var logs, parsedLog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.provider.getLogs({
                        address: airnode.address,
                        fromBlock: 0,
                        topics: [
                            ethers_1.ethers.utils.id('WithdrawalFulfilled(bytes32,uint256,bytes32,address,address,uint256)'),
                            null,
                            null,
                            withdrawalRequestId,
                        ],
                    })];
                case 1:
                    logs = _a.sent();
                    if (logs.length === 0) {
                        return [2 /*return*/, undefined];
                    }
                    parsedLog = airnode.interface.parseLog(logs[0]);
                    return [2 /*return*/, parsedLog.args.amount];
            }
        });
    });
}
exports.checkWithdrawalRequest = checkWithdrawalRequest;
function createProvider(airnode, providerAdmin) {
    return __awaiter(this, void 0, void 0, function () {
        var hdNode, xpub, masterWallet, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hdNode = ethers_1.ethers.utils.HDNode.fromMnemonic(airnode.signer.mnemonic.phrase);
                    xpub = hdNode.neuter().extendedKey;
                    masterWallet = ethers_1.ethers.Wallet.fromMnemonic(airnode.signer.mnemonic.phrase, 'm').connect(airnode.provider);
                    return [4 /*yield*/, airnode.connect(masterWallet).createProvider(providerAdmin, xpub)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.providerId.toString());
                            });
                        })];
            }
        });
    });
}
exports.createProvider = createProvider;
function updateProviderAdmin(airnode, providerId, providerAdmin) {
    return __awaiter(this, void 0, void 0, function () {
        var receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.updateProvider(providerId, providerAdmin)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.admin);
                            });
                        })];
            }
        });
    });
}
exports.updateProviderAdmin = updateProviderAdmin;
function updateAuthorizers(airnode, providerId, endpointId, authorizers) {
    return __awaiter(this, void 0, void 0, function () {
        var receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airnode.updateEndpointAuthorizers(providerId, endpointId, authorizers)];
                case 1:
                    receipt = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) {
                            return airnode.provider.once(receipt.hash, function (tx) {
                                var parsedLog = airnode.interface.parseLog(tx.logs[0]);
                                resolve(parsedLog.args.authorizers);
                            });
                        })];
            }
        });
    });
}
exports.updateAuthorizers = updateAuthorizers;
//# sourceMappingURL=index.js.map