const config = require('../config')
const prices = require('./prices')
const server_url = 'http://localhost:' + config.port

var locale = Array.from(config.locale)
locale = locale[2]
locale = parseInt(locale)

function create(amount, payment_method){
    let data = {'amount': amount, 'payment_method':payment_method}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/create', {
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

function sale_detail(id){
    let data = {'id': id}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/find_one_by_id', {
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

function destroy_by_id(id){
    let data = {'id': id}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/destroy_by_id', {
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

function find_all_by_month_and_year(month, year){
    let data = {'month': month, 'year': year}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/find_all_by_month_and_year', {
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

function find_one_min_create(){
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/find_one_min_create', {
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
    return sale


}



function find_all_by_date_range(start_date, end_date){
   
    start_date = start_date + 'T00:00:00Z'
    end_date = end_date + 'T23:59:59Z'
    let data = {'start_date': start_date, 'end_date': end_date}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/find_all_by_date_range', {
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


function find_one_by_date(date){
    let data = {'date': date}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/find_one_by_date', {
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

function find_all_by_date_range_group_by_date(start_date, end_date){
    
    start_date = start_date + 'T00:00:00Z'
    start_date = moment(start_date).add(locale,'hours')
    end_date = end_date + 'T23:59:59Z'
    end_date = moment(end_date).add(locale,'hours')

    let data = {'start_date': start_date, 'end_date': end_date}
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + '/sales/find_all_by_date_range_group_by_date', {
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



module.exports = {create, sale_detail, 
                destroy_by_id, 
                find_all_by_month_and_year,
                find_one_min_create,
                find_all_by_date_range,
                find_one_by_date,
                find_all_by_date_range_group_by_date
            }