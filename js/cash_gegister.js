const products = require('./promises/products')
const utilities = require('./utilities')
const sales = require('./promises/sales')
const sales_detail = require('./promises/sales_detail')
const products_promise = require('./promises/products')
const orders_promises = require('./promises/orders')
const movements = require('./movements')
const printer = require('./printer')
const second_printer = require('./second_printer')
const sii = require('./sii')
const lioren = require('./promises/lioren')
const product_finder = require('./grids/products_finder')
const config = require('./config')
const stock = require('./stocks')
const duplicate_code_grid = require('./grids/duplicate_code_grid')

const cash_register_cart_grid = require('./grids/cash_register_cart')
// const { Config } = require('gridjs')
const btn_product_container = document.getElementById('btn_product_container')
const cash_resgister_tab_btn = document.getElementById('cash_resgister_tab_btn')
const pay_btn = document.getElementById('pay_btn')
const body_process_pay_modal = document.getElementById('body_process_pay_modal')
const pay_amount_input = document.getElementById('pay_amount_input')
const total_label = document.getElementById('total_label')
const total_pay_modal_label = document.getElementById('total_pay_modal_label')
const process_sale_btn = document.getElementById('process_sale_btn')
const process_pay_form = document.getElementById('process_pay_form')
const cash_payment_option = document.getElementById('cash_payment_option')
const debit_payment_option = document.getElementById('debit_payment_option')
const credit_payment_option = document.getElementById('credit_payment_option')
const total_resume_sale_modal_label = document.getElementById('total_resume_sale_modal_label')
const change_rseume_sale_modal_label = document.getElementById('change_rseume_sale_modal_label')
const cash_register_code_input = document.getElementById('cash_register_code_input')
const add_to_cart_from_code_btn = document.getElementById('add_to_cart_from_code_btn')
const quote_btn = document.getElementById('quote_btn')
const boleta_radio = document.getElementById('boleta_radio')
const search_btn = document.getElementById('search_btn')
const container_finders_01 = document.getElementById('container_finders_01')
const codigo_label = document.getElementById('codigo_label')
const order_to_close_container = document.getElementById('order_to_close_container')
const orders_tab_btn = document.getElementById('orders_tab_btn')
const orders_body = document.getElementById('orders_body')
const config_mail_lioren_input = document.getElementById('config_mail_lioren_input')



// 

//const duplicate_code_modal = document.getElementById('duplicate_code_modal')
const order_btn = document.getElementById('order_btn')
const order_id_input = document.getElementById('order_id_input')
const add_order_btn = document.getElementById('add_order_btn')


var cart = []
var orders_to_close = []
var pay_amount = 0
var total = 0
var payment_method = ''
var counter_buttons = 0

var litle_finder = config.litle_finder



//--------- FOR SEARCH -----------//
var data_for_search = []
var counter = 0
var sugestions = []
const input = document.getElementById('search_input')
const ul = document.getElementById('search_ul')
const search_form = document.getElementById('search_form')
//--------- FOR SEARCH AND SHOPPING CART -----------//

if (litle_finder == false && config.shoppingcart_loader == false) {
    container_finders_01.classList.remove('conten-col-50-50')
    codigo_label.classList.remove('col-sm-3')
    codigo_label.classList.add('col-sm-2')
}
// cambianr shoppingcart loader por order_loader

if (litle_finder == false) {
    search_form.classList.add('collapse')

}

if (config.shoppingcart_loader == false) {
    shoppingcart_loader_form.classList.add('collapse')
    // container_finders_01.classList.remove('conten-col-50-50')
    // codigo_label.classList.remove('col-sm-3')
    // codigo_label.classList.add('col-sm-2')
} else {
    search_form.classList.remove('mrgn-left')
}


