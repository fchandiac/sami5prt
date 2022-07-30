const { Grid, Cell, h, html } = require("gridjs")
const translate = require("./translate_grid_for_cart")
const utilities = require('../utilities')
const config = require('../config')
const server_url = 'http://localhost:' + config.port
const products = require('../promises/products')
const prices = require('../promises/prices')
const moment = require('moment');
const total_label = document.getElementById('total_label')

const edit_quanty_btn = document.getElementById('edit_quanty_btn')
const edit_quanty_input = document.getElementById('edit_quanty_input')
const edit_quanty_form = document.getElementById('edit_quanty_form')
// const cart = [
//     {'id':1, 'name':'producto', 'price':1000, 'quanty':1, 'subtotal':1000},
// ]

var cart_id = 0
var cart_to_edit = []

var quanty_btn = true
var options_width = '28%'
if(config.edit_quanty_button == false){
    quanty_btn = false
    options_width = '20%'
}

function render(cart){
    let old_grid = document.getElementById('cash_register_cart_grid')
    old_grid.remove()
    let container_grid = document.getElementById('cash_register_cart_grid_container')
    container_grid.appendChild(utilities.grid_container('cash_register_cart_grid'))

    var grid = new Grid({
        search: false,
        sort: false,
        pagination: false,
        language: translate.es_ES,
        columns: [{name: 'Id', width: '0%', hidden: true},
            {name: 'Producto',  width: '32%'},
            {name: 'Precio',  width: '15%'},
            {name: '#',  width: '8%'},
            {name: 'Subtotal',  width: '17%'},
            {name: 'Opciones',width: options_width, 
            formatter: (cell, row) => {
                    {
                        if(quanty_btn == true){
                            return [
                                h('button', { className: 'btn btn-secondary btn-grid', onClick: () => add_item_to_cart(cart, row.cells[0].data) }, (html('<i class="bi bi-plus-square"></i>'))),
                                h('button', { className: 'btn btn-secondary btn-grid', onClick: () => subtract_item_to_cart(cart,row.cells[0].data) }, (html('<i class="bi bi-dash-square"></i>'))),
                                h('button', { className: 'btn btn-secondary btn-grid', onClick: () => remove_product_from_cart(cart,row.cells[0].data)}, (html('<i class="bi bi-trash"></i>'))),
                                h('button', { className: 'btn btn-secondary btn-grid', onClick: () => edit_quanty(cart,row.cells[0].data)}, (html('<i class="bi bi-node-plus"></i>')))
                                ]   
                        } else {
                            return [
                                h('button', { className: 'btn btn-secondary btn-grid', onClick: () => add_item_to_cart(cart, row.cells[0].data) }, (html('<i class="bi bi-plus-square"></i>'))),
                                h('button', { className: 'btn btn-secondary btn-grid', onClick: () => subtract_item_to_cart(cart,row.cells[0].data) }, (html('<i class="bi bi-dash-square"></i>'))),
                                h('button', { className: 'btn btn-secondary btn-grid', onClick: () => remove_product_from_cart(cart,row.cells[0].data)}, (html('<i class="bi bi-trash"></i>'))),
                                ]

                        }
                        
                    }
                }
            } 
        ], 
        data: cart.map(item => [item.id, item.name, utilities.render_money_string(item.price), item.quanty, utilities.render_money_string(item.subtotal)])
    });
    
    
    grid.render(document.getElementById('cash_register_cart_grid'))
    let new_grid = document.getElementById('cash_register_cart_grid')
    let gridjs_container = new_grid.childNodes[0]


    gridjs_container.style.width = ''
    // let pre_wrapper_grid = gridjs_container.childNodes[0]
    // let wrapper_grid = pre_wrapper_grid.childNodes[0]
    // wrapper_grid.style.backgroundColor = 'green'
    // let header_grid_title = document.createElement('h4')
    // header_grid_title.textContent = 'Total: '
    // header_grid.appendChild(header_grid_title)

}

function edit_quanty(cart, id){
    $('#edit_quanty_modal').modal('show')
    $('#edit_quanty_input').focus()
    cart_id = id
    cart_to_edit = cart

}

edit_quanty_btn.addEventListener('click', () => {
    if(edit_quanty_form.checkValidity()){
        edit_item_on_cart(cart_to_edit, cart_id, edit_quanty_input.value)
        $('#edit_quanty_modal').modal('hide')
        edit_quanty_input.value = ''
    }
    
  
})

function remove_product_from_cart(cart, id) {
    cart.forEach(item => {
        if (item.id == id){
            let index = cart.indexOf(item)
            cart.splice(index,1)
        }       
    })
    render(cart)
    total_label.dispatchEvent(new Event('input'))
}

function add_item_to_cart(cart, id){
    let index = -1
    cart.forEach(item => {
        if (item.id == id){
            index = cart.indexOf(item)
        }       
    })
    let quanty = cart[index].quanty
    cart[index].quanty = quanty + 1
    cart[index].subtotal = cart[index].quanty * cart[index].price
    render(cart)
    total_label.dispatchEvent(new Event('input'))
}

function edit_item_on_cart(cart, id, value){
    let index = -1
    cart.forEach(item => {
        if (item.id == id){
            index = cart.indexOf(item)
        }       
    })
    let quanty = cart[index].quanty
    cart[index].quanty = value
    cart[index].subtotal = cart[index].quanty * cart[index].price

    if(cart[index].quanty == 0){
        remove_product_from_cart(cart, cart[index].id)
    }
    render(cart)
    total_label.dispatchEvent(new Event('input'))
}

function subtract_item_to_cart(cart, id){
    let index = -1
    cart.forEach(item => {
        if (item.id == id){
            index = cart.indexOf(item)
        }       
    })
    let quanty = cart[index].quanty
    if (quanty == 1){
        remove_product_from_cart(cart, id)
    } else {
        cart[index].quanty = quanty - 1
        cart[index].subtotal = cart[index].quanty * cart[index].price
        render(cart)
        total_label.dispatchEvent(new Event('input'))
    }
}

function remove_order_from_cart(cart, order){
    // Funcione que elimine 
}

module.exports = {render, subtract_item_to_cart}