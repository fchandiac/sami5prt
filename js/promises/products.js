const config = require('../config')
const prices = require('./prices')
const server_url = 'http://localhost:' + config.port


// Esta defberia ser la forma correcta de administrar las promesas, para las situaciones de error con bases de datos y otros

function create_from_form(name, code, category_id, tax_id, purchase_price, sale_price){
    const product = new Promise((resolve, reject) => {
        //Promise.all([validate_name(name), validate_code(code)])
        validate_name(name)
        .then(
            prices.create(tax_id, purchase_price, sale_price)
            .then(price => {
                create(name, code, category_id, price.id)
                .then(res => resolve(res))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        )
        .catch(err => reject(err))
    })
    return product
}

function destroy(id){
    let data = {'id':id}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/destroy', {
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
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/find_one_by_id', {
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


function find_all(){
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/find_all', {
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
    return product
}

function find_one_by_name(name){
    let data = {'name':name}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/find_one_by_name', {
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

function find_one_by_code(code){
    let data = {'code':code}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/find_one_by_code', {
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


function find_all_by_code(code){
    let data = {'code':code}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/find_all_by_code', {
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

function create(name, code, category_id, price_id){
    let data = {'name':name,'code':code, 'category_id':category_id, 'price_id':price_id}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/create', {
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

function update_full(id, name, code, category_id, price_id){
    let data = {'id':id, 'name':name,'code':code, 'category_id':category_id, 'price_id':price_id}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/update_full', {
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

function update_no_price(id, name, code, category_id){
    let data = {'id':id, 'name':name,'code':code, 'category_id':category_id}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/update_no_price', {
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

function validate_name(name){
    const product = new Promise((resolve, reject) => {
        find_one_by_name(name)
        .then(res => {
            if (res == null){
                resolve()
            } else {
                reject({'msg':'name not unique'})
            }
        })
        .catch(err => {
            reject(err)
        })
    })
    return product
}

function validate_code(code){
    const product = new Promise((resolve, reject) => {
        find_one_by_code(code)
        .then(res => {
            if (res == null){
                resolve()
            } else {
                reject({'msg':'code not unique'})
            }
        })
        .catch(err => {
            reject(err)
        })
    })
    return product
}

function find_all_favorites(){
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/find_all_favorites', {
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
    return product
}

function update_favorite(id, favorite){
    let data = {'id':id, 'favorite':favorite}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/update_favorite', {
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

function update_ticket(id, ticket){
    let data = {'id':id, 'ticket':ticket}
    const product = new Promise((resolve, reject) => {
        fetch(server_url + '/products/update_ticket', {
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



module.exports = {
    create, 
    destroy, 
    find_one_by_id, 
    find_one_by_code, 
    find_one_by_name, 
    create_from_form, 
    update_full, 
    update_no_price,
    validate_code,
    validate_name,
    find_all,
    find_all_favorites,
    update_favorite,
    find_all_by_code,
    update_ticket
}