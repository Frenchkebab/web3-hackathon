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
var fs = __importStar(require("fs"));
var yargs = __importStar(require("yargs"));
var ethers_1 = require("ethers");
var evm = __importStar(require("./evm"));
var contract = __importStar(require("."));
var supportedChains = ['ropsten', 'rinkeby', 'goerli', 'xdai', 'fantom'];
yargs
    .command('create-requester', 'Creates a requester and returns its index', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    requesterAdmin: {
        type: 'string',
        demandOption: true,
        describe: 'Address of the requester admin',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, requesterIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.createRequester(airnode, args.requesterAdmin)];
            case 2:
                requesterIndex = _a.sent();
                console.log("Requester index: " + requesterIndex);
                return [2 /*return*/];
        }
    });
}); })
    .command('update-requester-admin', 'Updates the requester admin', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    requesterIndex: {
        type: 'string',
        demandOption: true,
        describe: 'Requester index',
    },
    requesterAdmin: {
        type: 'string',
        demandOption: true,
        describe: 'Address of the requester admin',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, requesterAdmin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.updateRequesterAdmin(airnode, args.requesterIndex, args.requesterAdmin)];
            case 2:
                requesterAdmin = _a.sent();
                console.log("Requester admin: " + requesterAdmin);
                return [2 /*return*/];
        }
    });
}); })
    .command('derive-designated-wallet', 'Derives the address of the designated wallet for a provider-requester pair', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    providerId: {
        type: 'string',
        demandOption: true,
        describe: 'Provider ID',
    },
    requesterIndex: {
        type: 'string',
        demandOption: true,
        describe: 'Requester index',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, designatedWallet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnode(args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.deriveDesignatedWallet(airnode, args.providerId, args.requesterIndex)];
            case 2:
                designatedWallet = _a.sent();
                console.log("Designated wallet address: " + designatedWallet);
                return [2 /*return*/];
        }
    });
}); })
    .command('endorse-client', 'Endorses a client as a requester admin', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    requesterIndex: {
        type: 'string',
        demandOption: true,
        describe: 'Requester index',
    },
    clientAddress: {
        type: 'string',
        demandOption: true,
        describe: 'Address of the client',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, clientAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.endorseClient(airnode, args.requesterIndex, args.clientAddress)];
            case 2:
                clientAddress = _a.sent();
                console.log("Client address: " + clientAddress);
                return [2 /*return*/];
        }
    });
}); })
    .command('unendorse-client', 'Unendorses a client as a requester admin', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    requesterIndex: {
        type: 'string',
        demandOption: true,
        describe: 'Requester index',
    },
    clientAddress: {
        type: 'string',
        demandOption: true,
        describe: 'Address of the client',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, clientAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.unendorseClient(airnode, args.requesterIndex, args.clientAddress)];
            case 2:
                clientAddress = _a.sent();
                console.log("Client address: " + clientAddress);
                return [2 /*return*/];
        }
    });
}); })
    .command('create-template', 'Creates a template and returns its ID', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    templateFilePath: {
        type: 'string',
        demandOption: true,
        describe: 'Path of the template JSON file',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var template, airnode, templateId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                template = JSON.parse(fs.readFileSync(args.templateFilePath).toString());
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.createTemplate(airnode, template)];
            case 2:
                templateId = _a.sent();
                console.log("Template ID: " + templateId);
                return [2 /*return*/];
        }
    });
}); })
    .command('request-withdrawal', 'Requests withdrawal from the designated wallet of a provider as a requester admin', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    providerId: {
        type: 'string',
        demandOption: true,
        describe: 'Provider ID',
    },
    requesterIndex: {
        type: 'string',
        demandOption: true,
        describe: 'Requester index',
    },
    destination: {
        type: 'string',
        demandOption: true,
        describe: 'Withdrawal destination',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, withdrawalRequestId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.requestWithdrawal(airnode, args.providerId, args.requesterIndex, args.destination)];
            case 2:
                withdrawalRequestId = _a.sent();
                console.log("Withdrawal request ID: " + withdrawalRequestId);
                return [2 /*return*/];
        }
    });
}); })
    .command('check-withdrawal-request', 'Checks the state of the withdrawal request', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    withdrawalRequestId: {
        type: 'string',
        demandOption: true,
        describe: 'Withdrawal request ID',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, withdrawnAmount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnode(args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.checkWithdrawalRequest(airnode, args.withdrawalRequestId)];
            case 2:
                withdrawnAmount = _a.sent();
                if (withdrawnAmount) {
                    console.log("Withdrawn amount: " + withdrawnAmount);
                }
                else {
                    console.log("Withdrawal request is not fulfilled yet");
                }
                return [2 /*return*/];
        }
    });
}); })
    .command('create-provider', 'Creates a provider and returns its ID', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    providerAdmin: {
        type: 'string',
        demandOption: true,
        describe: 'Address of the provider admin',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, providerId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.createProvider(airnode, args.providerAdmin)];
            case 2:
                providerId = _a.sent();
                console.log("Provider ID: " + providerId);
                return [2 /*return*/];
        }
    });
}); })
    .command('update-provider-admin', 'Updates the provider admin', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    providerId: {
        type: 'string',
        demandOption: true,
        describe: 'Provider ID',
    },
    providerAdmin: {
        type: 'string',
        demandOption: true,
        describe: 'Address of the provider admin',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var airnode, providerAdmin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.updateProviderAdmin(airnode, args.providerId, args.providerAdmin)];
            case 2:
                providerAdmin = _a.sent();
                console.log("Provider admin: " + providerAdmin);
                return [2 /*return*/];
        }
    });
}); })
    .command('derive-endpoint-id', 'Derives an endpoint ID using the OIS title and endpoint name', {
    oisTitle: {
        type: 'string',
        demandOption: true,
        describe: 'Title of the OIS that the endpoint belongs to',
    },
    endpointName: {
        type: 'string',
        demandOption: true,
        describe: 'Name of the endpoint',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var endpointId;
    return __generator(this, function (_a) {
        endpointId = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.defaultAbiCoder.encode(['string'], [args.oisTitle + "/" + args.endpointName]));
        console.log("Endpoint ID: " + endpointId);
        return [2 /*return*/];
    });
}); })
    .command('update-authorizers', 'Updates the authorizers of an endpoint belonging to a provider', {
    chain: {
        type: 'string',
        choices: supportedChains,
        describe: 'Name of the chain',
    },
    providerUrl: {
        type: 'string',
        describe: 'URL of the Ethereum provider',
    },
    mnemonic: {
        type: 'string',
        demandOption: true,
        describe: 'Mnemonic of the wallet',
    },
    providerId: {
        type: 'string',
        demandOption: true,
        describe: 'Provider ID',
    },
    endpointId: {
        type: 'string',
        demandOption: true,
        describe: 'Endpoint ID',
    },
    authorizersFilePath: {
        type: 'string',
        demandOption: true,
        describe: 'Path of the authorizers JSON file',
    },
}, function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizers, airnode, updatedAuthorizers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!args.chain && !args.providerUrl) || (args.chain && args.providerUrl)) {
                    throw new Error('Provide either chain or providerUrl');
                }
                authorizers = JSON.parse(fs.readFileSync(args.authorizersFilePath).toString());
                return [4 /*yield*/, evm.getAirnodeWithSigner(args.mnemonic, args.chain, args.providerUrl)];
            case 1:
                airnode = _a.sent();
                return [4 /*yield*/, contract.updateAuthorizers(airnode, args.providerId, args.endpointId, authorizers)];
            case 2:
                updatedAuthorizers = _a.sent();
                console.log("Authorizers: " + updatedAuthorizers);
                return [2 /*return*/];
        }
    });
}); })
    .help().argv;
//# sourceMappingURL=cli.js.map