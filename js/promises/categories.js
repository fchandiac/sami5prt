const config = require('../config')
const server_url = 'http://localhost:' + config.port

function create(name){
    let data = {'name':name}
    const category = new Promise((resolve, reject) => {
        fetch(server_url + '/categories/create', {
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
    return category
}

function updtae(id, name){
    let data = {'id':id,'name':name}
    const category = new Promise((resolve, reject) => {
        fetch(server_url + '/categories/update', {
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
            console.log(err.errors.message)
            reject(err)
        })
    })
    return category
}

module.exports = {create, updtae}