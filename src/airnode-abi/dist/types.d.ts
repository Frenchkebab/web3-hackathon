export declare type ABIParameterType = 'address' | 'bytes' | 'bytes32' | 'int256' | 'uint256' | 'string';
export declare type ABIParameterTypeShort = 'a' | 'B' | 'b' | 'i' | 'u' | 'S';
export interface DecodedMap {
    [key: string]: string;
}
export interface InputParameter {
    name: string;
    type: string;
    value: string;
}
