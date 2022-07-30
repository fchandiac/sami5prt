
const fs = require('fs')
const path = require('path');
const utilities = require('./utilities')
const momevents_grid = require('./grids/movements_grid')
const moment = require('moment');
const printer = require('./printer')


const balance_label = document.getElementById('balance_label')
const open_cash_drawer_btn = document.getElementById('open_cash_drawer_btn')
const code_open_cash_drawer_input = document.getElementById('code_open_cash_drawer_input')
const close_cash_register_btn = document.getElementById('close_cash_register_btn')
const balance_close_cash_register_label = document.getElementById('balance_close_cash_register_label')
const close_cash_register_modal_btn = document.getElementById('close_cash_register_modal_btn')
const money_income_btn = document.getElementById('money_income_btn')
const money_income_amount_input = document.getElementById('money_income_amount_input')
const money_income_modal_btn = document.getElementById('money_income_modal_btn')
const money_income_form = document.getElementById('money_income_form')
const code_money_income_input = document.getElementById('code_money_income_input')
const print_close_report_switch = document.getElementById('print_close_report_switch')


const money_out_btn = document.getElementById('money_out_btn')
const money_out_amount_input = document.getElementById('money_out_amount_input')
const money_out_modal_btn = document.getElementById('money_out_modal_btn')
const code_money_out_input = document.getElementById('code_money_out_input')
const money_out_form = document.getElementById('money_out_form')
const open_cash_drawer_modal_btn = document.getElementById('open_cash_drawer_modal_btn')
const close_exit_btn_modal = document.getElementById('close_exit_btn_modal')
const open_cash_drawer_form = document.getElementById('open_cash_drawer_form')
//const code_open_cash_drawer_input = document.getElementById('code_open_cash_drawer_input')



var balance = 0
//--------- CODES -----------//
// 0 - apertura 1-venta 2-ingreso 3-egreso 4-apertura gaveta


//--------- ON LOAD -----------//

momevents_grid.render()

//--------- BUTTONS -----------//
open_cash_drawer_btn.addEventListener('click', () => {
    if (printer.print_test_conn() == 'err') {
        utilities.show_alert('Error de conexión con la impresora.', 'err')
    } else {
        $('#open_cash_drawer_modal').modal('show')
        code_open_cash_drawer_input.focus()
    }

})

open_cash_drawer_modal_btn.addEventListener('click', () => {
    if (open_cash_drawer_form.checkValidity()) {
        if (utilities.check_auth(code_open_cash_drawer_input.value) == true) {
            printer.open_cashdraw()
            $('#open_cash_drawer_modal').modal('hide')
        } else {
            utilities.show_alert('El Código de autorización es incorrecto.', 'err')
        }
    }

})

close_cash_register_btn.addEventListener('click', () => {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    if (movements_json.state == 0) {
        utilities.show_alert('La caja esta cerrada, diríjase al menú "Caja", para realizar apertura.', 'err')
    } else {
        $('#close_cash_register_modal').modal('show')
        balance_close_cash_register_label.innerText = utilities.render_money_string(calc_balance())
    }

})

close_cash_register_modal_btn.addEventListener('click', () => {
    if (print_close_report_switch.checked == true) {
        if (printer.print_test_conn() == 'err') {
            utilities.show_alert('Error de conexión con la impresora.', 'err')
        } else {
            let data = data_movements_report()
            printer.print_close_cash_register_report(
                data[0],
                data[1],
                data[2],
                data[3],
                data[4])
            close_cash_register_movement()
            momevents_grid.render()
            render_balance()
            $('#close_cash_register_modal').modal('hide')
        }
    } else {
        close_cash_register_movement()
        momevents_grid.render()
        render_balance()
        $('#close_cash_register_modal').modal('hide')
    }

})



close_exit_btn_modal.addEventListener('click', () => {
    if (print_close_report_switch.checked == true) {
        if (printer.print_test_conn() == 'err') {
            utilities.show_alert('Error de conexión con la impresora.', 'err')
        } else {
            let data = data_movements_report()
            printer.print_close_cash_register_report(
                data[0],
                data[1],
                data[2],
                data[3],
                data[4])
            close_cash_register_movement()
            momevents_grid.render()
            render_balance()
            setTimeout(close_app, 1000)

        }
    } else {
        close_cash_register_movement()
        momevents_grid.render()
        render_balance()
        close_app()
    }

})

money_income_btn.addEventListener('click', () => {
    if (printer.print_test_conn() == 'err') {
        utilities.show_alert('Error de conexión con la impresora.', 'err')
    } else {
        money_income_amount_input.value = ''
        code_money_income_input.value = ''
        const filePath = path.join(__dirname, '../movements.json')
        const rawdata = fs.readFileSync(filePath)
        const movements_json = JSON.parse(rawdata);
        if (movements_json.state == 0) {
            utilities.show_alert('La caja esta cerrada, diríjase al menú "Caja", para realizar apertura.', 'err')
        } else {
            $('#money_income_modal').modal('show')
            money_income_amount_input.focus()
        }
    }

})

money_income_amount_input.addEventListener('input', () => {
    money_income_amount_input.value = utilities.render_money_string(money_income_amount_input.value)
})

