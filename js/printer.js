
const escpos = require('escpos')
escpos.USB = require('escpos-usb')
const config = require('./config')
const PDF417 = require("pdf417-generator")
const moment = require('moment');
const utilities = require('./utilities')
const deliveries = require('../js/promises/deliveries')
const order_promises = require('../js/promises/orders')


// POS58 Printer USB:
//   ID del producto:	0x5011   20497
//   ID del fabricante:	0x0416  1046

// XPRINTER
// "vendor": 8137, 
// "product": 8214,

//XPRINTER-NO-ETH
// "vendor":  1155
// "product": 22339

function print_close_cash_register_report(balance, sales_total, incomes_total, outs_total, open_amount) {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')

            printer.text('------------------------')
            printer.text('REPORTE')
            printer.text('CIERRE DE CAJA')
            printer.text('------------------------')
            printer.style('NORMAL')

            printer.text('')
            let open_amount_line = 'Monto de apertura: ' + utilities.render_money_string(open_amount)
            printer.text(open_amount_line)
            let sales_line = 'Total de ventas: ' + utilities.render_money_string(sales_total)
            printer.text(sales_line)
            let incomes_line = 'Total ingresos: ' + utilities.render_money_string(incomes_total)
            printer.text(incomes_line)
            let outs_line = 'Total egresos: ' + utilities.render_money_string(outs_total)
            printer.text(outs_line)
            printer.text('------------------------')
            let balance_line = 'BALANCE' + utilities.render_money_string(balance)
            printer.text(balance_line)
            printer.text('------------------------')
            printer.style('NORMAL')
            printer.text('')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cashdraw()
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        throw "Error de conexión con la impresora."
    }
}




function print_ticket(cart, total) {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text(config.fantasia)
            printer.text('------------------------')
            printer.style('NORMAL')
            printer.text(config.razon)
            printer.text(config.rut)
            printer.text(config.direccion)
            printer.text(config.telefono)
            printer.text('')


            printer.style('B')
            //printer.tableCustom([{text:'Producto', align:"LEFT", width:0.48},
            printer.tableCustom([{ text: 'Producto', align: "LEFT", width: 0.8 },
            { text: '#', align: "LEFT", width: 0.1 },
            { text: 'Subtotal', align: "LEFT", width: 0.2 }])
            // printer.style('NORMAL')
            // cart.forEach(item => {
            //     printer.tableCustom([{text:item.name, align:"LEFT", width:0.8},
            //                         {text:item.quanty, align:"LEFT", width:0.2},
            //                     {text:utilities.render_money_string(item.subtotal), align:"LEFT", width:0.3}])
            // })
            printer.style('NORMAL')
            cart.forEach(item => {
                let name = item.name
                // if (name.length >= 17){
                //     name = name.substring(0, 17)
                // }
                if (name.length >= 32) {
                    name = name.substring(0, 32)
                }
                //printer.tableCustom([{text:name, align:"LEFT", width:0.48},
                printer.tableCustom([{ text: name, align: "LEFT", width: 0.8 },
                { text: item.quanty, align: "LEFT", width: 0.1 },
                { text: utilities.render_money_string(item.subtotal), align: "LEFT", width: 0.2 }])
            })

            //printer.style('B')
            printer.text('------------------------')
            let total_line = 'TOTAL ' + utilities.render_money_string(total)
            printer.text(total_line)
            printer.text('------------------------')
            printer.style('NORMAL')
            printer.text('')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cashdraw()
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        throw "Error de conexión con la impresora."
    }

}

