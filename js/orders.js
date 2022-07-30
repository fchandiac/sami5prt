
const orders_promises = require('./promises/orders')
const orders_grid = require('./grids/orders')
const config = require('./config')
const utilities = require('./utilities')


var locale = Array.from(config.locale)
locale = locale[2]
locale = parseInt(locale)

const delete_past_orders_btn = document.getElementById('delete_past_orders_btn')
const delete_closes_orders_btn = document.getElementById('delete_closes_orders_btn')



delete_closes_orders_btn.addEventListener('click', () => {
    orders_promises.destroy_close_orders()
        .then(
            orders_grid.render()
        )
        .catch(err => {
            console.log(err)
        })
})

delete_past_orders_btn.addEventListener('click', () => {
    let today = moment(new Date()).format('yyyy-MM-DD')
    today = today + 'T00:00:00Z'
    today = moment(today).add(locale, 'hours')
    orders_promises.destroy_past_orders(today)
        .then(orders_grid.render())
        .catch(err => {
            console.log(err)
        })
})

const m1_btn = document.getElementById('m1_btn')
const m2_btn = document.getElementById('m2_btn')
const m3_btn = document.getElementById('m3_btn')
const m4_btn = document.getElementById('m4_btn')
const m5_btn = document.getElementById('m5_btn')
const m6_btn = document.getElementById('m6_btn')
const m7_btn = document.getElementById('m7_btn')
const m8_btn = document.getElementById('m8_btn')
const m9_btn = document.getElementById('m9_btn')
const m10_btn = document.getElementById('m10_btn')

const cash_register_js = require('./cash_gegister')
const cash_resgister_tab_btn = document.getElementById('cash_resgister_tab_btn')

m1_btn.addEventListener('click', () => {
    load_table_on_cart(1)
})
m2_btn.addEventListener('click', () => {
    load_table_on_cart(2)
})
m3_btn.addEventListener('click', () => {
    load_table_on_cart(3)
})
m4_btn.addEventListener('click', () => {
    load_table_on_cart(4)
})
m5_btn.addEventListener('click', () => {
    load_table_on_cart(5)
})
m6_btn.addEventListener('click', () => {
    load_table_on_cart(6)
})
m7_btn.addEventListener('click', () => {
    load_table_on_cart(7)
})
m8_btn.addEventListener('click', () => {
    load_table_on_cart(8)
})
m9_btn.addEventListener('click', () => {
    load_table_on_cart(9)
})
m10_btn.addEventListener('click', () => {
    load_table_on_cart(10)
})

const dm1_btn = document.getElementById('dm1_btn')
const dm2_btn = document.getElementById('dm2_btn')
const dm3_btn = document.getElementById('dm3_btn')
const dm4_btn = document.getElementById('dm4_btn')
const dm5_btn = document.getElementById('dm5_btn')
const dm6_btn = document.getElementById('dm6_btn')
const dm7_btn = document.getElementById('dm7_btn')
const dm8_btn = document.getElementById('dm8_btn')
const dm9_btn = document.getElementById('dm9_btn')
const dm10_btn = document.getElementById('dm10_btn')

dm1_btn.addEventListener('click', () => {
    load_table_on_cart(11)
})
dm2_btn.addEventListener('click', () => {
    load_table_on_cart(12)
})
dm3_btn.addEventListener('click', () => {
    load_table_on_cart(13)
})
dm4_btn.addEventListener('click', () => {
    load_table_on_cart(14)
})
dm5_btn.addEventListener('click', () => {
    load_table_on_cart(15)
})
dm6_btn.addEventListener('click', () => {
    load_table_on_cart(16)
})
dm7_btn.addEventListener('click', () => {
    load_table_on_cart(17)
})
dm8_btn.addEventListener('click', () => {
    load_table_on_cart(18)
})
dm9_btn.addEventListener('click', () => {
    load_table_on_cart(19)
})
dm10_btn.addEventListener('click', () => {
    load_table_on_cart(20)
})


function load_table_on_cart(table){
    cash_register_js.order_to_close_container.innerHTML = ''
    cash_register_js.remove_all_orders()
    orders_promises.find_all_by_table_open(table)
        .then(orders => {
            console.log(orders)
            if (orders.length == 0){
                utilities.show_alert('La mesa no tiene pedidos asociados', 'err')
            } else {
                console.log(orders)
                orders.forEach(order => {
                    console.log(order.id)
                    cash_register_js.add_order_to_close(order.id)
                    //cash_register_js.orders_to_close.push(order.id)
                    add_order_to_cart(order.id)
                    add_order_to_close(order.id)
                    cash_resgister_tab_btn.click()
                })
            }     
    })
}


function add_order_to_cart(order_id) {
    orders_promises.find_all_by_order(order_id)
        .then(res => {
            res.forEach(item => {
                let id = item.Product.id
                let name = item.Product.name
                let price = item.Product.Price.sale
                let quanty = item.quanty
                let subtotal = quanty * price
                let tax_id = item.Product.Price.tax_id
                cash_register_js.add_item_to_cart(id, name, price, quanty, subtotal, tax_id)
            })
        })

}


function add_order_to_close(order_id) {
    //cash_register_js.order_to_close_container.innerHTML = ''
    // cash_register_js.orders_to_close.forEach(item => {
        let order_btn = document.createElement('button')
        let inner_html = order_id + ' ' + '<i class="bi bi-trash-fill"></i>'
        order_btn.innerHTML = inner_html
        order_btn.id = order_id
        order_btn.classList.add('btn')
        order_btn.classList.add('btn-secondary')
        order_btn.style.marginRight = '1rem'

        order_btn.addEventListener('click', () => {
            order_btn.remove()
            cash_register_js.on_delete_order(order_btn.id)
            // Funcion resta PEDIDO
        })
        //console.log(cash_register_js.orders_to_close)
        cash_register_js.order_to_close_container.appendChild(order_btn)
    // })
}


