/// <reference types="w3c-web-usb" />
/// <reference types="node" />
import { Connection } from '.';
export default class WebUSB implements Connection {
    private device;
    private endpointNumber;
    constructor(device: USBDevice);
    open({ configuration, interface: interfaceNumber, }?: {
        configuration?: number;
        interface?: number;
    }): Promise<void>;
    write(data: Buffer): Promise<USBOutTransferResult>;
    close(): Promise<void>;
}
