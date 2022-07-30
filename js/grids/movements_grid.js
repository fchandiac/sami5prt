const { Grid, Cell, h, html } = require("gridjs")
const translate = require("./translate_grid")
const utilities = require('../utilities')
const config = require('../config')
const sales = require('../promises/sales')
const sale_detail_grid = require('./sale_detail')
const moment = require('moment');
const fs = require('fs')
const path = require('path');
const destroy_msg = document.getElementById('destroy_msg')
const destroy_modal_btn = document.getElementById('destroy_modal_btn')


const id_total_sale_detail_label = document.getElementById('id_total_sale_detail_label')

var sale_remove_id = 0
var sale_remove_amount = 0

function render(){

    let items_per_page =  parseInt(((window.screen.availHeight*0.63)/55))
    let old_grid = document.getElementById('movements_grid')
    old_grid.remove()
    let container_grid = document.getElementById('movements_grid_container')
    container_grid.appendChild(utilities.grid_container('movements_grid'))

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../movements.json')
    const rawdata = fs.readFileSync(filePath)
    const movements_json = JSON.parse(rawdata);
    let movs = movements_json.movements
    movs.reverse()

    var grid = new Grid({
        
        
        search: true,
        sort: true,
        pagination: { limit: items_per_page},
        language: translate.es_ES,
        columns: [
            {name: 'Indice',  width: '10%'},
            {name: 'Información movimiento de caja',  width: '32%'},
            {name: 'Monto',  width: '18%'},
            {name: 'Balance',  width: '8%'},
            {name: 'Fecha',width: '25%',},
            {name: 'Hora',width: '25%',},
            {name: 'sale_id', hidden: true},
            {name: 'Opciones',width: '15%', sort: false, 
            formatter: (cell, row) => {
                let sale_info_array = row.cells[1].data.split(' ')
                if (sale_info_array[0] == 'Venta'){
                    {return [
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => detail(row.cells[6].data, row.cells[2].data) }, (html('<i class="bi bi-three-dots"></i>'))),
                        h('button', { className: 'btn btn-secondary btn-grid', onClick: () => remove(row.cells[6].data, row.cells[2].data)}, (html('<i class="bi bi-trash"></i>')))    
                    ]
                    }
                }
                }
            } 
        ], 
        data: movs.map(item => [movs.indexOf(item),item.type, utilities.render_money_string(item.amount), utilities.render_money_string(item.balance), moment(item.fecha).format('DD-MM-yyyy'), moment(item.fecha).format("HH:mm:ss"), item.sale_id])
    });
    
    
    grid.render(document.getElementById('movements_grid'))
    let new_grid = document.getElementById('movements_grid')
    let gridjs_container = new_grid.childNodes[0]
    gridjs_container.style.width = ''


    // let content = gridjs_container.childNodes[1]
    // let div = document.createElement('div')
    // div.classList.add("total-box")
    // let label = document.createElement('label')
    // label.classList.add("total-label")
    // label.innerText = 'Balance: '

    // let label_balance = document.createElement('label')
    // label_balance.classList.add("total-label")
    // label_balance.id = 'balance_label'
    // label_balance.innerText = 'jhfg'

    


    // div.appendChild(label)
    // div.appendChild(label_balance)
    // content.appendChild(div)




}

function remove(sale_id, amount){
    
    destroy_msg.innerText = '¿Desea eliminar definitivamente la venta id: ' + sale_id + '?'
    $('#destroy_msg_modal').modal('show')
    sale_remove_id = sale_id
    sale_remove_amount = utilities.input_money_to_int(amount) * -1
    destroy_modal_btn.addEventListener('click', fn_click_remove)

}

function fn_click_remove(event){
    remove_sale(sale_remove_id, sale_remove_amount)

}
function remove_sale(sale_remove_id, sale_remove_amount){
    const movements = require('../movements')
    const sales = require('../promises/sales')
    // movements.remove_sale_movement(sale_remove_id)
    let info_sale_remove = 'Eliminación venta ' + sale_remove_id
    movements.add_movement( info_sale_remove, 6, sale_remove_amount, (movements.calc_balance() + sale_remove_amount))
    movements.edit_type_sale_moevement(sale_remove_id)
    sales.destroy_by_id(sale_remove_id)
    movements.render_balance()
    render()
    $('#destroy_msg_modal').modal('hide')
    destroy_modal_btn.removeEventListener("click", fn_click_remove)
}

function detail(sale_id, total){
    // let sale_info_array = type.split(' ')
    // let sale_id = parseInt(sale_info_array[1])
    let string_sale_info = 'Id: ' + sale_id + ' - Total venta: ' + total
    $('#sale_detail_modal').modal('show')
    id_total_sale_detail_label.innerText = string_sale_info
    let sale_detail = []
    sales.sale_detail(sale_id).then(sale => {
        sale_detail_grid.render(sale.salesdetails)
        sale.salesdetails.forEach( detail => {
            sale_detail.push(detail)
        })
    })
    // console.log(sale_detail)
}

module.exports = {render}