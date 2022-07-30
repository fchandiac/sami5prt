const express = require('express')
const prices = require('../server/controllers/prices')
const router = express.Router()

router.post('/prices/create', (req, res) => {
    prices.create(req.body.tax_id, req.body.sale).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/prices/find_all', (req, res) => {
    prices.find_all().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/prices/find_by_id', (req, res) => {
    prices.fin_by_id(req.body.price_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router