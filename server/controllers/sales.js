const sequelize = require('sequelize')
const {Sales} = require('../db');
const {SalesDetails} = require('../db')
const {Products} = require('../db')
const {Categories} = require('../db')
const {Prices} = require('../db')
const moment = require('moment');
const sales = {}


async function create(amount, payment_method){
    const sale = await Sales.create({
        amount: amount,
        payment_method: payment_method
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return sale
}

async function find_all(){
    const sale =  await Sales.findAll(
       {include: SalesDetails}
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_one_by_id(id){
    const sale = await Sales.findOne(
        {where: {id:id},
        include: [{model:SalesDetails, include: [{model:Products, include:[Categories, Prices]}]}]}
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function destroy_by_id(id){
    const sale = await Sales.destroy({where:{id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_all_by_month_and_year(month, year){
    const sale = await Sales.findAll(
        {where: [sequelize.where(sequelize.fn('MONTH', sequelize.col('created_at')), month),
        sequelize.where(sequelize.fn('YEAR', sequelize.col('created_at')), year)] 
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_all_by_date_range(start_date, end_date){
    const sale = await Sales.findAll({
        
        attributes: [
            'id',
            'amount',
            'payment_method',
            
            [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
            [sequelize.fn('TIME', sequelize.col('created_at')), 'time'],
            'created_at'],
        // where: [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), date)]
        where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}},
        order: [[sequelize.col('created_at'), 'DESC']], 
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_all_by_date_range_group_by_date(start_date, end_date){

    const sale = await Sales.findAll({
        
        
        attributes: [
            [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
            
            // [sequelize.fn('TIME', sequelize.col('created_at')), 'time'],
            // 'created_at'
        ],
        // where: [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), date)]
        where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}},
        group: ['date'],
        order: [[sequelize.col('date'), 'ASC']],   
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}
// async function find_all_by_date_range_group_by_category(start_date, end_date){
//     const sale = await Sales.findAll({
     
//         // sort: ['createdAt', 'DESC'],
//         // attributes: [
//         //     [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
//         //     [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
//         // ],
//         // group: ['date'],
//         include: [{model:SalesDetails, include: [{model:Products, include:[Categories, Prices]}]}],
//         // where: [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), date)]
//         where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}}     
//     }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
//     return sale
// }

async function find_all_one_date(date){
    //console.log('esta es la date     ------> :'+ date)
    const sale = await Sales.findOne({
        
        attributes: [
            [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
            //[sequelize.cast(sequelize.fn('SUM', sequelize.col('amount')), 'int'), 'total_amount']
            [sequelize.fn('SUM', sequelize.col('amount')), 'total_amount'],
        ],
        group: ['date'],
        where: 
        [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), date)]
        //where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}}     
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_one_min_create(){
    const sale = await Sales.findOne(
        // {attributes: [sequelize.fn('MIN', sequelize.col('created_at'))]}
        {order: [
            [sequelize.literal('created_at'), 'asc']
     ]}
    ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    console.log(sale)
    return sale
}
sales.create = create
sales.find_all = find_all
sales.find_one_by_id = find_one_by_id
sales.destroy_by_id = destroy_by_id
sales.find_all_by_month_and_year = find_all_by_month_and_year
sales.find_one_min_create = find_one_min_create
sales.find_all_by_date_range = find_all_by_date_range
sales.find_all_one_date = find_all_one_date
sales.find_all_by_date_range_group_by_date = find_all_by_date_range_group_by_date
module.exports = sales