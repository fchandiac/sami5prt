import Epson from './Epson';
import { Style } from '../Printer';
import { Font } from '../capabilities';
export default class ControliD extends Epson {
    protected setStyle(style: Style, enable: boolean): void;
    qrcode(data: string, size: number): Promise<void>;
    initialize(): void;
    protected fontChanged(current: Font, previows: Font): void;
}
