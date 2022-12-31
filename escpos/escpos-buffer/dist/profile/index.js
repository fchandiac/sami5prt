"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Printer_1 = require("../Printer");
const iconv = require("iconv-lite");
const QRCode = require("qrcode");
const Image_1 = require("../graphics/Image");
const filter_1 = require("../graphics/filter");
class Profile {
    constructor(capabilities) {
        this.capabilities = capabilities;
        this.columns = this.defaultColumns;
        this.codepage = this.capabilities.codepage;
    }
    setStyles(styles, enable) {
        let properties = [
            Printer_1.Style.Condensed,
            Printer_1.Style.Bold,
            Printer_1.Style.Italic,
            Printer_1.Style.Underline,
        ];
        properties = enable ? properties : properties.reverse();
        properties.forEach((style) => {
            this.setStyle(style & styles, enable);
        });
    }
    write(text, styles) {
        this.setMode(styles, true);
        this.setStyles(styles, true);
        this.connection.write(iconv.encode(text, this._codepage.code));
        this.setStyles(styles, false);
        this.setMode(styles, false);
    }
    withStyle(styleConf, cb) {
        const { width = undefined, height = undefined, bold = false, italic = false, underline = false, align = Printer_1.Align.Left, } = styleConf;
        let styles = 0;
        if (bold)
            styles |= Printer_1.Style.Bold;
        if (italic)
            styles |= Printer_1.Style.Italic;
        if (underline)
            styles |= Printer_1.Style.Underline;
        if (align !== Printer_1.Align.Left) {
            this.alignment = align;
        }
        this.setCharSize({ width, height });
        this.setStyles(styles, true);
        cb();
        this.setStyles(styles, false);
        this.setCharSize({ width: 1, height: 1 });
        if (align !== Printer_1.Align.Left) {
            this.alignment = Printer_1.Align.Left;
        }
    }
    writeln(text, styles, align) {
        if (align !== Printer_1.Align.Left) {
            this.alignment = align;
        }
        if (text.length > 0) {
            this.write(text, styles);
        }
        this.feed(1);
        if (align !== Printer_1.Align.Left) {
            this.alignment = Printer_1.Align.Left;
        }
    }
    get bitmapCmd() {
        return '\x1B*!';
    }
    draw(image) {
        const low = String.fromCharCode(image.width & 0xff);
        const high = String.fromCharCode((image.width >> 8) & 0xff);
        this.connection.write(Buffer.from('\x1B3\x10', 'ascii'));
        for (let y = 0; y < image.lines; y++) {
            const data = image.lineData(y);
            this.connection.write(Buffer.from(this.bitmapCmd + low + high, 'ascii'));
            this.connection.write(data);
            this.connection.write(Buffer.from('\x1BJ\x00', 'ascii'));
        }
        this.connection.write(Buffer.from('\x1B2', 'ascii'));
    }
    drawQrcode(data, size) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const buffer = yield QRCode.toBuffer(data, { scale: size });
            const image = new Image_1.default(buffer, new filter_1.Threshold());
            this.draw(image);
        });
    }
    get connection() {
        if (this._connection) {
            return this._connection;
        }
        throw new Error('Connection must be set before priting');
    }
    set connection(value) {
        this._connection = value;
    }
    get name() {
        return this.capabilities.brand + ' ' + this.capabilities.model;
    }
    get columns() {
        return this._columns;
    }
    set columns(value) {
        const font = this.fonts.find(({ columns }) => columns >= value);
        this.font = font || this.fonts.slice(-1)[0];
        this._columns = this.font.columns >= value ? value : this.font.columns;
    }
    get defaultColumns() {
        return this.capabilities.columns;
    }
    set font(value) {
        const old = this._font;
        this._font = value;
        if (old && old.name != value.name) {
            this.fontChanged(value, old);
            this.applyCodePage();
        }
    }
    get font() {
        return this._font;
    }
    get fonts() {
        return this.capabilities.fonts;
    }
    set codepage(value) {
        const old = this._codepage;
        const codepage = this.capabilities.codepages.find(({ code }) => value == code);
        if (codepage === undefined) {
            throw new Error(`Unsupported codepage "${value}"`);
        }
        this._codepage = codepage;
        if (old && old.code != codepage.code) {
            this.applyCodePage();
        }
    }
    applyCodePage() {
        this.connection.write(Buffer.from(this._codepage.command, 'ascii'));
    }
    fontChanged(_, __) { }
    initialize() {
        if (this.capabilities.initialize) {
            this.connection.write(Buffer.from(this.capabilities.initialize, 'ascii'));
        }
        this.applyCodePage();
    }
    finalize() {
        this.connection.close();
    }
}
exports.Profile = Profile;
//# sourceMappingURL=index.js.map