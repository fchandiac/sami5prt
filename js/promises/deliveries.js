
const config = require('../config')
const server_url = 'http://localhost:' + config.port

function create(order_id, phone, address, transfer){
    let data = {'order_id':order_id, 'phone':phone, 'address':address, 'transfer':transfer}
    const delivery = new Promise((resolve, reject) => {
        fetch(server_url + '/deliveries/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            res.json().then(res => {
                if (res.code == 0){
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
        
    })
    return delivery
}


function find_one_by_order(order_id,){
    let data = {'order_id':order_id}
    const delivery = new Promise((resolve, reject) => {
        fetch(server_url + '/deliveries/find_one_by_order', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            res.json().then(res => {
                if (res.code == 0){
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
        
    })
    return delivery
}

module.exports = {create, find_one_by_order}