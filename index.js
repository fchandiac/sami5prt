require('./js/cash_gegister')
require('./js/products')
require('./js/movements')
require('./js/configuration')
require('./js/stocks')
require('./js/orders')


const products_grid = require('./js/grids/products')



const config = require('./js/config')
const sales = require('./js/sales')
const sales_promise = require('./js/promises/sales')
const utilities = require('./js/utilities')
const movements_grid = require('./js/grids/movements_grid')
const lioren = require('./js/promises/lioren')
const stock_grid = require('./js/grids/stock_grid')
const movements = require('./js/movements')
const moment = require('moment')
const finder_products_grid = require('./js/grids/products_finder')


const close_app_btn = document.getElementById('close_app_btn')
const cash_resgister_tab_btn = document.getElementById('cash_resgister_tab_btn')
const products_tab_btn = document.getElementById('products_tab_btn')
const config_tab_btn = document.getElementById('config_tab_btn')
const cash_register_body = document.getElementById('cash_register_body')
const products_body = document.getElementById('products_body')
const config_body = document.getElementById('config_body')
const movements_tab_btn = document.getElementById('movements_tab_btn')
const movements_body = document.getElementById('movements_body')
const open_cash_register_btn = document.getElementById('open_cash_register_btn')
const open_cash_register_form = document.getElementById('open_cash_register_form')
const authorization_code_input = document.getElementById('authorization_code_input')
const open_amount_input = document.getElementById('open_amount_input')
const name_product_input = document.getElementById('name_product_input')
const sales_tab_btn = document.getElementById('sales_tab_btn')
const sales_body = document.getElementById('sales_body')
const sales_grid_ctaegory_select = document.getElementById('sales_grid_ctaegory_select')
const cash_register_code_input = document.getElementById('cash_register_code_input')
const pay_btn = document.getElementById('pay_btn')
const alert_msg = document.getElementById('alert_msg')
const pay_amount_input = document.getElementById('pay_amount_input')
const product_finder = document.getElementById('product_finder')
const alert_msg_modal = document.getElementById('alert_msg_modal')
const quote_btn = document.getElementById('quote_btn')
const btn_product_container = document.getElementById('btn_product_container')
const edit_quanty_modal = document.getElementById('edit_quanty_modal')
const exit_btn_modal = document.getElementById('exit_btn_modal')
const stocks_body = document.getElementById('stocks_body')
const stocks_tab_btn = document.getElementById('stocks_tab_btn')
const orders_tab_btn = document.getElementById('orders_tab_btn')
const orders_body = document.getElementById('orders_body')
const orders_grid = require('./js/grids/orders')
const { orders_to_close } = require('./js/cash_gegister')



const start_sales_grid_date_imput = document.getElementById('start_sales_grid_date_imput')
const end_sales_grid_date_imput = document.getElementById('end_sales_grid_date_imput')


var cash_register_tab_open = true


 //--------- CONFIG -----------//


if (config.product_finder == true){
    product_finder.classList.remove('collapse')
} else {
    product_finder.classList.add('collapse')
}

if (config.quote == true){
    quote_btn.classList.remove('collapse')
} else {
    quote_btn.classList.add('collapse')
}

if (config.products_buttons == true){
    btn_product_container.classList.remove('collapse')
} else {
    btn_product_container.classList.add('collapse')
}
//sconfig.shopping_cart == true ||

if ( config.small_shopping_cart == true  ){
    cash_register_body.classList.remove('content-body-col-40-60')
    cash_register_body.classList.add('content-body-col-55-45')
} else {
    cash_register_body.classList.add('content-body-col-40-60')
    cash_register_body.classList.remove('content-body-col-55-45')
}

// if (config.shoppingcart_loader == true){}

//--------- -----------//

