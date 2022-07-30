const {Taxes} = require("../db");
const taxes = {}

//code = 1, representa promesa ejecutada
// code = 0, representa promesa rechazada

async function create(name, value){
    const tax = await Taxes.create({
            name: name,
            value: value
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return tax
}

async function find_all(){
    const taxes =  await Taxes.findAll().then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return taxes
}

async function update(id, name, value){
    const tax = await Taxes.update(
        { name: name,
         value: value},
        { where: { id: id } }
    ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return tax
}

async function find_one_by_id(id){
    const tax = await Taxes.findOne({where:{id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return tax
}

taxes.create = create
taxes.find_all = find_all
taxes.update = update
taxes.find_one_by_id = find_one_by_id
module.exports = taxes