function print_boleta(timbre_srt, iva, cart, total, folio) {


    var canvas = document.createElement('canvas')
    //console.log(total)

    PDF417.draw(timbre_srt, canvas, 0, -1, 0)
    let timbre_img = canvas.toDataURL('image/jpg');

    let device = new escpos.USB(config.vendor, config.product)
    let printer = new escpos.Printer(device)

    escpos.Image.load(timbre_img, function (image) {
        device.open(function () {


            printer.font('A')
            //printer.encode('utf8')
            printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text(config.fantasia)
            printer.text('------------------------')
            printer.style('NORMAL')
            printer.text(config.razon)
            printer.text(config.rut)
            printer.text(config.direccion)
            printer.text(config.telefono)
            printer.text('')
            let folio_line = 'Boleta electronica Nro. ' + folio
            printer.text(folio_line)
            printer.text('')

            printer.style('B')
            //printer.tableCustom([{text:'Producto', align:"LEFT", width:0.48},
            printer.tableCustom([{ text: 'Producto', align: "LEFT", width: 0.8 },
            { text: '#', align: "LEFT", width: 0.1 },
            { text: 'Subtotal', align: "LEFT", width: 0.2 }])
            printer.style('NORMAL')

            cart.forEach(item => {
                let name = item.name
                // if (name.length >= 17){
                //     name = name.substring(0, 17)
                // }
                if (name.length >= 32) {
                    name = name.substring(0, 32)
                }
                //printer.tableCustom([{text:name, align:"LEFT", width:0.48},
                printer.tableCustom([{ text: name, align: "LEFT", width: 0.8 },
                { text: item.quanty, align: "LEFT", width: 0.1 },
                { text: utilities.render_money_string(item.subtotal), align: "LEFT", width: 0.2 }])
            })

            printer.text('------------------------')
            let total_line = 'TOTAL ' + utilities.render_money_string(total)
            printer.text(total_line)
            printer.text('------------------------')
            printer.text('')


            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)

            let iva_line = 'El iva de esta boleta es: $' + iva
            printer.text(iva_line)
            printer.image(image, 's8')
                .then(() => {
                    printer.text('Timbre Electronico SII')
                    printer.text('Res. Nro 80 de 2014-08-22')
                    printer.text('Verifique Documento en')
                    printer.text('www.lioren.cl/consultabe')
                    printer.cashdraw()
                    printer.cut()
                    printer.close()
                })

        })

    })

}

function print_quote(cart, total) {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {

            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text(config.fantasia)
            printer.text('------------------------')
            printer.style('NORMAL')
            printer.text(config.razon)
            printer.text(config.rut)
            printer.text(config.direccion)
            printer.text(config.telefono)
            printer.text('------------------------')
            printer.text('COTIZACION')
            printer.text('------------------------')


            printer.style('B')
            //printer.tableCustom([{text:'Producto', align:"LEFT", width:0.48},
            printer.tableCustom([{ text: 'Producto', align: "LEFT", width: 0.8 },
            { text: '#', align: "LEFT", width: 0.1 },
            { text: 'Subtotal', align: "LEFT", width: 0.2 }])
            // printer.style('NORMAL')
            // cart.forEach(item => {
            //     printer.tableCustom([{text:item.name, align:"LEFT", width:0.8},
            //                         {text:item.quanty, align:"LEFT", width:0.2},
            //                     {text:utilities.render_money_string(item.subtotal), align:"LEFT", width:0.3}])
            // })
            printer.style('NORMAL')
            cart.forEach(item => {
                let name = item.name
                // if (name.length >= 17){
                //     name = name.substring(0, 17)
                // }
                if (name.length >= 32) {
                    name = name.substring(0, 32)
                }
                //printer.tableCustom([{text:name, align:"LEFT", width:0.48},
                printer.tableCustom([{ text: name, align: "LEFT", width: 0.8 },
                { text: item.quanty, align: "LEFT", width: 0.1 },
                { text: utilities.render_money_string(item.subtotal), align: "LEFT", width: 0.2 }])
            })

            //printer.style('B')
            printer.text('------------------------')
            let total_line = 'TOTAL COTIZACION ' + utilities.render_money_string(total)
            printer.text(total_line)
            printer.text('------------------------')
            printer.style('NORMAL')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        throw "Error de conexión con la impresora."
    }

}

function print_sales_report(list, total) {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text('REPORTE')
            printer.text('VENTAS DEL MES')
            printer.text('------------------------')
            printer.style('NORMAL')

            printer.style('B')
            //printer.tableCustom([{text:'Producto', align:"LEFT", width:0.48},
            printer.tableCustom([{ text: 'Fecha', align: "LEFT", width: 0.4 },
            { text: 'Total', align: "LEFT", width: 0.3 }])
            // printer.style('NORMAL')
            // cart.forEach(item => {
            //     printer.tableCustom([{text:item.name, align:"LEFT", width:0.8},
            //                         {text:item.quanty, align:"LEFT", width:0.2},
            //                     {text:utilities.render_money_string(item.subtotal), align:"LEFT", width:0.3}])
            // })
            printer.style('NORMAL')
            list.forEach(item => {

                //printer.tableCustom([{text:name, align:"LEFT", width:0.48},
                printer.tableCustom([{ text: item.date, align: "LEFT", width: 0.4 },
                { text: utilities.render_money_string(item.total_amount), align: "LEFT", width: 0.3 }])
            })

            //printer.style('B')
            let total_line = 'Total del mes ' + utilities.render_money_string(total)
            printer.text('--------------------------')
            printer.text(total_line)
            printer.text('--------------------------')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        throw "Error de conexión con la impresora."
    }

}