money_income_modal_btn.addEventListener('click', () => {

    if (money_income_form.checkValidity()) {
        if (money_income_amount_input.value == '$' || money_income_amount_input.value == '$ ') {
            utilities.show_alert('Ingrese un monto valido.', 'err')
        } else {
            if (utilities.check_auth(code_money_income_input.value) == true) {


                movements.add_movement('Ingreso', 2, utilities.input_money_to_int(money_income_amount_input.value), (calc_balance() + utilities.input_money_to_int(money_income_amount_input.value)))
                movements.open_cash_register()
                momevents_grid.render()
                printer.open_cashdraw()
                render_balance()
                $('#money_income_modal').modal('hide')



            } else {
                utilities.show_alert('El Código de autorización es incorrecto.', 'err')
            }
        }

    }
})

money_out_btn.addEventListener('click', () => {
    if (printer.print_test_conn() == 'err') {
        utilities.show_alert('Error de conexión con la impresora.', 'err')
    } else {
        money_out_amount_input.value = ''
        code_money_out_input.value = ''
        const filePath = path.join(__dirname, '../movements.json')
        const rawdata = fs.readFileSync(filePath)
        const movements_json = JSON.parse(rawdata);
        if (movements_json.state == 0) {
            utilities.show_alert('La caja esta cerrada, diríjase al menú "Caja", para realizar apertura.', 'err')
        } else {
            $('#money_out_modal').modal('show')
            money_out_amount_input.focus()
        }

    }

})


money_out_amount_input.addEventListener('input', () => {
    money_out_amount_input.value = utilities.render_money_string(money_out_amount_input.value)
})

money_out_modal_btn.addEventListener('click', () => {
    if (money_out_form.checkValidity()) {
        if (money_out_amount_input.value == '$' || money_out_amount_input.value == '$ ') {
            utilities.show_alert('Ingrese un monto valido.', 'err')
        } else {
            if (utilities.check_auth(code_money_out_input.value) == true) {
                let out_value = utilities.input_money_to_int(money_out_amount_input.value)
                out_value = out_value * -1
                movements.add_movement('Egreso', 3, out_value, (calc_balance() + out_value))
                movements.open_cash_register()
                momevents_grid.render()
                printer.open_cashdraw()
                render_balance()
                $('#money_out_modal').modal('hide')
            } else {
                utilities.show_alert('El Código de autorización es incorrecto.', 'err')
            }
        }
    }

})

//--------- FUNCTIIONS -----------//

function close_app() {
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
}

function open_cash_register() {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    movements_json.state = 1
    data = JSON.stringify(movements_json)
    fs.writeFileSync(filePath, data)
}

function data_movements_report() {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);

    let open_amount = 0
    movements_json.movements.forEach(item => {
        if (item.type_code == 0) {
            open_amount = open_amount + item.amount
        }
    })
    let sales_total = 0
    movements_json.movements.forEach(item => {
        if (item.type_code == 1) {
            sales_total = sales_total + item.amount
        }
    })
    let incomes_total = 0
    movements_json.movements.forEach(item => {
        if (item.type_code == 2) {
            incomes_total = incomes_total + item.amount
        }
    })
    let outs_total = 0
    movements_json.movements.forEach(item => {
        if (item.type_code == 3) {
            outs_total = outs_total + item.amount
        }
    })
    calc_balance()
    //printer.print_close_cash_register_report(balance, sales_total, incomes_total, outs_total)
    return [balance, sales_total, incomes_total, outs_total, open_amount]
}

function calc_balance() {
    balance = 0
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    let movements = movements_json.movements
    movements.forEach(mov => {
        balance = balance + mov.amount
    });
    return balance
}

function add_movement(type, type_code, amount, balance, sale_id) {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    if (sale_id == null) {
        sale_id = 0
    }

    let movement = { 'type': type, 'type_code': type_code, 'sale_id': sale_id, 'amount': amount, 'balance': balance, 'fecha': moment(new Date()) }
    movements_json.movements.push(movement)
    // movements_json.movements = movements
    data = JSON.stringify(movements_json)
    fs.writeFileSync(filePath, data)
}

function remove_all() {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    movements_json.movements = []
    data = JSON.stringify(movements_json)
    fs.writeFileSync(filePath, data)
}

function remove_sale_movement(sale_id) {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);

    let movements = movements_json.movements
    movements.forEach(item => {

        if (item.sale_id == sale_id) {
            let index = movements.indexOf(item)
            movements.splice(index, 1)
        }
    })

    data = JSON.stringify(movements_json)
    fs.writeFileSync(filePath, data)
}

function edit_type_sale_moevement(sale_id) {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);

    let movements = movements_json.movements
    movements.forEach(item => {

        if (item.sale_id == sale_id) {
            item.type = '* Venta ' + sale_id
            // let index = movements.indexOf(item)
            // movements.splice(index,1)
        }
    })

    data = JSON.stringify(movements_json)
    fs.writeFileSync(filePath, data)

}



function close_cash_register_movement() {
    remove_all()
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    movements_json.state = 0
    movements_json.balance = 0
    data = JSON.stringify(movements_json)
    fs.writeFileSync(filePath, data)
}

function render_balance() {
    balance_label.innerText = utilities.render_money_string(calc_balance())
}


function test() {
    alert('test alert')
}


module.exports = {
    add_movement,
    remove_all,
    open_cash_register,
    render_balance,
    calc_balance,
    test,
    remove_sale_movement,
    edit_type_sale_moevement
}

// data = JSON.stringify(json)
// fs.writeFileSync(filePath,data)