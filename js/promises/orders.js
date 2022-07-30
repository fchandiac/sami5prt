const config = require('../config')
const server_url = 'http://localhost:' + config.port


function create(note){
    let data = {'note':note}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/create', {
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
    return order
}

function create_delivery(note){
    let data = {'note':note}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/create_delivery', {
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
    return order
}

function create_detail(order_id, product_id, quanty){
    let data = {'order_id':order_id, 'product_id':product_id, 'quanty':quanty}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/orders_details/create', {
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
    return product
}


function find_all_by_order(order_id){
    let data = {'order_id':order_id}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/orders_details/find_all_by_order', {
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
    return product
}

function find_one_by_id(id){
    let data = {'id':id}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/find_one_by_id', {
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
    return order

}

function destroy_by_id(id){
    let data = {'id':id}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/destroy_by_id', {
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
    return order
}

function update_state(id, state){
    let data = {'id':id, 'state':state}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/update_state', {
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
    return order
}

function destroy_close_orders(){
    const orders = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/destroy_close_orders', {
            method: 'GET',
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
    return orders
}

function destroy_past_orders(today){
    let data = {'today': today}
    const orders = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/destroy_past_orders', {
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
    return orders
}

function update_table(id, table){
    let data = {'id':id, 'table':table}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/update_table', {
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
    return order
}

function update_printed(id){
    let data = {'id':id}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/update_printed', {
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
    return order
}

function find_all_by_table_open (table){
    let data = {'table':table}
    const order = new Promise((resolve, reject) => {
        fetch(server_url + '/orders/find_all_by_table_open', {
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
    return order

}


module.exports = {create, 
    create_detail, 
    find_all_by_order, 
    find_one_by_id, 
    destroy_by_id,
    update_state,
    destroy_close_orders,
    destroy_past_orders,
    update_table,
    find_all_by_table_open,
    update_printed,
    create_delivery
}