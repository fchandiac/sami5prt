const { Grid, Cell, h, html } = require("gridjs")
const translate = require("./translate_grid")
const utilities = require('../utilities')
const config = require('../config')
const server_url = 'http://localhost:' + config.port
const products = require('../promises/products')
const prices = require('../promises/prices')
const moment = require('moment');

const name_product_update_input = document.getElementById('name_product_update_input')
const code_product_update_input = document.getElementById('code_product_update_input')
const sale_value_update_input = document.getElementById('sale_value_update_input')
const purchase_value_update_input = document.getElementById('purchase_value_update_input')
const category_select_update = document.getElementById('category_select_update')
const taxes_select_update = document.getElementById('taxes_select_update')
const update_product_btn = document.getElementById('update_product_btn')
const destroy_msg = document.getElementById('destroy_msg')
const destroy_modal_btn = document.getElementById('destroy_modal_btn')

utilities.config_money_input(sale_value_update_input)



var old_name = ''
var old_code = ''
var old_category_id = 0
var old_tax_id = 0
var old_sale_price = 0
var old_purchase_price = 0
var update_id = 0
var destroy_id = 0



function render(){
    let items_per_page = parseInt(((window.screen.availHeight*0.67)/50))

    let old_grid = document.getElementById('products_grid')
    old_grid.remove()
    let container_grid = document.getElementById('products_grid_container')
    container_grid.appendChild(utilities.grid_container('products_grid'))
    
    
    var grid = new Grid({
        
        search: true,
        sort: true,
        pagination: { limit:items_per_page},
        language: translate.es_ES,
        columns: [{name: 'Id', width: '0%', hidden: true},
            {name: 'Producto',  width: '23%'},
            {name: 'Código',  width: '22%'},
            {name: 'Categoría',  width: '21%'},
            {name: 'Precio',  width: '13%'},
            {name: 'Favorite', width: '0%', hidden: true},
            {name: 'Ticket', width: '0%', hidden: true},
            {name: 'Opciones',width: '20%', sort: false, 
            formatter: (cell, row) => {
    
                if (row.cells[5].data == false && row.cells[6].data == false){return [
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => update(row.cells[0].data, row.cells[1].data) }, (html('<i class="bi bi-pencil-square"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => destroy(row.cells[0].data, row.cells[1].data)}, (html('<i class="bi bi-trash"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => favorite(row.cells[0].data)}, (html('<i class="bi bi-heart"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => ticket(row.cells[0].data)}, (html('<i class="bi bi-printer"></i>'))),
                    ]
                } else if (row.cells[5].data == true && row.cells[6].data == false){return [
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => update(row.cells[0].data, row.cells[1].data) }, (html('<i class="bi bi-pencil-square"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => destroy(row.cells[0].data, row.cells[1].data)}, (html('<i class="bi bi-trash"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => unfavorite(row.cells[0].data)}, (html('<i class="bi bi-heart-fill"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => ticket(row.cells[0].data)}, (html('<i class="bi bi-printer"></i>'))),
                    ]
                } else if (row.cells[5].data == true && row.cells[6].data == true){return [
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => update(row.cells[0].data, row.cells[1].data) }, (html('<i class="bi bi-pencil-square"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => destroy(row.cells[0].data, row.cells[1].data)}, (html('<i class="bi bi-trash"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => unfavorite(row.cells[0].data)}, (html('<i class="bi bi-heart-fill"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => unticket(row.cells[0].data)}, (html('<i class="bi bi-printer-fill"></i>'))),
                    ]
                } else if (row.cells[5].data == false && row.cells[6].data == true){return [
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => update(row.cells[0].data, row.cells[1].data) }, (html('<i class="bi bi-pencil-square"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => destroy(row.cells[0].data, row.cells[1].data)}, (html('<i class="bi bi-trash"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => favorite(row.cells[0].data)}, (html('<i class="bi bi-heart"></i>'))),
                    h('button', { className: 'btn btn-secondary btn-grid', onClick: () => unticket(row.cells[0].data)}, (html('<i class="bi bi-printer-fill"></i>'))),
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
                utilities.render_money_string(product.Price.sale),
                product.favorite,
                product.ticket

                // moment(product.createdAt).format('DD-MM-YYYY'), 
                // moment(product.updatedAt).format('DD-MM-YYYY')
            ])
        } 
    });
    
    
    grid.render(document.getElementById('products_grid'))
    let new_grid = document.getElementById('products_grid')
    let gridjs_container = new_grid.childNodes[0]

    gridjs_container.style.width = ''
    let header_grid = gridjs_container.childNodes[1]
    let header_grid_title = document.createElement('h5')
    header_grid_title.textContent = 'Productos'
    header_grid.appendChild(header_grid_title)
}

//--------- DESTROY -----------//

function destroy(id, name){
    destroy_id = id
    destroy_msg.innerText = '¿Desea eliminar definitivamente el producto: ' + name + '?'
    $('#destroy_msg_modal').modal('show')
    destroy_modal_btn.addEventListener('click', fn_click_destroy)
}

function fn_click_destroy(event) {
    destroy_product(destroy_id)
}

function destroy_product(destroy_id){
    products.destroy(destroy_id)
        .then(res => {
            destroy_msg.innerText = ''
            console.log(res)
            render()
            $('#destroy_msg_modal').modal('hide')
        })
        .catch(err => {
            console.log(err)
            utilities.render_money_string(err.errors[0].message, 'err')
        })
    destroy_modal_btn.removeEventListener("click", fn_click_destroy)
}


//--------- UPDATE -----------//

function update(id){
    update_id = id
    $('#update_product_modal').modal('show')
    products.find_one_by_id(id)
    .then(res => {
        old_name = res.name
        old_code = res.code
        old_category_id = res.category_id
        old_tax_id = res.Price.tax_id
        old_sale_price = res.Price.sale
        
        utilities.list_categories_on_select(category_select_update, old_category_id) // load categries on select and preset category
        utilities.list_taxes_on_select(taxes_select_update, old_tax_id) // load taxes on select  and present tax
        
        name_product_update_input.value = old_name
        code_product_update_input.value = old_code
        sale_value_update_input.value = utilities.render_money_string(old_sale_price)
    }) 
    
}

update_product_btn.addEventListener('click', () => {
    update_product(update_id) 
})

function update_product(id){
    let new_sale_price = utilities.input_money_to_int(sale_value_update_input.value)
    let new_name = name_product_update_input.value
    let new_code = code_product_update_input.value
    let new_tax_id = parseInt(taxes_select_update.value)
    let new_category_id = parseInt(category_select_update.value)


    if (new_code == old_code && new_name == old_name){
        process_update_product(id, new_name, new_code, new_category_id, new_sale_price,new_tax_id)
    } else if (new_name == old_name){
        process_update_product(id, new_name, new_code, new_category_id, new_sale_price,new_tax_id)
    } else if (new_code == old_code){
        products.validate_name(new_name)
        .then(res => {
            process_update_product(id, new_name, new_code, new_category_id, new_sale_price, new_tax_id)
            console.log(res)
        })
        .catch(err => {
            utilities.show_alert('El nombre del producto ya existe.', 'err')
            console.log(err)
        })
    } else {
        //Promise.all([products.validate_code(new_code), products.validate_name(new_name)])
        products.validate_name(new_name)
        .then(res => {
            process_update_product(id, new_name, new_code, new_category_id, new_sale_price, new_tax_id)
            console.log(res)
        })
        .catch(err => {
            if (err.msg == 'name not unique'){
                utilities.show_alert('El nombre del producto ya existe.', 'err')
            } else if (err.msg == 'code not unique'){
                utilities.show_alert('El código ya existe.', 'err')
            }
            console.log(err)
        })
    }
}
function process_update_product(id,new_name, new_code, new_category_id, new_sale_price, new_tax_id){
    if (old_sale_price != new_sale_price || new_tax_id != old_tax_id){
        prices.create(new_tax_id, new_sale_price)
        .then(new_price => {
            products.update_full(id,new_name, new_code, new_category_id, new_price.id)
            .then(res => {
                console.log(res)
                on_resolve_update()
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    } else {
        products.update_no_price(id,new_name, new_code, new_category_id)
        .then(res => {
            console.log(res)
            on_resolve_update()
        })
        .catch(err => console.log(err))
    }
}

function on_resolve_update(){
    name_product_update_input.value = ''
    code_product_update_input.value = ''
    sale_value_update_input.value = '$ 0'
    utilities.show_alert('Se Actualizo exitosamente el producto.')
    render()
    $('#update_product_modal').modal('hide')
}


function unfavorite(id){
    products.update_favorite(id, false).then( res => {
        render()
    })
    
}

function favorite(id){
    products.update_favorite(id, true).then(res => {
        render()
    })
}

function ticket(id){
    products.update_ticket(id, true).then(res => {
        render()
    })
}

function unticket(id){
    products.update_ticket(id, false).then(res => {
        render()
    })
}

module.exports = {render}