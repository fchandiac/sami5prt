const { OrdersDetails, Products, Prices } = require('../db')
const sequelize = require('sequelize')
const orders_details = {}

async function create(order_id, product_id, quanty) {
    const detail = await OrdersDetails.create({
        order_id : order_id, 
        product_id: product_id, 
        quanty: quanty
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return detail
}

async function find_all_by_order(order_id){
    const details = await OrdersDetails.findAll({
        include: {model:Products, include:[Prices]},
        where: {order_id: order_id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return details
}

// async function find_all_by_table_open(table){
//     const details = await OrdersDetails.findAll({
//         where: {table: table, status: 0}
//     }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
//     return details
// }

orders_details.create = create
orders_details.find_all_by_order = find_all_by_order


module.exports = orders_details