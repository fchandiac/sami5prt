
const fs = require('fs')
const path = require('path');
const moment = require('moment')
const config = require('./config')
const server_url = 'http://localhost:' + config.port
const taxes = require('./promises/taxes')

function render_money_string(value) {
    if (value < 0) {
        value = value.toString()
        value = value.replace(/[^0-9]/g, '')
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        value = '$ -' + value
        return value
    } else {
        value = value.toString()
        value = value.replace(/[^0-9]/g, '')
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        value = '$ ' + value
        return value
    }
}

function input_money_to_int(value) {
    value = value.replace('.', '') // Despejar Puntos
    value = value.replace('$', '') // Despejar $
    value = parseInt(value)
    return value
}

function config_money_input(input) {
    input.addEventListener('focus', () => {
        if (input.value == '$ 0') {
            input.value = '$ '
        }
    })
    input.addEventListener('input', () => {
        input.value = render_money_string(input.value)
    })
    input.addEventListener('blur', () => {
        if (input.value == '$ ') {
            input.value = '$ 0'
        }
    })
}

function grid_container(id, height) {
    let grid = document.createElement('div')
    grid.setAttribute('class', 'grid-container')
    grid.setAttribute('id', id)
    // grid.style.width = '100%'
    // grid.style.height = height + 'vh'
    return grid
}

function show_alert(msg, type) {

    let alert_msg = document.getElementById('alert_msg')
    alert_msg.classList.remove('text-danger')
    if (type == 'err') {
        alert_msg.classList.add('text-danger')
    }
    alert_msg.innerText = msg
    $('#alert_msg_modal').modal('show')

}

function list_categories_on_select(select, selected_value) {
    fetch(server_url + '/categories/find_all', {
        method: 'GET',
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        res.json().then(res => {
            select.innerHTML = ''
            res.forEach(category => {
                let option = document.createElement('option')
                option.value = category.id
                option.innerText = category.name
                select.appendChild(option)
                if (option.value == selected_value) {
                    option.selected = true
                }
            });
            if (selected_value == -1 || selected_value == 0) {
                select.selectedIndex = selected_value
            }



        })
    })
}
function list_categories_on_select_for_grid_sale(select, selected_value) {
    fetch(server_url + '/categories/find_all', {
        method: 'GET',
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        res.json().then(res => {
            select.innerHTML = ''
            let opction_ = document.createElement('option')
            opction_.value = 0
            opction_.innerText = 'Todas'
            select.appendChild(opction_)
            res.forEach(category => {
                let opction = document.createElement('option')
                opction.value = category.id
                opction.innerText = category.name
                select.appendChild(opction)
                if (opction.value == selected_value) {
                    opction.selected = true
                }
            });
        })
    })
}

function list_taxes_on_select(select, selected_value) {
    taxes.find_all()
        .then(res => {
            select.innerHTML = ''
            res.forEach(tax => {
                // let opction = document.createElement('option')
                // opction.value = tax.id
                // opction.innerText = tax.name
                // select.appendChild(opction)
                let option = document.createElement('option')
                option.value = tax.id
                option.innerText = tax.name
                select.appendChild(option)
                if (option.value == selected_value) {
                    option.selected = true
                }

            })
            if (selected_value == -1 || selected_value == 0) {
                select.selectedIndex = selected_value
            }
        })
        .catch(err => utilities.show_alert('Se ha generado un error.', 'err'))
}

class NumberKeyboard {
    #string_out
    #container
    #btn_1
    #btn_2
    #btn_3
    #btn_4
    #btn_5
    #btn_6
    #btn_7
    #btn_8
    #btn_9
    #btn_0
    #btn_back_space
    #input

    /**
     *Clase Number Keyboard --
     * Requiere number_keyboard.css --
     * Implementa un teclado en pantalla númerico que administra enteros. --
     * Recibe una cadena con el id de un input para se menejado. --
     * @param {HTMLLabelElement} input_id   
     */