document.addEventListener('keypress', function(event) {
    // Number 13 is the "Enter"
    if ($('#alert_msg_modal').is(':visible')=== true){
        if (event.code === 'Enter') {
            event.preventDefault();
            if(alert_msg.innerText == 'El monto de pago es insufuciente.'){
                // pay_amount_input.blur()
                pay_amount_input.value = ''
                $('#alert_msg_modal').modal('hide')
                pay_amount_input.focus()
            } else {
                $('#alert_msg_modal').modal('hide')
                if (cash_register_code_input.value != ""){
                    cash_register_code_input.value = ''
                    cash_register_code_input.focus()
                    
                }
            }
        }
    }

    if ($('#resume_sale_modal').is(':visible')=== true){
        if (event.code === 'Enter') {
            event.preventDefault();
            $('#resume_sale_modal').modal('hide')
        }
    }

    if (cash_register_tab_open === true){
        if (event.code === 'BracketRight') {
            event.preventDefault();
            pay_btn.click()
        }

    }

    alert_msg_modal.addEventListener('hidden.bs.modal', function (event) {
        if (alert_msg.innerText == 'Producto no encontrado.'){
            cash_register_code_input.value = ''
            cash_register_code_input.focus()
        }
      })
    
})

//--------- ON LOAD -----------//
document.addEventListener("DOMContentLoaded", function(){

    open_cash_register()

    sales.render_sales_grid('1990-01-01', '1990-01-01')
    cash_register_code_input.focus()

   

    $('#edit_quanty_modal').on('hidden.bs.modal', function (e) {
      
        cash_register_code_input.focus()
    })

   
})

//--------- -----------//

open_amount_input.addEventListener('input', () => {
    open_amount_input.value = utilities.render_money_string(open_amount_input.value)
})

open_cash_register_btn.addEventListener('click', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, './movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);

    if (open_cash_register_form.checkValidity()){
        if (open_amount_input.value == '$' || open_amount_input.value == '$ '){
            utilities.show_alert('Ingrese un monto valido.', 'err')
        } else {
            if (utilities.check_auth(authorization_code_input.value) == true){
                movements.add_movement('Apertura de caja', 0, utilities.input_money_to_int(open_amount_input.value), utilities.input_money_to_int(open_amount_input.value))
                movements.open_cash_register()
                $('#open_cash_register_modal').modal('hide')
            } else {
                utilities.show_alert('El Código de autorización es incorrecto.', 'err')
            }
        }
    }
})
//--------- OTHERS -----------//
exit_btn_modal.addEventListener('click', () => {
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
})

//--------- TAB ELEMENTS -----------//

close_app_btn.addEventListener('click', () => {
    $('#close_cash_register_modal').modal('show')
})



// cash_resgister_tab_btn.addEventListener('click', () => {
//    WAS MOVE TO CASH REGISTER
// })

orders_tab_btn.addEventListener('click', () => {
    set_active_body(orders_body)
    set_non_active_body(cash_register_body)
    set_non_active_body(config_body)
    set_non_active_body(movements_body)
    set_non_active_body(sales_body)
    set_non_active_body(stocks_body)
    set_non_active_body(products_body)

    set_active_tab(orders_tab_btn)
    set_non_active_tab(cash_resgister_tab_btn)
    set_non_active_tab(config_tab_btn)
    set_non_active_tab(movements_tab_btn)
    set_non_active_tab(sales_tab_btn)
    set_non_active_tab(stocks_tab_btn)
    set_non_active_tab(products_tab_btn)

    orders_grid.render()

})

products_tab_btn.addEventListener('click', () => {
    set_active_body(products_body)
    set_non_active_body(cash_register_body)
    set_non_active_body(config_body)
    set_non_active_body(movements_body)
    set_non_active_body(sales_body)
    set_non_active_body(stocks_body)
    set_non_active_body(orders_body)


    set_active_tab(products_tab_btn)
    set_non_active_tab(cash_resgister_tab_btn)
    set_non_active_tab(config_tab_btn)
    set_non_active_tab(movements_tab_btn)
    set_non_active_tab(sales_tab_btn)
    set_non_active_tab(stocks_tab_btn)
    set_non_active_tab(orders_tab_btn)

    name_product_input.focus()
    cash_register_tab_open = false
    products_grid.render()
})