//--------- ON LOAD -----------//
document.addEventListener("DOMContentLoaded", function () {
    load_products_btns()
    cash_register_cart_grid.render(cart)
    product_finder.render(cart)


    $('#resume_sale_modal').on('hidden.bs.modal', function (e) {
        cart = []
        total = 0
        cash_register_cart_grid.render(cart)
        product_finder.render(cart)
        total_label.dispatchEvent(new Event('input'))// renderiza el monto total en el label
        cash_register_code_input.focus()
    })

    test_web()

    // if (navigator.onLine) {
    //     boleta_radio.disabled = false
    // } else {
    //     boleta_radio.disabled = true
    //     utilities.show_alert('Se perdio la conexión a internet. Si desea funcionar con Boleta reconecte y reinicie la App.', 'err')
    // }

    lioren.lioren_authorization_test()
        .then(res => {
            // console.log(res)
            boleta_radio.disabled = false
            config_mail_lioren_input.value = res.email
        })
        .catch(err => {
            config_mail_lioren_input.value = 'Mail no recuperado.'
            boleta_radio.disabled = true
        })

    products.find_all().then(res => {
        res.forEach(item => {
            data_for_search.push(item.name)
        })
    })
})

restart_input_pay_amount()
total_label.innerText = utilities.render_money_string(total)

total_label.addEventListener('input', () => {
    total = 0
    if (cart.length == 0) {
        total_label.innerText = utilities.render_money_string(total)
    } else {
        cart.forEach(item => {
            total = total + item.subtotal
            total_label.innerText = utilities.render_money_string(total)
        })
    }
})

add_to_cart_from_code_btn.addEventListener('click', () => {
    products_promise.find_all_by_code(cash_register_code_input.value)
        .then(res => {
            if (res.length == 0) {
                utilities.show_alert('Producto no encontrado.', 'err')
            } else if (res.length == 1) {
                let price = res[0].Price.sale
                let quanty = 1
                let subtotal = quanty * price
                let tax_id = res[0].Price.tax_id
                add_item_to_cart(res[0].id, res[0].name, price, quanty, subtotal, tax_id)
                cash_register_code_input.focus()
                cash_register_code_input.value = ''
            } else if (res.length > 1) {

                duplicate_code_grid.render(cart, res)
                $('#duplicate_code_modal').modal('show')
            }
        })
})


//--------- LISTENERS -----------//
pay_amount_input.addEventListener('input', () => {
    pay_amount_input.value = utilities.render_money_string(pay_amount_input.value)
    if (pay_amount_input.value == '$' || pay_amount_input.value == '$ ' || pay_amount_input.value == '') {
        pay_amount_input.value = '$ 0'
        pay_amount_input.value = ''
    }
    let pay_amount_out = utilities.input_money_to_int(pay_amount_input.value)
    pay_amount = pay_amount_out
})






//--------- NUMBER KEYBOARD -----------//
const number_keyboard = new utilities.NumberKeyboard('pay_amount_input')
if (config.number_keyboard == true) {
    number_keyboard.render(body_process_pay_modal)
}



//--------- BUTTONS -----------//
quote_btn.addEventListener('click', () => {

    if (printer.print_test_conn() == 'err') {
        utilities.show_alert('Error de conexión con la impresora.', 'err')
    } else {
        if (cart.length == 0) {
            utilities.show_alert('El carro de compras esta vacio.', 'err')
        } else {
            printer.print_quote(cart, total)
            cart = []
            total = 0
            cash_register_cart_grid.render(cart)
            product_finder.render(cart)
            total_label.dispatchEvent(new Event('input'))
            cash_register_code_input.focus()
        }
    }
})

cash_resgister_tab_btn.addEventListener('click', () => {
    open_cash_register()
    set_active_body(cash_register_body)
    set_non_active_body(movements_body)
    set_non_active_body(products_body)
    set_non_active_body(sales_body)
    set_non_active_body(stocks_body)
    set_non_active_body(config_body)
    set_non_active_body(orders_body)



    set_active_tab(cash_resgister_tab_btn)
    set_non_active_tab(movements_tab_btn)
    set_non_active_tab(sales_tab_btn)
    set_non_active_tab(stocks_tab_btn)
    set_non_active_tab(products_tab_btn)
    set_non_active_tab(config_tab_btn)
    set_non_active_tab(orders_tab_btn)

    cash_register_code_input.focus()
    cash_register_tab_open = true
    finder_products_grid.render(cart)

    load_products_btns()

    data_for_search = []
    products.find_all().then(res => {
        res.forEach(item => {
            data_for_search.push(item.name)
        })
        //console.log(data_for_search)
    })
})