function print_grid_report(list, total, start, end, category) {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text('REPORTE')
            printer.text('DETALLE DE VENTA')
            printer.text('------------------------')
            printer.style('NORMAL')
            printer.text('------------------------')
            let start_line = 'Fecha inicio: ' + start
            let end_line = 'Fecha final: ' + end
            let category_line = 'Categoria: ' + category
            printer.text(start_line)
            printer.text(end_line)
            printer.text(category_line)
            printer.text('------------------------')

            printer.style('B')
            //printer.tableCustom([{text:'Producto', align:"LEFT", width:0.48},
            printer.tableCustom([
                { text: 'Producto', align: "LEFT", width: 0.55 },
                { text: 'Fecha', align: "LEFT", width: 0.28 },
                { text: 'Subtotal', align: "LEFT", width: 0.22 },
                { text: '', align: "LEFT", width: 0.05 }
            ])

            printer.style('NORMAL')
            list.forEach(item => {
                let name = item[0]
                // if (name.length >= 17){
                //     name = name.substring(0, 17)
                // }
                if (name.length >= 22) {
                    name = name.substring(0, 22)
                }
                printer.tableCustom([
                    { text: name, align: "LEFT", width: 0.55 },
                    { text: item[1], align: "LEFT", width: 0.28 },
                    { text: item[2], align: "LEFT", width: 0.22 },
                    { text: item[3], align: "LEFT", width: 0.05 }
                ])
            })

            //printer.style('B')
            let total_line = 'Total detalle ' + utilities.render_money_string(total)
            printer.text('--------------------------')
            printer.text(total_line)
            printer.text('--------------------------')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        throw "Error de conexión con la impresora."
    }

}

function print_test_conn() {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        //let printer = new escpos.Printer(device)
        device.open()
        device.close()
    } catch (e) {
        return 'err'
    }
}

function open_cashdraw() {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.cashdraw()
            printer.close()

        })
    } catch (e) {
        throw "Error de conexión con la impresora."
    }
}

function barcode() {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.barcode('1234567', 'CODE39')

        })
    } catch (e) {
        console.log(e);
        return e
    }
}

function print_order_(order, order_id) {
    // var devices = escpos.USB.findPrinter();

    // devices.forEach(function(el) { 
    //     let device = new escpos.USB(el)
    //     const printer = new escpos.Printer(device);
    //     device.open(function(){
    //         printer
    //         .font('a')
    //         .align('ct')
    //         .style('bu')
    //         .size(1, 1)
    //         .text('The quick brown fox jumps over the lazy dog')
    //         .cut()
    //         .close()
    //     });
    // })
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text(config.second_ticke_title + ': ' + order_id)
            printer.text('------------------------')
            printer.text('')

            printer.style('B')
            printer.tableCustom([
                { text: '#', align: "LEFT", width: 0.1 },
                { text: 'Producto', align: "LEFT", width: 0.8 },
            ])
            printer.style('NORMAL')
            order.forEach(item => {
                let name = item.Product.name
                if (name.length >= 32) {
                    name = name.substring(0, 32)
                }
                printer.tableCustom([
                    { text: item.quanty, align: "LEFT", width: 0.1 },
                    { text: name, align: "LEFT", width: 0.8 },
                ])
            })


            printer.text('------------------------')
            printer.style('NORMAL')
            if (config.second_ticket_barcode == true) {
                printer.barcode(order_id, 'CODE39')
            }

            printer.text('')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        utilities.show_alert('Error de conexión con la impresora 1.', 'err')
        throw "Error de conexión con la impresora."
    }

}

