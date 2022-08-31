import { ethers } from 'ethers';
export declare function getAirnode(chain: any, providerUrl: any): Promise<ethers.Contract>;
export declare function getAirnodeWithSigner(mnemonic: any, chain: any, providerUrl: any): Promise<ethers.Contract>;
