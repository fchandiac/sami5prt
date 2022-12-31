"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Epson_1 = require("./Epson");
const Printer_1 = require("../Printer");
class Elgin extends Epson_1.default {
    cutter(mode) {
        if (this.capabilities.model == 'I9') {
            return this.connection.write(Buffer.from('\x1DV0', 'ascii'));
        }
        super.cutter(mode);
    }
    buzzer() {
        this.connection.write(Buffer.from('\x1B(A\x05\x00ad\x02\x02\x01', 'ascii'));
    }
    drawer(number, on_time, off_time) {
        if (this.capabilities.model.startsWith('I')) {
            return super.drawer(number, on_time, off_time);
        }
        const index = {
            [Printer_1.Drawer.First]: 'v',
            [Printer_1.Drawer.Second]: 'v',
        };
        const on_time_char = String.fromCharCode(Math.max(Math.min(on_time, 200), 50));
        this.connection.write(Buffer.from('\x1B' + index[number] + on_time_char, 'ascii'));
    }
    setStyle(style, enable) {
        if (this.capabilities.model == 'I9') {
            return super.setStyle(style, enable);
        }
        if (enable) {
            if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BE', 'ascii'));
                return;
            }
        }
        else {
            if (Printer_1.Style.Bold == style) {
                this.connection.write(Buffer.from('\x1BF', 'ascii'));
                return;
            }
        }
        return super.setStyle(style, enable);
    }
    setMode(mode, enable) {
        if (this.capabilities.model == 'I9') {
            return super.setMode(mode, enable);
        }
        if (enable) {
            if (mode & Printer_1.Style.DoubleWidth) {
                this.connection.write(Buffer.from('\x1BW\x01', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bd\x01', 'ascii'));
            }
        }
        else {
            if (mode & Printer_1.Style.DoubleHeight) {
                this.connection.write(Buffer.from('\x1Bd\x00', 'ascii'));
            }
            if (mode & Printer_1.Style.DoubleWidth) {
                this.connection.write(Buffer.from('\x1BW\x00', 'ascii'));
            }
        }
    }
    qrcode(data, size) {
        const _super = Object.create(null, {
            qrcode: { get: () => super.qrcode }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.capabilities.model == 'I9') {
                return _super.qrcode.call(this, data, size);
            }
            const type = String.fromCharCode(2);
            const error = 'M';
            const _size = String.fromCharCode(Math.min(255, Math.max(1, size || 4)));
            this.connection.write(Buffer.from('\x1Do\x00' + _size + '\x00' + type, 'ascii'));
            this.connection.write(Buffer.from('\x1Dk\x0B' + error + 'A,', 'ascii'));
            this.connection.write(Buffer.from(data, 'ascii'));
            this.connection.write(Buffer.from('\x00', 'ascii'));
        });
    }
}
exports.default = Elgin;
//# sourceMappingURL=Elgin.js.map