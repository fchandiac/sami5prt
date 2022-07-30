const { Grid, Cell, h, html } = require("gridjs")
const translate = require("./translate_grid")
const utilities = require('../utilities')
const config = require('../config')
const server_url = 'http://localhost:' + config.port
const total_label = document.getElementById('total_label')
const cash_register_cart_grid = require('./cash_register_cart')


function render(cart){
    let items_per_page = parseInt(((window.screen.availHeight*0.52)/50))
    let old_grid = document.getElementById('products_finder_grid')
    old_grid.remove()
    let container_grid = document.getElementById('products_finder_grid_container')
    container_grid.appendChild(utilities.grid_container('products_finder_grid'))

    var grid = new Grid({
        search: true,
        sort: true,
        pagination: { limit: items_per_page },
        language: translate.es_ES,
        columns: [
            {name: 'Id', width: '0%', hidden: true},
            {name: 'Producto',  width: '40%'},
            {name: 'Código',  width: '30%'},
            {name: 'Categoría',  width: '30%'},
            {name: 'Precio',  width: '0%', hidden: true},
            {name: 'tax',  width: '0%', hidden: true},
            // {name: 'Creado',  width: '14%'},
            // {name: 'Actualizado',  width: '15%'},
            {name: 'Opciones',width: '9%', sort: false, 
            formatter: (cell, row) => {
                    {return [
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => add_to_cart(row.cells[0].data, row.cells[1].data, row.cells[4].data, row.cells[5].data, cart)}, (html('<i class="bi bi-cart-plus"></i>')))    
                    ]
                    }
                }
            } 
        ], 
        // sort: {
        //     multiColumn: true
        // },
        server: {
            url: server_url + '/products/find_all', 
            then: data => data.data.map(product =>
                [product.id, 
                product.name,
                product.code,
                product.Category.name,
                product.Price.sale,
                product.Price.tax_id
            ])
        } 
    });
    
    
    grid.render(document.getElementById('products_finder_grid'))
    let new_grid = document.getElementById('products_finder_grid')
    let gridjs_container = new_grid.childNodes[0]

    gridjs_container.style.width = ''
    let header_grid = gridjs_container.childNodes[1]
    let header_grid_title = document.createElement('h6')
    header_grid_title.textContent = 'Buscador de productos'
    header_grid.appendChild(header_grid_title)
}

function add_to_cart(id, name, price, tax_id, cart){
    add_item_to_cart(id, name, price, 1, price, tax_id, cart)
    //add_item_to_cart(100, 'dhdh', 600, 1, 400, cart)
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
    cash_register_cart_grid.render(cart)
    total_label.dispatchEvent(new Event('input'))
   
}


module.exports = {render}