const express = require('express')
const products = require('../server/controllers/products')
const router = express.Router()


router.post('/products/create', (req, res) => {
    products.create(req.body.name, req.body.code, req.body.category_id, req.body.price_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/update_full', (req, res) => {
    products.update_full(req.body.id, req.body.name, req.body.code, req.body.category_id, req.body.price_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/update_no_price', (req, res) => {
    products.update_no_price(req.body.id, req.body.name, req.body.code, req.body.category_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/products/find_all', (req, res) => {
    products.find_all().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/destroy', (req, res) => {
    products.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/find_one_by_name', (req, res) => {
    products.find_one_by_name(req.body.name).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/find_one_by_id', (req, res) => {
    products.find_one_by_id(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/find_one_by_code', (req, res) => {
    products.find_one_by_code(req.body.code).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/find_all_by_code', (req, res) => {
    products.find_all_by_code(req.body.code).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/products/find_all_favorites', (req, res) => {
    products.find_all_favorites().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/update_favorite', (req, res) => {
    products.update_favorite(req.body.id, req.body.favorite).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/update_ticket', (req, res) => {
    products.update_ticket(req.body.id, req.body.ticket).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



module.exports = router