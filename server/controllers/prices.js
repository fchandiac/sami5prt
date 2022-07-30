const { Prices } = require("../db");
const prices = {}

async function create(tax_id, sale){
    const price = await Prices.create({
        tax_id: tax_id,
        sale: sale
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return price
}

async function find_all(){
    const prices = await Prices.findAll().then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return prices
}

async function fin_by_id(price_id){
    const price = await Prices.findOne().then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return price
}

prices.create = create
prices.find_all = find_all
prices.fin_by_id = fin_by_id
module.exports = prices