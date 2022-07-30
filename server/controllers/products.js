const { Products, Categories, Taxes, Prices} = require("../db");
const products = {}
const sequelize = require('sequelize')

async function create(name, code, category_id, price_id){
    
    const product = await Products.create({
        name: name,
        code: code,
        category_id: category_id,
        price_id: price_id
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
        
    return product
 
}
// {include: [{model: Categories}, {model: Taxes}]}

async function find_all(){

    const products =  await Products.findAll(
        {
            include: [{model: Categories}, 
            {model: Prices}],
            order: [[sequelize.literal('name'), 'asc']]
        }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return products 
}

async function destroy(id){
    const product = await Products.destroy({where:{id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

async function find_one_by_name(name){
    const product = await Products.findOne({
        where: {name:name},
        include: [{model: Categories}, {model: Prices}]}
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

async function find_one_by_code(code){
    const product = await Products.findOne({
        where: {code:code},
        include: [{model: Categories}, {model: Prices}]}
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

async function find_all_by_code(code){
    const product = await Products.findAll({
        where: {code:code},
        include: [{model: Categories}, {model: Prices}]}
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

async function find_one_by_id(id){
    const product = await Products.findOne({
        where: {id:id},
        include: [{model: Categories}, {model: Prices}]}
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

async function update_full(id, name, code, category_id, price_id){
    const product = await Products.update({
            name: name,
            code: code,
            category_id: category_id,
            price_id: price_id
        }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

async function update_no_price(id, name, code, category_id){
    const product = await Products.update({
            name: name,
            code: code,
            category_id: category_id,
        }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

async function update_favorite(id, favorite){
    const product = await Products.update({
        favorite:favorite
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
return product
}

async function update_ticket(id, ticket){
    const product = await Products.update({
        ticket:ticket
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
return product
}

async function find_all_favorites(){
    const product = await Products.findAll({
        include: [{model: Categories}, 
            {model: Prices}],
        where: {favorite: true}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return product
}

products.create = create
products.find_all = find_all
products.destroy = destroy
products.find_one_by_name = find_one_by_name
products.find_one_by_id = find_one_by_id
products.find_one_by_code = find_one_by_code
products.update_full = update_full
products.update_no_price = update_no_price
products.find_all_favorites = find_all_favorites
products.update_favorite = update_favorite
products.find_all_by_code = find_all_by_code
products.update_ticket = update_ticket
// products.update = update
module.exports = products