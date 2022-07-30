const { Grid, Cell, h, html } = require("gridjs")
const translate = require("./translate_grid")
const utilities = require('../utilities')
const config = require('../config')
const server_url = 'http://localhost:' + config.port

const shop_cart_grid = require('./shopping_cart')
const shop_total_label = document.getElementById('shop_total_label')
const shopping_cart_code_input = document.getElementById('shopping_cart_code_input')

function render(cart, products){
    let items_per_page = parseInt(((window.screen.availHeight*0.52)/80))
    let old_grid = document.getElementById('duplicate_code_grid')
    old_grid.remove()
    let container_grid = document.getElementById('duplicate_code_grid_container')
    container_grid.appendChild(utilities.grid_container('duplicate_code_grid'))

    var grid = new Grid({
        search: true,
        sort: true,
        pagination: { limit: items_per_page },
        language: translate.es_ES,
        columns: [
            {name: 'Id', width: '0%', hidden: true},//0
            {name: 'Producto',  width: '40%'},// 1
            {name: 'Código',  width: '25%'},// 2
            {name: 'Categoría',  width: '20%'},// 3
            {name: 'Precio',  width: '15%'},// 4
            {name: 'price',  width: '0%', hidden: true},// 5
            {name: 'tax',  width: '0%', hidden: true},// 6
            {name: 'Opciones',width: '9%', sort: false, 
            formatter: (cell, row) => {
                    {return [
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => add_to_cart(row.cells[0].data, row.cells[1].data, row.cells[5].data, row.cells[6].data, cart)}, (html('<i class="bi bi-cart-plus"></i>')))    
                    ]
                    }
                }
            } 
        ], 
        // sort: {
        //     multiColumn: true
        // },
        data: products.map(item =>[
            item.id,
            item.name,
            item.code,
            item.Category.name,
            utilities.render_money_string(item.Price.sale),
            item.Price.sale,
            item.Price.tax_id])
    });
    
    
    grid.render(document.getElementById('duplicate_code_grid'))
    let new_grid = document.getElementById('duplicate_code_grid')
    let gridjs_container = new_grid.childNodes[0]

    gridjs_container.style.width = ''
}

function add_to_cart(id, name, price, tax_id, cart){
    add_item_to_cart(id, name, price, 1, price, tax_id, cart)
}

function add_item_to_cart(id, name, price, quanty, subtotal, tax_id, cart){
    let new_item = {'id':id, 'name':name, 'price':price, 'quanty':quanty, 'subtotal':subtotal, 'tax_id':tax_id}

    let exits_in_cart = cart.find(item => item.id == id)
    if (exits_in_cart == undefined){
                    cart.push(new_item)
    } else {
        cart.forEach(item => {
            if (item.id == id){
                item.quanty = item.quanty + 1
                item.subtotal = item.quanty * item.price
            }
        })
    }
    shop_cart_grid.render(cart)
    shop_total_label.dispatchEvent(new Event('input'))
    $('#duplicate_code_modal').modal('hide')
    shopping_cart_code_input.value = ''
    shopping_cart_code_input.focus()
}




module.exports = {render}