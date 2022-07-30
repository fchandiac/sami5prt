const config = require('../config')
const prices = require('./prices')
const server_url = 'http://localhost:' + config.port
const sales = require('./sales')
const price = require('./prices')

var locale = Array.from(config.locale)
locale = locale[2]
locale = parseInt(locale)



function create(sale_id, price_id, product_id, category_id, quanty, subtotal){
    //let subtotal = 0
    // price.find_by_id(price_id).then(res => subtotal = (res.data.sale * quanty)).catch(err => {res.json(err)})

    let data = {'sale_id':sale_id, 'price_id':price_id, 'product_id':product_id, 'category_id':category_id, 'quanty':quanty, 'subtotal':subtotal}
    const sale_detail = new Promise((resolve, reject) => {
        fetch(server_url + '/sales_detail/create', {
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
    return sale_detail
}

function find_all_by_date_range_group_by_category(start_date, end_date){
   
    start_date = start_date + 'T00:00:00Z'
    start_date = moment(start_date).add(locale,'hours')
    end_date = end_date + 'T23:59:59Z'
    end_date = moment(end_date).add(locale,'hours')
    // end_date = moment(end_date).add(1,'d')
    // end_date = moment(end_date).format('yyyy-MM-DD') + 'T03:59:59Z'
    let data = {'start_date': start_date, 'end_date': end_date}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales_details/find_all_by_date_range_group_by_category', {
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
    return sale
}

function find_all_by_date_range_group_by_product(start_date, end_date){

    start_date = start_date + 'T00:00:00Z'
    start_date = moment(start_date).add(locale,'hours')
    end_date = end_date + 'T23:59:59Z'
    end_date = moment(end_date).add(locale,'hours')

    // start_date = start_date + 'T03:00:00Z'
    // end_date = moment(end_date).add(1,'d')
    // end_date = moment(end_date).format('yyyy-MM-DD') + 'T03:59:59Z'
    let data = {'start_date': start_date, 'end_date': end_date}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales_details/find_all_by_date_range_group_by_product', {
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
    return sale
}


function find_all_by_date_range(start_date, end_date){


    start_date = start_date + 'T00:00:00Z'
    start_date = moment(start_date).add(locale,'hours')
    end_date = end_date + 'T23:59:59Z'
    end_date = moment(end_date).add(locale,'hours')

    // start_date = start_date + 'T03:00:00Z'
    // end_date = moment(end_date).add(1,'d')
    // end_date = moment(end_date).format('yyyy-MM-DD') + 'T03:59:59Z'
    let data = {'start_date': start_date, 'end_date': end_date}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales_details/find_all_by_date_range', {
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
    return sale
}

function find_total_by_date_range(start_date, end_date){
    
    start_date = start_date + 'T00:00:00Z'
    start_date = moment(start_date).add(locale,'hours')
    end_date = end_date + 'T23:59:59Z'
    end_date = moment(end_date).add(locale,'hours')

    let data = {'start_date': start_date, 'end_date': end_date}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales_details/find_total_by_date_range', {
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
    return sale
}

function find_all_by_date_range_and_category(start_date, end_date, category_id){
    
    start_date = start_date + 'T00:00:00Z'
    start_date = moment(start_date).add(locale,'hours')
    end_date = end_date + 'T23:59:59Z'
    end_date = moment(end_date).add(locale,'hours')

    let data = {'start_date': start_date, 'end_date': end_date, 'category_id': category_id}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales_details/find_all_by_date_range_and_category', {
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
    return sale
}



function find_total_by_date_range_and_category(start_date, end_date, category_id){
    
    start_date = start_date + 'T00:00:00Z'
    start_date = moment(start_date).add(locale,'hours')
    end_date = end_date + 'T23:59:59Z'
    end_date = moment(end_date).add(locale,'hours')

    let data = {'start_date': start_date, 'end_date': end_date, 'category_id': category_id}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales_details/find_total_by_date_range_and_category', {
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
    return sale
}

module.exports = {create,
    find_all_by_date_range_group_by_category,
    find_all_by_date_range_group_by_product,
    find_all_by_date_range,
    find_total_by_date_range,
    find_all_by_date_range_and_category,
    find_total_by_date_range_and_category
}