// cash_resgister_tab_btn.addEventListener('click', () => {


// })

pay_btn.addEventListener('click', () => {
    console.log(orders_to_close)
    //test_web()
    let print_document_type = document.querySelector("input[name=ticket_option]:checked").value
    if (print_document_type != 2) {
        if (printer.print_test_conn() == 'err') {
            utilities.show_alert('Error de conexión con la impresora.', 'err')
        } else {
            if (cart.length == 0) {
                utilities.show_alert('El carro de compras esta vacio.', 'err')
            } else {
                if (print_document_type == 1) {
                    if (navigator.onLine) {
                        boleta_radio.disabled = false
                        on_press_pay_btn()
                    } else {
                        boleta_radio.disabled = true
                        utilities.show_alert('Se perdio la conexión a internet.', 'err')
                    }
                } else {
                    on_press_pay_btn()
                }
            }
        }
    } else {
        on_press_pay_btn()
    }

})

process_sale_btn.addEventListener('click', () => {
    pay_amount = utilities.input_money_to_int(pay_amount_input.value)
    if (cash_payment_option.checked == true) {
        payment_method = 'Efectivo'
    } else if (debit_payment_option.checked == true) {
        payment_method = 'Debito'
    } else if (credit_payment_option.checked == true) {
        payment_method = 'Transferencia'
    }
    if (process_pay_form.checkValidity()) {
        if (test_change() === true) {
            sales.create(total, payment_method).then(res => {
                restart_input_pay_amount()
                cart.forEach(product => {
                    products_promise.find_one_by_id(product.id).then(prod => {
                        sales_detail.create(res.id, prod.PriceId, product.id, prod.CategoryId, product.quanty, product.subtotal)
                            .catch(err => { console.log(err) })

                        stock.subtract_stock(product.id, product.quanty) // Descuenta el stock
                    })
                        .catch(err => { console.log(err) })
                })
                create_order_and_close()
                // Guarda la venta como movimiento de caja
                movements.add_movement('Venta ' + res.id, 1, total, (movements.calc_balance() + total), res.id)
                
                close_orders()
                order_to_close_container.innerHTML = ''
                print_document(cart)

                

                $('#process_pay_modal').fadeOut('fast')
                setTimeout(close_sale, 500)
                

            }).catch(err => console.log(err))

        } else {
            utilities.show_alert('El monto de pago es insufuciente.', 'err')
        }
    }
})

order_btn.addEventListener('click', () => {
    console.log(orders_to_close)
    if (cart.length == 0) {
        utilities.show_alert('Debe cargar productos.', 'err')
    } else {
        if (config.select_table == true) {
            $("#select_table_modal").modal('show')
        } else {
            create_order()
        }
    }

})

search_btn.addEventListener('click', () => {
    if (search_form.checkValidity()) {
        products.find_one_by_name(input.value).then(product => {

            if (product == null) {
                input.value = ''
                ul.innerHTML = ''
                counter = 0
                utilities.show_alert('Producto no econtrado', 'err')
            }
            else {
                let id = product.id
                let name = product.name
                let price = product.Price.sale
                let quanty = 1
                let subtotal = quanty * price
                let tax_id = product.Price.tax_id
                add_item_to_cart(id, name, price, quanty, subtotal, tax_id)
                input.value = ''
                ul.innerHTML = ''
                counter = 0
            }
        })
    }
})