movements_tab_btn.addEventListener('click', () => {
    movements_grid.render()
    movements.render_balance()
    set_active_body(movements_body)
    set_non_active_body(products_body)
    set_non_active_body(cash_register_body)
    set_non_active_body(config_body)
    set_non_active_body(sales_body)
    set_non_active_body(stocks_body)
    set_non_active_body(orders_body)
  

    set_active_tab(movements_tab_btn)
    set_non_active_tab(products_tab_btn)
    set_non_active_tab(cash_resgister_tab_btn)
    set_non_active_tab(config_tab_btn)
    set_non_active_tab(sales_tab_btn)
    set_non_active_tab(stocks_tab_btn)
    set_non_active_tab(orders_tab_btn)

    cash_register_tab_open = false

})

sales_tab_btn.addEventListener('click', () => {
    set_active_body(sales_body)
    set_non_active_body(config_body)
    set_non_active_body(products_body)
    set_non_active_body(cash_register_body)
    set_non_active_body(movements_body)
    set_non_active_body(stocks_body)
    set_non_active_body(orders_body)


    set_active_tab(sales_tab_btn)
    set_non_active_tab(config_tab_btn)
    set_non_active_tab(products_tab_btn)
    set_non_active_tab(cash_resgister_tab_btn)
    set_non_active_tab(movements_tab_btn)
    set_non_active_tab(stocks_tab_btn)
    set_non_active_tab(orders_tab_btn)

    cash_register_tab_open = false

    load_charts()
    utilities.list_categories_on_select_for_grid_sale(sales_grid_ctaegory_select,1)

})



config_tab_btn.addEventListener('click', () => {
    set_active_body(config_body)
    set_non_active_body(products_body)
    set_non_active_body(cash_register_body)
    set_non_active_body(movements_body)
    set_non_active_body(sales_body)
    set_non_active_body(stocks_body)
    set_non_active_body(orders_body)


    set_active_tab(config_tab_btn)
    set_non_active_tab(products_tab_btn)
    set_non_active_tab(cash_resgister_tab_btn)
    set_non_active_tab(movements_tab_btn)
    set_non_active_tab(sales_tab_btn)
    set_non_active_tab(stocks_tab_btn)
    set_non_active_tab(orders_tab_btn)

    cash_register_tab_open = false
})





//--------- FUNCTIONS -----------//

function load_charts(){
    var today = moment(new Date(), "DD/MM/YYYY")
    //var today = moment('20-05-2021', "DD/MM/YYYY")
    sales_promise.find_one_min_create().then(res => {
        let period_from_first_sale = utilities.period_month_range(moment(res.createdAt), today)
        let quanty_months_to_chart = 0
        let title = 'Sales Chart'
        if (period_from_first_sale.length >= 10){
            quanty_months_to_chart = 10
        } else {
            quanty_months_to_chart = period_from_first_sale.length
        }
        let start_month = moment(today).subtract((quanty_months_to_chart-1), 'month')
        if (quanty_months_to_chart == 0){
            title = 'Sin datos.'
        } else if (quanty_months_to_chart == 1){
            title = 'Gráfico ventas último mes.'
        } else {
        title = 'Ventas últimos ' + utilities.render_digit(quanty_months_to_chart) + ' meses.'
        }
        sales.render_month_sales_chart(start_month, today, title)
    })

    sales.render_day_sales_chart(today)
    let end_date_categories = moment(new Date()).format("YYYY-MM-DD")
    let start_date_categories = moment(new Date())
    start_date_categories = moment(start_date_categories).subtract(30, 'day').format("YYYY-MM-DD")
    sales.render_categories_chart(start_date_categories, end_date_categories)
    sales.render_products_chart(start_date_categories, end_date_categories)
}

function set_active_body(active_body){
    active_body.classList.remove('collapse')
}

function set_non_active_body(non_active_body){
    non_active_body.classList.add('collapse')
}


function set_active_tab(active_tab){
    active_tab.classList.add('active')
    active_tab.classList.remove('no-active-tab')
}

function set_non_active_tab(non_active_tab){
    non_active_tab.classList.add('no-active-tab')
    non_active_tab.classList.remove('active')
}

function open_cash_register(){
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, './movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    

    if(movements_json.state == 0){
        open_amount_input.value =  ''
        //$('#update_product_modal').modal('show')
        $('#open_cash_register_modal').modal('show')
        // open_amount_input.value = '$ '
        authorization_code_input.value = ''
        open_amount_input.focus()
    }
}

