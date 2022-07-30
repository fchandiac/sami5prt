const fs = require('fs');
const path = require('path');
const config = require('./config')
const utilities = require('./utilities')


const config_user_input = document.getElementById('config_user_input')
const config_password_input = document.getElementById('config_password_input')
const config_db_input = document.getElementById('config_db_input')
const config_host_input = document.getElementById('config_host_input')
const config_port_input = document.getElementById('config_port_input')
const config_dialect_input = document.getElementById('config_dialect_input')
const config_razon_social_input = document.getElementById('config_razon_social_input')
const config_fantasia_input = document.getElementById('config_fantasia_input')
const config_rut_input = document.getElementById('config_rut_input')
const config_direccion_input = document.getElementById('config_direccion_input')
const config_telefono_input = document.getElementById('config_telefono_input')
const config_token_input = document.getElementById('config_token_input')
const config_vendor_input = document.getElementById('config_vendor_input')
const config_product_input = document.getElementById('config_product_input')
const save_config_btn = document.getElementById('save_config_btn')
const product_finder_switch = document.getElementById('product_finder_switch')
const external_payment_switch = document.getElementById('external_payment_switch')
const number_keyboard_switch = document.getElementById('number_keyboard_switch')
const locale_config_input = document.getElementById('locale_config_input')
const quote_switch = document.getElementById('quote_switch')
const products_buttons_switch = document.getElementById('products_buttons_switch')
const small_shopping_cart_switch = document.getElementById('small_shopping_cart_switch')
const change_code_btn = document.getElementById('change_code_btn')
const change_auth_code_form = document.getElementById('change_auth_code_form')
const change_code_modal_btn = document.getElementById('change_code_modal_btn')
const code_change_input = document.getElementById('code_change_input')
const new_code_change_input = document.getElementById('new_code_change_input')
const edit_quanty_switch = document.getElementById('edit_quanty_switch')
const litle_finder_switch = document.getElementById('litle_finder_switch')
const shoppingcart_loader_switch = document.getElementById('shoppingcart_loader_switch')
const config_vendor_2_input = document.getElementById('config_vendor_2_input')
const config_product_2_input = document.getElementById('config_product_2_input')
const printer_1_radio = document.getElementById('printer_1_radio')
const printer_2_radio = document.getElementById('printer_2_radio')
const printer_3_radio = document.getElementById('printer_3_radio')
const second_ticket_switch = document.getElementById('second_ticket_switch')
const second_ticket_barcode_switch = document.getElementById('second_ticket_barcode_switch')
const second_ticket_title_input = document.getElementById('second_ticket_title_input')

const select_table_switch = document.getElementById('select_table_switch')

// const cash_register_switch = document.getElementById('cash_register_switch')




config_user_input.value = config.user_name
config_password_input.value = config.password
config_db_input.value = config.database
config_host_input.value = config.host
config_port_input.value = config.port
config_dialect_input.value = config.dialect

config_razon_social_input.value = config.razon
config_fantasia_input.value = config.fantasia
config_rut_input.value = config.rut
config_direccion_input.value = config.direccion
config_telefono_input.value = config.telefono
config_token_input.value = config.lioren_token
config_vendor_input.value = config.vendor
config_product_input.value = config.product
locale_config_input.value = config.locale
config_vendor_2_input.value = config.vendor_2
config_product_2_input.value = config.product_2
second_ticket_title_input.value = config.second_ticke_title



if (config.product_finder == true){
    product_finder_switch.checked = true
} else {
    product_finder_switch.checked = false
}

if (config.external_payment == true){
    external_payment_switch.checked = true
} else {
    external_payment_switch.checked = false
}


if (config.number_keyboard == true){
    number_keyboard_switch.checked = true
} else {
    number_keyboard_switch.checked = false
}

if (config.quote == true){
    quote_switch.checked = true
} else {
    quote_switch.checked = false
}

if (config.products_buttons == true){
    products_buttons_switch.checked = true
} else {
    products_buttons_switch.checked = false
}

if (config.small_shopping_cart == true){
    small_shopping_cart_switch.checked = true
} else {
    small_shopping_cart_switch.checked = false
}

if (config.edit_quanty_button == true){
    edit_quanty_switch.checked = true
} else {
    edit_quanty_switch.checked = false
}

if (config.litle_finder == true){
    litle_finder_switch.checked = true
} else {
    litle_finder_switch.checked = false
}



if (config.shoppingcart_loader == true){
    shoppingcart_loader_switch.checked = true
} else {
    shoppingcart_loader_switch.checked = false
}

if (config.second_ticket_printer == 1){
    printer_1_radio.checked = true
} else if (config.second_ticket_printer == 2){
    printer_2_radio.checked = true
} else if (config.second_ticket_printer == 3){
    printer_3_radio.checked = true
}

