
const {Stocks, Products} = require("../db");
const stock = {}

async function create(product_id, room, warehouse){
    const stock = await Stocks.create({
        product_id: product_id,
        room: room,
        warehouse: warehouse
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return stock
}

async function find_all(){
    const stock = await Stocks.findAll({
        include: Products
    }  
    ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return stock
}

async function destroy(id){
    const stock = await Stocks.destroy({where:{id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return stock
}

async function update(id, room, warehouse){
    const stock = await Stocks.update({
        room: room,
         warehouse: warehouse
        }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return stock
}

async function update_room(id, room){
    const stock = await Stocks.update({
        room: room,
        }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return stock
}

async function find_one_by_product_id(product_id){
    const stock = await Stocks.findOne({where:{product_id:product_id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return stock
}


stock.create = create
stock.findAll = find_all
stock.destroy = destroy
stock.update = update
stock.update_room = update_room
stock.find_one_by_product_id = find_one_by_product_id
module.exports = stock