// add order_btn
add_order_btn.addEventListener('click', () => {
    let orders_filter = orders_to_close.filter(x => x == parseInt(order_id_input.value))
    if (orders_filter.length != 0) {
        utilities.show_alert('Pedido ya fue cargado.', 'err')
        order_id_input.value = ''
        order_id_input.focus()
    } else {
        orders_promises.find_one_by_id(parseInt(order_id_input.value))
            .then(order => {
                if (order == null) {
                    utilities.show_alert('El pedido no existe.', 'err')
                    order_id_input.value = ''
                    order_id_input.focus()
                } else if (order.state == 1) {
                    utilities.show_alert('El pedido esta cerrado.', 'err')
                    order_id_input.value = ''
                    order_id_input.focus()
                } else {
                    orders_promises.find_all_by_order(order.id)
                        .then(res => {
                            orders_to_close.push(order.id)
                            res.forEach(item => {
                                let id = item.Product.id
                                let name = item.Product.name
                                let price = item.Product.Price.sale
                                let quanty = item.quanty
                                let subtotal = quanty * price
                                let tax_id = item.Product.Price.tax_id
                                add_item_to_cart(id, name, price, quanty, subtotal, tax_id)
                                order_id_input.value = ''
                                order_id_input.focus()
                            })
                            order_to_close_container.innerHTML = ''
                            orders_to_close.forEach(item => {
                                let order_btn = document.createElement('button')
                                let inner_html = item + ' ' + '<i class="bi bi-trash-fill"></i>'
                                order_btn.innerHTML = inner_html
                                order_btn.id = item
                                order_btn.classList.add('btn')
                                order_btn.classList.add('btn-secondary')
                                order_btn.style.marginRight = '1rem'

                                order_btn.addEventListener('click', () => {
                                    order_btn.remove()
                                    on_delete_order(order_btn.id)
                                    // Funcion resta PEDIDO
                                })
                                order_to_close_container.appendChild(order_btn)
                            })

                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
})

//////////////TABLES 
const detail_order_note_table_input = document.getElementById('detail_order_note_table_input')
const table1 = document.getElementById('table1')
const order_note_input = document.getElementById('order_note_input')

const note_order_btn = document.getElementById('note_order_btn')
note_order_btn.addEventListener('click', () => {
    
    create_order(detail_order_note_table_input.value)
})

table1.addEventListener('click', () => {
    //create_order(1)
    detail_order_note_table_input.value = 1
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table2 = document.getElementById('table2')
table2.addEventListener('click', () => {
    //create_order(2)
    detail_order_note_table_input.value = 2
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table3 = document.getElementById('table3')
table3.addEventListener('click', () => {
   // create_order(3)
   detail_order_note_table_input.value = 3
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table4 = document.getElementById('table4')
table4.addEventListener('click', () => {
    //create_order(4)
    detail_order_note_table_input.value = 4
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table5 = document.getElementById('table5')
table5.addEventListener('click', () => {
    //create_order(5)
    detail_order_note_table_input.value = 5
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table6 = document.getElementById('table6')
table6.addEventListener('click', () => {
    //create_order(6)
    detail_order_note_table_input.value = 6
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table7 = document.getElementById('table7')
table7.addEventListener('click', () => {
    //create_order(7)
    detail_order_note_table_input.value = 7
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table8 = document.getElementById('table8')
table8.addEventListener('click', () => {
    //create_order(8)
    detail_order_note_table_input.value = 8
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})

const table9 = document.getElementById('table9')
table9.addEventListener('click', () => {
    //create_order(9)
    detail_order_note_table_input.value = 9
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})
const table10 = document.getElementById('table10')
table10.addEventListener('click', () => {
    //create_order(10)
    detail_order_note_table_input.value = 10
    $("#select_table_modal").modal('hide')
    $('#detail_order_note_modal').modal('show')
})


//--------- FUNCTIIONS -----------//

function on_delete_order(order_id) {
    //relaliza resta de productos compatibles en el carro
    // SOLUCIONAR ERRORES
    orders_to_close.filter(item => {
        if (item == order_id){
            orders_to_close.splice(orders_to_close.indexOf(item), 1)
        }
    })
    
    orders_promises.find_all_by_order(order_id)
        .then(order => {
            order.forEach(order_item => {
                cart.filter(cart_item => {
                    if(cart_item.id == order_item.product_id){
                        cart_item.quanty = cart_item.quanty - order_item.quanty
                        if (cart_item.quanty == 0){
                            cart.splice(cart.indexOf(cart_item), 1)
                        }
                    }
                })
            })

            //console.log(cart)
            

            
            console.log(orders_to_close)

            cash_register_cart_grid.render(cart)
            total_label.dispatchEvent(new Event('input'))

        })
        .catch(err => {
            console.log(err)
        })
}

function close_orders() {
    console.log(orders_to_close)
    if (orders_to_close.length != 0) {
        let promises_list = []
        orders_to_close.forEach(item => {
            promises_list.push(orders_promises.update_state(item, true)) 
        })
        console.log(promises_list)
        console.log(orders_to_close)

        Promise.all(promises_list)
            .then(() => {
                order_to_close_container.innerHTML = ''
                console.log(orders_to_close)
                console.log(orders_to_close)
                orders_to_close = []
                console.log('.....');
                console.log(orders_to_close);
            })
            .catch(err => {
                utilities.show_alert(err, 'err')
            })
    }
    console.log(orders_to_close)

}

function add_order_to_close(order_id){
    orders_to_close.push(order_id)
}

function remove_all_orders(){
    orders_to_close = []
}

function create_order(table) {
    if (cart.length == 0) {
        utilities.show_alert('Debe cargar productos.', 'err')
    } else {

        orders_promises.create(order_note_input.value).then(order => {
            let promises_list = []
            cart.forEach(item => {
                promises_list.push(orders_promises.create_detail(order.id, item.id, item.quanty))
            })

            Promise.all(promises_list).then(res => {

                orders_promises.update_table(order.id, table)
                    .then(res => {
                        cart = []
                        total = 0
                        order_note_input.value = ''
                        total_label.dispatchEvent(new Event('input'))
                        cash_register_cart_grid.render(cart)
                        product_finder.render(cart)
                        //PRINT PEDIDO
                        let print_document_type = document.querySelector("input[name=ticket_option]:checked").value
                        if (print_document_type != 2) { print_order_by_config(order.id) }
                        if (config.select_table == true) {
                            $('#detail_order_note_modal').modal('hide')
                            //$("#select_table_modal").modal('hide')
                        }
                    })
                    .catch(err => { console.log(err) })



            })
                .catch(err => { console.log })

        })
            .catch(err => {
                console.log(err)
            })
    }
}


////// DELIVERY SECCION
const delivery_form = document.getElementById('delivery_form')
const delivery_table_input = document.getElementById('delivery_table_input')
const delivery_transfer_switch = document.getElementById('delivery_transfer_switch')
const delivery_address_input = document.getElementById('delivery_address_input')
const delivery_phone_input = document.getElementById('delivery_phone_input')
const delivery_modal_btn = document.getElementById('delivery_modal_btn')
const d1_btn = document.getElementById('delivery1')
const d2_btn = document.getElementById('delivery2')
const d3_btn = document.getElementById('delivery3')
const d4_btn = document.getElementById('delivery4')
const d5_btn = document.getElementById('delivery5')
const d6_btn = document.getElementById('delivery6')
const d7_btn = document.getElementById('delivery7')
const d8_btn = document.getElementById('delivery8')
const d9_btn = document.getElementById('delivery9')
const d10_btn = document.getElementById('delivery10')

d1_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 11
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d2_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 12
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d3_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 13
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d4_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 14
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d5_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 15
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d6_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 16
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d7_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 17
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d8_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 18
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d9_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 19
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})

d10_btn.addEventListener('click', () => {
    reset_deliveries_inputs()
    delivery_table_input.value = 20
    $('#select_table_modal').modal('hide')
    $('#delivery_modal').modal('show')
})


const delivery_order_note_input = document.getElementById('delivery_order_note_input')
delivery_modal_btn.addEventListener('click', () => {

    if (delivery_form.checkValidity()) {
        create_delivery_order(
            delivery_table_input.value,
            delivery_phone_input.value,
            delivery_address_input.value,
            delivery_transfer_switch.checked
        )

    }


})

function reset_deliveries_inputs() {
    delivery_phone_input.value = ''
    delivery_address_input.value = ''
    delivery_transfer_switch.checked = false
}


const deliveries = require('../js/promises/deliveries')


function create_delivery_order(table, phone, address, transfer) {
    if (cart.length == 0) {
        utilities.show_alert('Debe cargar productos.', 'err')
    } else {

        orders_promises.create_delivery(delivery_order_note_input.value).then(order => {
            console.log(order)
            deliveries.create(order.id, phone, address, transfer)
            let promises_list = []
            cart.forEach(item => {
                promises_list.push(orders_promises.create_detail(order.id, item.id, item.quanty))
            })

            Promise.all(promises_list).then(res => {

                orders_promises.update_table(order.id, table)
                    .then(res => {
                        cart = []
                        total = 0
                        total_label.dispatchEvent(new Event('input'))
                        cash_register_cart_grid.render(cart)
                        product_finder.render(cart)
                        //PRINT PEDIDO
                        let print_document_type = document.querySelector("input[name=ticket_option]:checked").value
                        if (print_document_type != 2) { print_order_by_config(order.id) }
                        if (config.select_table == true) {
                            $("#select_table_modal").modal('hide')
                        }
                        $('#delivery_modal').modal('hide')
                        delivery_order_note_input.value = ''
                    })
                    .catch(err => { console.log(err) })



            })
                .catch(err => { console.log })

        })
            .catch(err => {
                console.log(err)
            })
    }
}


//////////////////

function print_order_by_config(order_id) {
    //let print_document_type = document.querySelector("input[name=ticket_option]:checked").value
    orders_promises.find_one_by_id(order_id).then(res => {
        if (config.second_ticket != false) {
            orders_promises.find_all_by_order(order_id)
                .then(order_detail => {
                    // let order_to_print = order_detail.filter(item => item.Product.ticket == true)
                    let order_to_print = order_detail.filter(item => item)
                    if (order_to_print.length >= 1) {
                        if (config.second_ticket_printer == 1) {
                            printer.print_order(order_to_print, order_id)
                        } else if (config.second_ticket_printer == 2) {
                            second_printer.print_order(order_to_print, order_id, res.note)
                        } else if (config.second_ticket_printer == 3) {
                            try {
                                if(res.delivery == true){
                                    let transfer = false
                                    if(delivery_transfer_switch.checked == true){
                                        transfer = true
                                    }
                                    printer.print_delivery_order(order_to_print, order_id, delivery_phone_input.value, delivery_address_input.value, transfer )
                                } else {
                                    printer.print_order(order_to_print, order_id)
                                }
                                
                            } catch {
                                second_printer.print_order(order_to_print, order_id, res.note)
                            } finally {
                                second_printer.print_order(order_to_print, order_id, res.note)
                            }
                        }
    
                    }
                })
                .catch(err => { console.log(err) })
        }

    }).catch(err => { console.log(err)})

    

}

function test_ok_printers_conn() {
    // Retorna impresoras sin error
    let printers_whit_out_error = []

    if (printer.print_test_conn() == 'err') {
        printers_whit_out_error.push(1)
    }

    if (second_printer.print_test_conn() == 'err') {
        printers_whit_out_error.push(2)
    }
    return printers_whit_out_error
}

function test_web() {
    if (navigator.onLine) {
        boleta_radio.disabled = false
        return true
    } else {
        boleta_radio.disabled = true
        utilities.show_alert('Se perdio la conexión a internet. Si desea funcionar con Boleta reconecte y reinicie la App.', 'err')
        return false
    }
}

function create_order_and_close() {
    if (orders_to_close.length == 0) {
        orders_promises.create()
            .then(order => {
                orders_promises.update_state(order.id, true)
                let promises_list = []
                cart.forEach(item => {
                    promises_list.push(orders_promises.create_detail(order.id, item.id, item.quanty))

                })
                Promise.all(promises_list)
                    .then(res => {
                        let print_document_type = document.querySelector("input[name=ticket_option]:checked").value
                        if (print_document_type != 2) { print_order_by_config(order.id) }
                    })
                    .catch(err => { console.log(err) })
            })
            .catch(err => { console.log(err) })
    }
}


function on_press_pay_btn() {
    number_keyboard.clear_string_out()
    total_pay_modal_label.innerText = utilities.render_money_string(total)
    $('#process_pay_modal').modal('show')
    if (cash_payment_option.checked == true) {
        pay_amount_input.focus()
        pay_amount_input.value = ""
    } else if (debit_payment_option.checked == true) {
        pay_amount_input.focus()
        pay_amount_input.value = total
    } else if (credit_payment_option.checked == true) {
        pay_amount_input.focus()
        pay_amount_input.value = total
    }
}

function print_document(cart_to_print) {
    let print_document_type = document.querySelector("input[name=ticket_option]:checked").value

    if (print_document_type == 0) {
        printer.print_ticket(cart_to_print, total)
    } else if (print_document_type == 1) {
        if (config.external_payment == true && payment_method == 'Efectivo') {
            print_boleta_document(cart_to_print)
        } else if (config.external_payment == true && payment_method == 'Débito') {
            printer.print_ticket(cart_to_print, total)
        } else if (config.external_payment == true && payment_method == 'Crédito') {
            printer.print_ticket(cart_to_print, total)
        } else if (config.external_payment == false) {
            print_boleta_document(cart_to_print)
        }
    }
}


function print_boleta_document(cart_to_print) {
    let cart_iva = []
    let total_iva = 0
    let cart_other = []
    let total_other = 0
    cart_to_print.forEach(item => {
        if (item.tax_id == 1001) {
            cart_iva.push(item)
            total_iva = total_iva + item.subtotal
        } else {
            cart_other.push(item)
            total_other = total_other + item.subtotal
        }
    })
    if (cart_other.length >= 1) {
        printer.print_ticket(cart_other, total_other)
    }
    if (cart_iva.length >= 1) {
        // let t = '<TED version="1.0"><DD><RE>78543570-2</RE><TD>39</TD><F>46617</F><FE>2021-12-31</FE><RR>66666666-6</RR><RSR>Publico General</RSR><MNT>200</MNT><IT1>Venta</IT1><CAF version="1.0"><DA><RE>78543570-2</RE><RS>TAPIA Y COFRE LIMITADA</RS><TD>39</TD><RNG><D>40101</D><H>50100</H></RNG><FA>2021-11-06</FA><RSAPK><M>vc0qoeRHgC93rnVSKqToPbveI8BqxtC2k0PmWwHfEcs9xXno/f/BD6+UWt+mwHLM/4Xj/n6OejS5iQaJrueRcw==</M><E>Aw==</E></RSAPK><IDK>300</IDK></DA><FRMA algoritmo="SHA1withRSA">FbdK7xF40SQ8Dvm0fWE/0VjfvHrb3c1V7i5lcTbhpuwcL4kjG0aWdiJXrk9T9RDn/G85KH7g/jSFffdiFxzxlw==</FRMA></CAF><TSTED>2021-12-31T00:06:25</TSTED></DD><FRMT algoritmo="SHA1withRSA">pfpsqrRUehqFqgrZ3mveH+OY+dNBfUE5eSFzpyNroxMHLK0sLUd1Ib/tJuNfZZzRoZJLlppzXKwdhZrzX1q9Ig==</FRMT></TED>'
        // printer.print_boleta(t,123,cart_iva, total_iva, 333)
        //console.log(total_iva)

        sii.timbre_str(total).then(res => {
            printer.print_boleta(res[0], res[1], cart_iva, total_iva, res[2])
        }).catch(err => {
            utilities.show_alert(err, 'err')
            console.log(err)

        })
    }

}

function close_sale() {

    $('#process_pay_modal').modal('hide')
    restart_input_pay_amount()
    $('#resume_sale_modal').modal('show')
    total_resume_sale_modal_label.innerText = utilities.render_money_string(total)
    change_rseume_sale_modal_label.innerText = utilities.render_money_string(calc_change())
}

function load_products_btns() {
    counter_buttons = 0
    btn_product_container.innerHTML = ''
    products.find_all_favorites()
        // products.find_all()
        .then(res => {
            res.forEach(product => {
                counter_buttons = counter_buttons + 1
                if (counter_buttons <= 50) {
                    let button = document.createElement('button')
                    button.setAttribute('class', 'btn btn-primary btn-product btn-sm')
                    button.innerText = product.name
                    btn_product_container.appendChild(button)
                    button.addEventListener('click', () => {
                        let id = product.id
                        let name = product.name
                        let price = product.Price.sale
                        let quanty = 1
                        let subtotal = quanty * price
                        let tax_id = product.Price.tax_id
                        add_item_to_cart(id, name, price, quanty, subtotal, tax_id)
                    })
                }
            });
        })
        .catch(err => {
            console.log(err)
        })
}

function test_change() {
    let change = pay_amount - total
    let result = true
    if (change <= -1) {
        result = false
    } else {
        result = true
    }

    return result
}

function calc_change() {
    let change = pay_amount - total
    return change
}

function restart_input_pay_amount() {
    pay_amount_input.value = ''
}

function add_item_to_cart(id, name, price, quanty, subtotal, tax_id) {
    let new_item = { 'id': id, 'name': name, 'price': price, 'quanty': quanty, 'subtotal': subtotal, 'tax_id': tax_id }

    let exits_in_cart = cart.find(item => item.id == id)
    if (exits_in_cart == undefined) {
        cart.push(new_item)
    } else {
        cart.forEach(item => {
            if (item.id == id) {
                item.quanty = item.quanty + 1
                item.subtotal = item.quanty * item.price
            }
        })
    }
    cash_register_cart_grid.render(cart)
    total_label.dispatchEvent(new Event('input'))

}



//--------- SEARCH -----------//


input.onkeyup = (e) => {
    var value = input.value

    if (e.code != 'ArrowDown' && e.code != 'ArrowUp' && e.code != 'Enter') {
        if (value) {
            ul.innerHTML = ''
            sugestions = data_for_search.filter(data => { //reliza el filtro en data_list(List<String>, con los valores a buscar)
                return data.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            })


            sugestions.forEach(item => {
                let index = sugestions.indexOf(item)
                counter = index + 1
                let a = document.createElement('a')
                a.classList.add('dropdown-item')
                a.id = 'suggestion_' + counter
                a.innerText = item
                ul.appendChild(a)
                a.onmouseover = (e) => { input.value = item }
                a.onclick = (e) => {
                    input.value = item
                    ul.innerHTML = ''
                    counter = 0
                }
            })
            counter = 0
        } else {
            ul.innerHTML = ''
            counter = 0
        }

    } else if (e.code == 'ArrowUp') {
        if (counter == 0) {
            counter = sugestions.length
            let sugestion = document.getElementById('suggestion_' + counter)
            sugestion.classList.add('over-search')
            sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
            //input.focus()
        } else if (counter == 1) {
            counter = 1
        }
        else {
            counter = counter - 1
            let sugestion = document.getElementById('suggestion_' + counter)
            sugestion.classList.add('over-search')
            sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
            //input.focus()
            if (counter > 0) {
                let pre_counter = counter + 1
                let pre_sugestion = document.getElementById('suggestion_' + pre_counter)
                pre_sugestion.classList.remove('over-search')
            }

        }

    } else if (e.code == 'ArrowDown') {

        if (counter == sugestions.length) {
            counter = sugestions.length
        } else {
            counter = counter + 1
            let sugestion = document.getElementById('suggestion_' + counter)
            sugestion.classList.add('over-search')
            sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
            //input.focus()
            if (counter > 1) {
                let pre_counter = counter - 1
                let pre_sugestion = document.getElementById('suggestion_' + pre_counter)
                pre_sugestion.classList.remove('over-search')
            }
        }

    } else if (e.code == 'Enter') {
        ul.innerHTML = ''
        counter = 0
        if (search_form.checkValidity()) {
            products.find_one_by_name(value).then(product => {
                if (product == null) {
                    input.value = ''
                    ul.innerHTML = ''
                    counter = 0
                    utilities.show_alert('Producto no econtrado', 'err')
                } else {
                    let id = product.id
                    let name = product.name
                    let price = product.Price.sale
                    let quanty = 1
                    let subtotal = quanty * price
                    let tax_id = product.Price.tax_id
                    add_item_to_cart(id, name, price, quanty, subtotal, tax_id)
                    input.value = ''

                }

            })
        }

    }
}

module.exports = { 
    cart, add_item_to_cart, order_to_close_container, orders_to_close, 
    on_delete_order, add_order_to_close, remove_all_orders }