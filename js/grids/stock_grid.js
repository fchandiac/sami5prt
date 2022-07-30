const { Grid, Cell, h, html } = require("gridjs")
const translate = require("./translate_grid")
const utilities = require('../utilities')
const config = require('../config')
const server_url = 'http://localhost:' + config.port
const stock = require('../promises/stocks')
const updta_stock_title = document.getElementById('updta_stock_title')
const warehouse_update_stock_input = document.getElementById('warehouse_update_stock_input')
const room_update_stock_input = document.getElementById('room_update_stock_input')

const edit_stock_modal_btn = document.getElementById('edit_stock_modal_btn')
const edit_stock_form = document.getElementById('edit_stock_form')
const edit_stock_modal = document.getElementById('edit_stock_modal')

var stock_id = 0

function render(){
    let items_per_page = parseInt(((window.screen.availHeight*0.67)/50))

    let old_grid = document.getElementById('stock_grid')
    old_grid.remove()
    let container_grid = document.getElementById('stock_grid_container')
    container_grid.appendChild(utilities.grid_container('stock_grid'))
    
    
    
    var grid = new Grid({
        
        search: true,
        sort: true,
        pagination: { limit:items_per_page},
        language: translate.es_ES,
        columns: [{name: 'Id', width: '0%', hidden: true},
            {name: 'Id Producto',  width: '15%'},
            {name: 'Producto',  width: '40%'},
            {name: 'Sala',  width: '14%'},
            {name: 'Bodega',  width: '14%'},
            {name: 'total',  width: '14%', 
            formatter:(cell, row) => {
                    return (row.cells[3].data + row.cells[4].data )
                }
            },
            {name: 'Opciones',width: '10%', sort: false, 
            formatter: (cell, row) => {
                    {return [
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => update(row.cells[0].data, row.cells[2].data, row.cells[3].data, row.cells[4].data) }, (html('<i class="bi bi-pencil-square"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => destroy(row.cells[0].data, row.cells[1].data)}, (html('<i class="bi bi-trash"></i>')))    
                    ]
                    }
                }
            } 
        ], 
        server: {
            url: server_url + '/stocks/find_all', 
            then: data => data.data.map(item =>
                [item.id,
                    item.product_id,
                    item.Product.name,
                    item.room,
                    item.warehouse
                // moment(product.createdAt).format('DD-MM-YYYY'), 
                // moment(product.updatedAt).format('DD-MM-YYYY')
            ])
        } 
    });
    
    
    grid.render(document.getElementById('stock_grid'))
    let new_grid = document.getElementById('stock_grid')
    let gridjs_container = new_grid.childNodes[0]
    gridjs_container.style.width = ''
}


function update(id, product, room, warehouse){
    //console.log(id, product, room, warehouse)
    stock_id = id
    updta_stock_title.innerText = "Actualizar Stock " + product
    room_update_stock_input.value = room
    warehouse_update_stock_input.value = warehouse
    $('#edit_stock_modal').modal('show')
}

edit_stock_modal_btn.addEventListener('click', () => {
    if(edit_stock_form.checkValidity()){
        stock.update(stock_id, room_update_stock_input.value, warehouse_update_stock_input.value)
        .then(res => {
            $('#edit_stock_modal').modal('hide')
            render()
        })
    }
})

function destroy(id){
    stock.destroy(id)
    render()

}

module.exports = {render}

