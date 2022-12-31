"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class WebUSB {
    constructor(device) {
        this.device = device;
        this.endpointNumber = 1;
    }
    open({ configuration = 1, interface: interfaceNumber = 0, } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.device.open();
            yield this.device.selectConfiguration(configuration);
            yield this.device.claimInterface(interfaceNumber);
            const iface = this.device.configuration.interfaces[interfaceNumber];
            const endpoint = iface.alternate.endpoints.find((e) => e.direction === 'out');
            this.endpointNumber = endpoint.endpointNumber;
        });
    }
    write(data) {
        return this.device.transferOut(this.endpointNumber, data);
    }
    close() {
        return this.device.close();
    }
}
exports.default = WebUSB;
//# sourceMappingURL=WebUSB.js.map