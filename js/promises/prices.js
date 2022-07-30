const config = require('../config')
const server_url = 'http://localhost:' + config.port

function create(tax_id, sale){
    let data = {'tax_id':tax_id, 'sale':sale}
    const price = new Promise((resolve, reject) => {
        fetch(server_url + '/prices/create', {
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
    return price
}

function find_by_id(price_id){
    let data = {'price_id':price_id}
    const price = new Promise((resolve, reject) => {
        fetch(server_url + '/prices/find_by_id', {
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
    return price
}

module.exports = {create, find_by_id}