const Deliveries = require('../db').Deliveries
const deliveries = {}

async function create (order_id, phone, address, transfer){
    const delivery = await Deliveries.create({
        order_id:order_id, phone:phone, address:address, transfer:transfer
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return delivery

}

async function find_one_by_order(order_id){
    const delivery = await Deliveries.findOne({
        where: {order_id:order_id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return delivery
}

deliveries.create = create
deliveries.find_one_by_order = find_one_by_order

module.exports = deliveries