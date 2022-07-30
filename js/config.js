const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../config.json')
const rawdata = fs.readFileSync(filePath)
const config = JSON.parse(rawdata);


const user_name = config.user_name
const password = config.password
const database = config.database
const host = config.host
const dialect = config.dialect
const port = config.port
const locale = config.locale
const lioren_token = config.lioren_token

const fantasia = config.fantasia
const razon = config.razon
const rut = config.rut
const direccion = config.direccion
const telefono = config.telefono

const vendor = config.vendor
const product = config.product

const product_finder = config.product_finder
const external_payment = config.external_payment
const cash_register = config.cash_register
const number_keyboard = config.number_keyboard
const quote = config.quote
const products_buttons = config.products_buttons
const small_shopping_cart = config.small_shopping_cart
const edit_quanty_button = config.edit_quanty_button
const litle_finder = config.litle_finder

const shopping_cart = config.shopping_cart
const shoppingcart_loader = config.shoppingcart_loader

const vendor_2 = config.vendor_2
const product_2 = config.product_2

const second_ticket = config.second_ticket
const second_ticket_printer = config.second_ticket_printer
const second_ticket_barcode = config.second_ticket_barcode
const second_ticke_title = config.second_ticke_title

const select_table = config.select_table





module.exports = {
    user_name,
    password,
    database,
    host,
    dialect,
    port, 
    fantasia,
    locale,
    lioren_token,
    razon,
    rut,
    direccion,
    telefono,
    vendor,
    product,
    product_finder,
    external_payment,
    cash_register,
    number_keyboard,
    quote,
    products_buttons,
    small_shopping_cart,
    edit_quanty_button,
    litle_finder,
    shopping_cart,
    shoppingcart_loader,
    vendor_2,
    product_2,
    second_ticket,
    second_ticket_printer,
    second_ticket_barcode,
    second_ticke_title,
    select_table
}