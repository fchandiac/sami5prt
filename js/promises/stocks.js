const config = require('../config')
const server_url = 'http://localhost:' + config.port

function create(product_id, room, warehouse){
    let data = {'product_id':product_id, 'room':room, 'warehouse':warehouse}
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + '/stocks/create', {
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
    return stock
}

function find_one_by_product_id(product_id){
    let data = {'product_id':product_id}
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + '/stocks/find_one_by_product_id', {
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
    return stock
}

function update(id, room, warehouse){
    let data = {'id':id, 'room':room, 'warehouse':warehouse}
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + '/stocks/update', {
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
    return stock
}

function update_room(id, room){
    let data = {'id':id, 'room':room}
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + '/stocks/update_room', {
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
    return stock
}

function destroy(id){
    let data = {'id':id}
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + '/stocks/destroy', {
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
    return stock
}

module.exports = {create, update, destroy, find_one_by_product_id, update_room}