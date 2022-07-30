const escpos = require('escpos')
escpos.USB = require('escpos-usb')
const config = require('./config')
const PDF417 = require("pdf417-generator")
const moment = require('moment');
const utilities = require('./utilities')



// POS58 Printer USB:
//   ID del producto:	0x5011   20497
//   ID del fabricante:	0x0416  1046

// XPRINTER
// "vendor": 8137, 
// "product": 8214,

//XPRINTER-NO-ETH
// "vendor":  1155
// "product": 22339


function print_order(order, order_id, note){
    try {
        let device  = new escpos.USB(config.vendor_2, config.product_2)
        let printer = new escpos.Printer(device)
        device.open(function(error){
            printer.font('A')
            //printer.encode('utf8')
            printer.encode('EUC-KR')
            printer.size(0,0)
            printer.align('CT')
            printer.style('B')
            
            printer.text('------------------------')
            printer.text(config.second_ticke_title +': ' + order_id)
            printer.text('------------------------')
            printer.text('')

            printer.style('B')
            printer.tableCustom([
                {text:'#', align:"LEFT", width:0.1},
                {text:'Producto', align:"LEFT", width:0.8},
                ])
            printer.style('NORMAL')
            order.forEach(item => {
                let name = item.Product.name
                if (name.length >= 32){
                    name = name.substring(0, 32)
                }
                printer.tableCustom([
                    {text:item.quanty, align:"LEFT", width:0.1},
                    {text:name, align:"LEFT", width:0.8},       
                ])
            })
            printer.text('------------------------')
            printer.text('NOTA')
            printer.text(note)
            printer.text('------------------------')
            printer.text('')

            var today = new Date();
            let date = moment(today).format('DD-MM-yyyy')
            let time = moment(today).format('HH:mm:ss')
            let date_line = 'fecha: ' + date + ' hora: ' + time
            printer.text(date_line)
            printer.text('')
            printer.style('B')
            printer.text('------------------------')
            printer.text(config.second_ticke_title +': ' + order_id)
            printer.text('------------------------')
            printer.text('')
            printer.cut()
            printer.close()
            
        })
    } catch (e) {
        utilities.show_alert('Error de conexión con la impresora 2.', 'err')
        throw "Error de conexión con la impresora."
    }

}

function print_test_conn(){
    try {
        let device  = new escpos.USB(config.vendor, config.product)
        //let printer = new escpos.Printer(device)
        device.open()
        device.close()
    } catch (e){
        return 'err'
    }
}

function identity(){
    return 2
}

module.exports = {print_order, print_test_conn,identity}