    constructor(input_id) {
        this.#input = document.getElementById(input_id)
        this.#string_out = ''
        this.#container = document.createElement('div')
        this.#container.id = 'number_keyboard'
        let row_1 = document.createElement('div')
        row_1.setAttribute('class', 'number_keyboard_row mrgn-top')

        this.#container.appendChild(row_1)
        this.#btn_1 = document.createElement('a')
        this.#btn_1.setAttribute('class', 'btn btn-success')
        this.#btn_1.innerHTML = '1'
        row_1.appendChild(this.#btn_1)
        this.#btn_1.addEventListener('click', () => { this.#set_1() })

        this.#btn_2 = document.createElement('a')
        this.#btn_2.setAttribute('class', 'btn btn-success')
        this.#btn_2.innerHTML = '2'
        row_1.appendChild(this.#btn_2)
        this.#btn_2.addEventListener('click', () => { this.#set_2() })

        this.#btn_3 = document.createElement('a')
        this.#btn_3.setAttribute('class', 'btn btn-success number-keyboard-last-col')
        this.#btn_3.innerHTML = '3'
        row_1.appendChild(this.#btn_3)
        this.#btn_3.addEventListener('click', () => { this.#set_3() })

        let row_2 = document.createElement('div')
        row_2.setAttribute('class', 'number_keyboard_row')
        this.#container.appendChild(row_2)

        this.#btn_4 = document.createElement('a')
        this.#btn_4.setAttribute('class', 'btn btn-success')
        this.#btn_4.innerHTML = '4'
        row_2.appendChild(this.#btn_4)
        this.#btn_4.addEventListener('click', () => { this.#set_4() })

        this.#btn_5 = document.createElement('a')
        this.#btn_5.setAttribute('class', 'btn btn-success')
        this.#btn_5.innerHTML = '5'
        row_2.appendChild(this.#btn_5)
        this.#btn_5.addEventListener('click', () => { this.#set_5() })

        this.#btn_6 = document.createElement('a')
        this.#btn_6.setAttribute('class', 'btn btn-success number-keyboard-last-col')
        this.#btn_6.innerHTML = '6'
        row_2.appendChild(this.#btn_6)
        this.#btn_6.addEventListener('click', () => { this.#set_6() })

        let row_3 = document.createElement('div')
        row_3.setAttribute('class', 'number_keyboard_row')
        this.#container.appendChild(row_3)

        this.#btn_7 = document.createElement('a')
        this.#btn_7.setAttribute('class', 'btn btn-success')
        this.#btn_7.innerHTML = '7'
        row_3.appendChild(this.#btn_7)
        this.#btn_7.addEventListener('click', () => { this.#set_7() })

        this.#btn_8 = document.createElement('a')
        this.#btn_8.setAttribute('class', 'btn btn-success')
        this.#btn_8.innerHTML = '8'
        row_3.appendChild(this.#btn_8)
        this.#btn_8.addEventListener('click', () => { this.#set_8() })

        this.#btn_9 = document.createElement('a')
        this.#btn_9.setAttribute('class', 'btn btn-success number-keyboard-last-col')
        this.#btn_9.innerHTML = '9'
        row_3.appendChild(this.#btn_9)
        this.#btn_9.addEventListener('click', () => { this.#set_9() })

        let row_4 = document.createElement('div')
        row_4.setAttribute('class', 'number_keyboard_row')
        this.#container.appendChild(row_4)

        this.#btn_0 = document.createElement('a')
        this.#btn_0.setAttribute('class', 'btn btn-success number-keyboard-0-btn')
        this.#btn_0.innerHTML = '0'
        row_4.appendChild(this.#btn_0)
        this.#btn_0.addEventListener('click', () => { this.#set_0() })

        this.#btn_back_space = document.createElement('a')
        this.#btn_back_space.setAttribute('class', 'btn btn-success number-keyboard-last-col')
        this.#btn_back_space.innerHTML = '<i class="bi bi-backspace"></i>'
        row_4.appendChild(this.#btn_back_space)
        this.#btn_back_space.addEventListener('click', () => { this.#set_back_space() })
    }

    /**
     * Render añade el container como chiled a un HTMLDivElement.
     * @param{HTMLDivElement} div Representa HTMLDivElement que recibira como child al container.
     */
    render(div) {

        if (div instanceof HTMLDivElement) {
            div.appendChild(this.#container)
        } else {
            throw 'El "div" que recibe no es del tipo HTMLDivElement.'
        }

    }

    #trigger_event_input() {
        this.#input.dispatchEvent(new Event('input'))
    }

    #set_1() {
        this.#string_out = this.#string_out + 1
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_2() {
        this.#string_out = this.#string_out + 2
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_3() {
        this.#string_out = this.#string_out + 3
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_4() {
        this.#string_out = this.#string_out + 4
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_5() {
        this.#string_out = this.#string_out + 5
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_6() {
        this.#string_out = this.#string_out + 6
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_7() {
        this.#string_out = this.#string_out + 7
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_8() {
        this.#string_out = this.#string_out + 8
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_9() {
        this.#string_out = this.#string_out + 9
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_0() {
        this.#string_out = this.#string_out + 0
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    #set_back_space() {
        this.#string_out = this.#string_out.slice(0, -1)
        this.#input.value = this.#string_out
        this.#trigger_event_input()
    }
    /**
     * Limpia la cadena de salida para una nueva venta.
     */
    clear_string_out() {
        this.#string_out = ''
    }

    /**
     * Devuelve un entenero generado por el teclado númerico es pantalla.
     * @returns 
     */
    out() {
        let out = 0
        if (this.#string_out.length != 0) {
            out = parseInt(this.#string_out)
        }
        if (out >= 10000000) {
            out = 10000000
        }

        return out
    }
    /**
     * Oculata el teclado en pantalla ('collapse').
     */
    hide() {
        this.#container.classList.add('collapse')
    }

}

function check_auth(code) {
    const filePath = path.join(__dirname, '../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);

    let result
    if (movements_json.authorization_code == code) {
        result = true
    } else {
        result = false
    }

    return result
}

function test() {
    alert('test alert')
}

const months = {
    0: 'enero',
    1: 'febrero',
    2: 'marzo',
    3: 'abril',
    4: 'mayo',
    5: 'junio',
    6: 'julio',
    7: 'agosto',
    8: 'septiembre',
    9: 'octubre',
    10: 'noviembre',
    11: 'diciembre'
}

const digits = {
    0: 'cero',
    1: 'uno',
    2: 'dos',
    3: 'tres',
    4: 'cuatro',
    5: 'cinco',
    6: 'seis',
    7: 'siete',
    8: 'ocho',
    9: 'nueve',
    10: 'diez',
    11: 'once',
    12: 'doce'
}

const days = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
}

function render_day(day_number) {
    return days[day_number]
}

function render_digit(number) {
    return digits[number]
}

function render_month(month_number) {
    return months[month_number]
}

function period_month_range(start_date, end_date) {
    start_date = moment(start_date)
    end_date = moment(end_date).endOf("month")
    let period = []
    while (start_date.isBefore(end_date)) {
        let month = start_date.month()
        let year = start_date.year()
        period.push({ month, year })
        //period.push(start_date.format("YYYY-MM"))
        start_date = start_date.add(1, "month")
    }
    return period
}

function period_days_range(start_date, end_date) {
    start_date = moment(start_date)
    end_date = moment(end_date).endOf('day')
    let period = []
    while (start_date.isBefore(end_date)) {
        // let month = start_date.month()
        // let year = start_date.year()
        // period.push({month, year})
        //period.push(start_date.format("YYYY-MM"))
        period.push(start_date.toDate())
        start_date = start_date.add(1, 'day')
    }
    return period

}

function percentage(partial_value, total_value) {
    return (100 * partial_value) / total_value
}
module.exports = {
    render_money_string,
    grid_container,
    show_alert,
    input_money_to_int,
    config_money_input,
    list_categories_on_select,
    list_taxes_on_select,
    check_auth,
    test,
    NumberKeyboard,
    render_month,
    period_month_range,
    render_digit,
    period_days_range,
    render_day,
    list_categories_on_select_for_grid_sale

}