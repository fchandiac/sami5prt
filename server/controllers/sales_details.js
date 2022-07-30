const {SalesDetails} = require ('../db')
const {Products} = require('../db')
const {Categories} = require('../db')
const {Prices} = require('../db')
const {Sales} = require('../db')
const sales_details = {}
const sequelize = require('sequelize')



async function create(sale_id, price_id, product_id, category_id, quanty, subtotal){
    const sale_detail = await SalesDetails.create({
        sale_id: sale_id, 
        price_id: price_id,
        product_id: product_id,
        category_id: category_id, 
        quanty: quanty,
        subtotal: subtotal
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return sale_detail
}

async function find_all(){
    const sale_detail = await SalesDetails.findAll({
        // attributes: ['Product.category_id'],
        include: {model:Products, include:[Categories]}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {
        console.log(err)
        return {'code': 0, 'data':err}})
    return sale_detail
}

async function find_all_by_date_range_group_by_category(start_date, end_date){
    const sale = await SalesDetails.findAll({
        attributes: [
            [sequelize.col('Product.category_id'), 'category_id'],
            [sequelize.col('Product.Category.name'), 'category_name'],
            [sequelize.col('subtotal'), 'subtotal']
            //[sequelize.fn('sum', sequelize.col('subtotal')), 'total_amount'],
        ],
        include: [{model: Products, include: Categories}],
        //group: ['category_id'],
        //where: [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), start_date)]
        where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}},
        //order: [[sequelize.col('total_amount'),'DESC']]
  
    }).then(data => { 
        // var data_map = 
        const categories =[...new Set(data.map(i => i.category_id))] 
        const data_map = data.map(i => ({'id':i.Product.CategoryId, 'subtotal':i.subtotal, 'name':i.Product.Category.name}))
        const group = []
        categories.forEach(id => {
            let category = data_map.filter(i => i.id == id)
            let subtotals = category.map(i => i.subtotal)
            let total = 0
            subtotals.forEach(i => {total = total + i})
            group.push({'category_id':id,'category_name':category[0].name, 'total_amount':total})
        })
        return {'code': 1, 'data': group}
    }).catch(err => {return {'code': 0, 'data':err}})

    return sale

}

//////////// OLD QUERY //////
// async function find_all_by_date_range_group_by_category(start_date, end_date){
//     const sale = await SalesDetails.findAll({
//         attributes: [
//             'CategoryId',
//             [sequelize.fn('sum', sequelize.col('subtotal')), 'total_amount'],
//         ],
//         include: Categories,
//         where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}},
//         group: ['CategoryId'],
//         order: [[sequelize.col('total_amount'),'DESC']]
//     }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
//     return sale
// }

async function find_all_by_date_range_group_by_product(start_date, end_date){
    const sale = await SalesDetails.findAll({
 
        attributes: [
            'ProductId',
            [sequelize.fn('sum', sequelize.col('subtotal')), 'total_amount'],
        ],
        include: Products,
        group: ['ProductId'],
        //where: [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), start_date)]
        where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}},
        order: [[sequelize.col('total_amount'),'DESC']]
  
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}
///////////////////////////////////
async function find_all_by_date_range_and_category(start_date, end_date, category_id){
    const sale = await SalesDetails.findAll({
        // attributes:[
        //     [sequelize.col('Product.category_id')],
     
        // ],
        include: [{model: Products, include: [{model: Categories}, {model: Prices}]}, {model: Sales}],
        where: {
            createdAt: {[sequelize.Op.between]: [start_date, end_date]}, 
            '$Product.category_id$': category_id},
         order: [[sequelize.col('createdAt'), 'DESC']],
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_all_by_date_range(start_date, end_date){
    const sale = await SalesDetails.findAll({
        include: [{model: Products, include: [{model: Categories}, {model: Prices}]}, {model: Sales}],
        where: {
            createdAt: {[sequelize.Op.between]: [start_date, end_date]},
            },
        order: [[sequelize.col('createdAt'), 'DESC']],
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_total_by_date_range(start_date, end_date){
    const sale = await SalesDetails.findAll({
        attributes: [
            [sequelize.fn('sum', sequelize.col('subtotal')), 'total_amount'],
        ],
        //include: [{model: Categories}, {model: Products, include: Prices}],
        where: {
            createdAt: {[sequelize.Op.between]: [start_date, end_date]},
            },
        //order: [[sequelize.col('createdAt'), 'DESC']],
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_total_by_date_range_and_category(start_date, end_date, category_id){
    const sale = await SalesDetails.findAll({
        attributes: [
            [sequelize.fn('sum', sequelize.col('subtotal')), 'total_amount'],
        ],
        //include: [{model: Categories}, {model: Products, include: Prices}],
        where: {
            createdAt: {[sequelize.Op.between]: [start_date, end_date]},
            CategoryId: category_id
            },
        //order: [[sequelize.col('createdAt'), 'DESC']],
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}




sales_details.create = create
sales_details.find_all = find_all
sales_details.find_all_by_date_range_group_by_category = find_all_by_date_range_group_by_category
sales_details.find_all_by_date_range_group_by_product = find_all_by_date_range_group_by_product
sales_details.find_all_by_date_range_and_category = find_all_by_date_range_and_category
sales_details.find_all_by_date_range = find_all_by_date_range
sales_details.find_total_by_date_range = find_total_by_date_range
sales_details.find_total_by_date_range_and_category = find_total_by_date_range_and_category

module.exports = sales_details


// Project.findAll({ 
//     attributes: {
//         include: [[Sequelize.cast(Sequelize.fn('COUNT', Sequelize.col('tasks.id')), 'INTEGER'), 'tasksCount']],
//     },
//     include: {
//         model: Task,
//         attributes: []
//     },
//     group: [Sequelize.col('projects.id'), Sequelize.col('tasks.id')]
// })