function print_delivery_order(order, order_id, phone, address, transfer) {
    let transfer_str = ''
    if (transfer == true) {
        transfer_str = 'SI'
    } else {
        transfer_str = 'NO'
    }
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text(config.second_ticke_title + ': ' + order_id)
            printer.text('------------------------')
            printer.text('')

            printer.style('B')
            printer.tableCustom([
                { text: '#', align: "LEFT", width: 0.1 },
                { text: 'Producto', align: "LEFT", width: 0.8 },
            ])
            printer.style('NORMAL')
            order.forEach(item => {
                let name = item.Product.name
                if (name.length >= 32) {
                    name = name.substring(0, 32)
                }
                printer.tableCustom([
                    { text: item.quanty, align: "LEFT", width: 0.1 },
                    { text: name, align: "LEFT", width: 0.8 },
                ])
            })


            printer.text('------------------------')
            printer.style('NORMAL')
            if (config.second_ticket_barcode == true) {
                printer.barcode(order_id, 'CODE39')
            }
            printer.text('------------------------')
            printer.text('DELIVERY')
            printer.text('Telefono: ' + phone)
            printer.text('Direccion: ' + address)
            printer.text('Transferencia: ' + transfer_str)
            printer.text('------------------------')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        utilities.show_alert('Error de conexión con la impresora 1.', 'err')
        throw "Error de conexión con la impresora."
    }


}


function print_order(order, order_id) {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {
            printer.font('A')
            printer.encode('utf8')
            //printer.encode('EUC-KR')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text(config.second_ticke_title + ': ' + order_id)
            printer.text('------------------------')
            printer.text('')

            printer.style('B')
            printer.tableCustom([
                { text: '#', align: "LEFT", width: 0.1 },
                { text: 'Producto', align: "LEFT", width: 0.8 },
            ])
            printer.style('NORMAL')
            order.forEach(item => {
                let name = item.Product.name
                if (name.length >= 32) {
                    name = name.substring(0, 32)
                }
                printer.tableCustom([
                    { text: item.quanty, align: "LEFT", width: 0.1 },
                    { text: name, align: "LEFT", width: 0.8 },
                ])
            })


            printer.text('------------------------')
            printer.style('NORMAL')
            if (config.second_ticket_barcode == true) {
                printer.barcode(order_id, 'CODE39')
            }

            printer.text('')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cut()
            //printer.flush()
            printer.close()

        })
    } catch (e) {
        utilities.show_alert('Error de conexión con la impresora 1.', 'err')
        throw "Error de conexión con la impresora."
    }


}

function identity() {
    return 1
}

function print_test() {
    try {
        let device = new escpos.USB(config.vendor, config.product)
        let printer = new escpos.Printer(device)
        device.open(function (error) {

            printer.font('A')
            printer.encode('utf8')
            printer.size(0, 0)
            printer.align('CT')
            printer.style('B')

            printer.text('------------------------')
            printer.text(config.fantasia)
            printer.text('------------------------')
            printer.style('NORMAL')
            printer.text(config.razon)
            printer.text(config.rut)
            printer.text(config.direccion)
            printer.text(config.telefono)
            printer.text('------------------------')
            printer.text('COTIZACION')
            printer.text('------------------------')



            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.cut()
            printer.close()

        })
    } catch (e) {
        throw "Error de conexión con la impresora."
    }

}



module.exports = {
    print_ticket,
    print_boleta,
    print_quote,
    print_test_conn,
    print_sales_report,
    print_close_cash_register_report,
    print_grid_report,
    open_cashdraw,
    barcode,
    print_order,
    identity,
    print_test,
    print_delivery_order
}










// 0: Device
// busNumber: 20
// deviceAddress: 31
// deviceDescriptor:
// bDescriptorType: 1
// bDeviceClass: 0
// bDeviceProtocol: 0
// bDeviceSubClass: 0
// bLength: 18
// bMaxPacketSize0: 64
// bNumConfigurations: 1
// bcdDevice: 256
// bcdUSB: 512
// iManufacturer: 1
// iProduct: 2
// iSerialNumber: 3
// idProduct: 22339
// idVendor: 1155

// 0: Device
// busNumber: 20
// deviceAddress: 2
// deviceDescriptor:
// bDescriptorType: 1
// bDeviceClass: 0
// bDeviceProtocol: 0
// bDeviceSubClass: 0
// bLength: 18
// bMaxPacketSize0: 64
// bNumConfigurations: 1
// bcdDevice: 256
// bcdUSB: 512
// iManufacturer: 1
// iProduct: 2
// iSerialNumber: 3
// idProduct: 22339
// idVendor: 1155
