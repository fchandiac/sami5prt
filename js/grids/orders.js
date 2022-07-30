const { Grid, Cell, h, html } = require("gridjs")
const translate = require("./translate_grid")
const utilities = require('../utilities')
const config = require('../config')
const server_url = 'http://localhost:' + config.port
const orders = require('../promises/orders')
const orders_detail_grid = require('./order_detail')

function render(){
    let items_per_page = parseInt(((window.screen.availHeight*0.67)/50))

    let old_grid = document.getElementById('orders_grid')
    old_grid.remove()
    let container_grid = document.getElementById('orders_grid_container')
    container_grid.appendChild(utilities.grid_container('orders_grid'))

    var grid = new Grid({
        
        search: true,
        sort: true,
        pagination: { limit:items_per_page},
        language: translate.es_ES,
        columns: [
            {name: 'Id Pedido',  width: '14%'},
            {name: 'Estado',  width: '14%',
            formatter: (cell, row) => {
                if (row.cells[1].data == 1) {
                    {return [
                        h('label', { className: 'text-success'}, (html('Cerrado'))),   
                    ]
                    }
                } else if (row.cells[1].data == 0){
                    {return [
                        h('label', { className: 'text-danger'}, (html('Pendiente'))),   
                    ]
                    }
                }    
                
            }
            },
            {name: 'Mesa', width: '11%' },
            {name: 'Fecha',  width: '15%'},
            {name: 'hora',  width: '15%'},
            // {name: 'Enviado',  width: '12%'},
            {name: 'Opciones',width: '20%', sort: false, 
            formatter: (cell, row) => {
                if (row.cells[1].data == 1) {
                    {return [
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => detail(row.cells[0].data) }, (html('<i class="bi bi-three-dots"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => destroy(row.cells[0].data)}, (html('<i class="bi bi-trash"></i>')))    
                    ]
                    }
                } else if (row.cells[1].data == 0){
                    {return [
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => detail(row.cells[0].data) }, (html('<i class="bi bi-three-dots"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => order_close(row.cells[0].data) }, (html('<i class="bi bi-x-square"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => destroy(row.cells[0].data)}, (html('<i class="bi bi-trash"></i>')))     
                    ]
                    }
                } 
                    
                }
            },
            {name: 'st',  width: '0%', hidden: true},

        ], 
        server: {
            url: server_url + '/orders/find_all', 
            then: data => data.data.map(item =>
                [   item.id,
                    item.state,
                    render_table_strgin(item.table),
                    moment(item.createdAt).format('DD-MM-yyyy'), 
                    moment(item.createdAt).format("HH:mm:ss"),
                    // procces_printed(item.printed),
                    procces_state(item.state),
            ])
        } 
    });
    
    
    grid.render(document.getElementById('orders_grid'))
    let new_grid = document.getElementById('orders_grid')
    let gridjs_container = new_grid.childNodes[0]
    gridjs_container.style.width = ''
}

function procces_state(state){
    let state_string = ''
    if (state == 1){
        state_string = 'Cerrado'
    } else if (state == 0){
        state_string = 'Pendiente'
    }

    return state_string
}

function procces_printed(printed){
    let printed_string = ''
    if (printed == 1){
        printed_string = 'SI'
    } else if (printed == 0){
        printed_string = 'NO'
    }

    return printed_string
}

function detail(id){
    orders.find_all_by_order(id)
    .then(order => {
        // console.log(order)
        orders_detail_grid.render(order, id)
        $('#order_detail_modal').modal('show')
    })
    
}

function destroy(id) {
    orders.destroy_by_id(id)
    .then(res => {
        utilities.show_alert('El pedido fue eliminado exitosamente.', '')
        render()
    })
    .catch(err => {console.log(err)})
}

function order_close(id){
    orders.update_state(id, true)
    .then(res => {
        render()
    })
    .catch(err => {
        console.log(err)
    })
}

function render_table_strgin(table){
    let string = 'Sin Asignación'
    if (table == null){
        string = 'Sin Asignación'
    } else if (table == 0){
        string = 'Sin Asignación'
    }else if (table <=10){
        string = 'M'+table
    } else if (table >=11 ){
        string = 'D'+(table -10)
    }
    return string
}

module.exports = {render}