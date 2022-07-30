const { Categories } = require("../db");
const categories = {}

// async function create(name){
//     try{
//         const categorie = await Categories.create({
//             name: name
//         })
//         console.log(categorie)
//         return categorie
//     } catch (err){
//         console.log(err)
//         return err.errors[0].message
//     }
// }

async function create(name){
    const categorie = await Categories.create({
            name: name
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return categorie
   
}

async function find_all(){
    try{
        const categories =  await Categories.findAll()
        console.log(categories)
        return categories
    } catch (err){
        console.log(err)
        return err
    }    
}

async function update(id, name){
    const categorie = await Categories.update(
        { name: name },
        { where: { id: id } }
    ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return categorie
}


categories.create = create
categories.find_all = find_all
categories.update = update
module.exports = categories