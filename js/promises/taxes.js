const config = require('../config')
const server_url = 'http://localhost:' + config.port

function create(name, value){
    let data = {'name':name, 'value':value}
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + '/taxes/create', {
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
    return tax
}

function find_all(){
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + '/taxes/find_all', {
            method: 'GET',
            body: JSON.stringify(),
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
    return tax
}

function update(id, name, value){
    let data = {'id':id,'name':name, 'value':value}
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + '/taxes/update', {
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
    return tax
}

function find_one_by_id(id){
    let data = {'id':id}
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + '/taxes/find_one_by_id', {
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
    return tax
}

module.exports = {create, find_all, update, find_one_by_id}