if (config.second_ticket == true){
    second_ticket_switch.checked = true
} else {
    second_ticket_switch.checked = false
}

if (config.second_ticket_barcode == true){
    second_ticket_barcode_switch.checked = true
} else { second_ticket_barcode_switch.checked = false}


if (config.select_table == true){
    select_table_switch.checked = true
} else {
    select_table_switch.checked = false
}

var filePath = path.join(__dirname, '../config.json')
var rawdata = fs.readFileSync(filePath)
var config_json = JSON.parse(rawdata);


//--------- BUTTONS -----------//

save_config_btn.addEventListener('click', () => {
    config_json.user_name = config_user_input.value
    config_json.password = config_password_input.value
    config_json.database = config_db_input.value
    config_json.host = config_host_input.value
    config_json.port = parseInt(config_port_input.value)
    config_json.dialect = config_dialect_input.value

    config_json.razon = config_razon_social_input.value
    config_json.fantasia = config_fantasia_input.value
    config_json.rut = config_rut_input.value
    config_json.direccion = config_direccion_input.value
    config_json.telefono = config_telefono_input.value 
    config_json.lioren_token = config_token_input.value
    config_json.vendor = parseInt(config_vendor_input.value)
    config_json.vendor_2 = parseInt(config_vendor_2_input.value)
    config_json.product = parseInt(config_product_input.value)
    config_json.product_2 = parseInt(config_product_2_input.value)
    config_json.locale = locale_config_input.value
    config_json.second_ticke_title = second_ticket_title_input.value
    

    if (product_finder_switch.checked == true){
        config_json.product_finder = true
    } else {
        config_json.product_finder = false
    }

    if (external_payment_switch.checked == true){
        config_json.external_payment = true
    } else {
        config_json.external_payment = false
    }

    if (number_keyboard_switch.checked == true){
        config_json.number_keyboard = true
    } else {
        config_json.number_keyboard = false
    }

    if (quote_switch.checked == true){
        config_json.quote = true
    } else {
        config_json.quote = false
    }

    if (products_buttons_switch.checked == true){
        config_json.products_buttons = true
    } else {
        config_json.products_buttons = false
    }

    if (small_shopping_cart_switch.checked == true){
        config_json.small_shopping_cart = true
    } else {
        config_json.small_shopping_cart = false
    }

    if (edit_quanty_switch.checked == true){
        config_json.edit_quanty_button = true
    } else {
        config_json.edit_quanty_button = false
    }

    if (litle_finder_switch.checked == true){
        config_json.litle_finder  = true
    } else {
        config_json.litle_finder  = false
    }


    if (shoppingcart_loader_switch.checked == true){
        config_json.shoppingcart_loader = true
    } else {
        config_json.shoppingcart_loader = false
    }

    const printer_second_ticket_option = document.querySelector("input[name=printer_option]:checked").value
    if(printer_second_ticket_option == 0){
        config_json.second_ticket_printer = 1
    } else if (printer_second_ticket_option == 1){
        config_json.second_ticket_printer = 2
    } else if (printer_second_ticket_option == 3){
        config_json.second_ticket_printer = 3
    } else {
        config_json.second_ticket_printer = 1
    }
   

    if (second_ticket_switch.checked == true){
        config_json.second_ticket = true
    } else {
        config_json.second_ticket = false
    }

    if (second_ticket_barcode_switch.checked == true){
        config_json.second_ticket_barcode = true
    } else {
        config_json.second_ticket_barcode = false
    }

    if (select_table_switch.checked == true){
        config_json.select_table = true
    } else {
        config_json.select_table = false
    }

  
    data = JSON.stringify(config_json)
    fs.writeFileSync(filePath,data)

    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
})

change_code_btn.addEventListener('click', () => {
    $('#change_auth_code_modal').modal('show')
    code_change_input.focus()
})

change_code_modal_btn.addEventListener('click', () => {
    change_code(code_change_input.value, new_code_change_input.value)
})

//--------- FUNCTIONS -----------//

function change_code(old_code, new_code){
    if (change_auth_code_form.checkValidity()){
        if (utilities.check_auth(old_code) == true){

            const filePath = path.join(__dirname, '../movements.json')
            const rawdata = fs.readFileSync(filePath)
            const movements_json = JSON.parse(rawdata);
            movements_json.authorization_code = new_code
            data = JSON.stringify(movements_json)
            fs.writeFileSync(filePath,data)
            $('#change_auth_code_modal').modal('hide')
        } else {
            utilities.show_alert('El Código de autorización es incorrecto.', 'err')
        }

    }
    
}

