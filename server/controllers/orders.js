const { Orders } = require('../db')
const sequelize = require('sequelize')
const orders = {}

async function create (note){
    const order = await Orders.create({
        note:note
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function create_delivery (note){
    const order = await Orders.create({
        note:note,
        delivery:true
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function find_all() {
    const orders = await Orders.findAll({
        order: [[sequelize.col('id'), 'DESC']]
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return orders
} 


async function find_one_by_id(id) {
    const order = await Orders.findOne({
        where: {id:id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function destroy_by_id(id){
    const order = await Orders.destroy({
        where: {id:id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function update_state(id, state){
    const order = await Orders.update({
        state: state
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function update_printed(id){
    const order = await Orders.update({
        printed: true
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function update_table(id, table){
    const order = await Orders.update({
        table: table
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function destroy_close_orders(){
    const orders = await Orders.destroy({where: {state:true}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return orders
}

async function destroy_past_orders(today){
    const orders = await Orders.destroy({
        where: {
            created_at : {[sequelize.Op.lt]: today}
        }
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return orders
}

async function find_all_by_table_open(table){
    const details = await Orders.findAll({
        where: {table: table, state: 0}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return details
}

orders.create = create
orders.find_all = find_all
orders.find_one_by_id = find_one_by_id
orders.destroy_by_id = destroy_by_id
orders.update_state = update_state
orders.destroy_close_orders = destroy_close_orders
orders.destroy_past_orders = destroy_past_orders
orders.update_table = update_table
orders.find_all_by_table_open = find_all_by_table_open
orders.update_printed = update_printed
orders.create_delivery = create_delivery


module.exports = orders