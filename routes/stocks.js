const express = require('express')
const stocks = require('../server/controllers/stocks')
const router = express.Router()

router.post('/stocks/create', (req, res) => {
    stocks.create(req.body.product_id, req.body.room, req.body.warehouse).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



router.post('/stocks/find_one_by_product_id', (req, res) => {
    stocks.find_one_by_product_id(req.body.product_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/stocks/update', (req, res) => {
    stocks.update(req.body.id, req.body.room, req.body.warehouse).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
router.post('/stocks/update_room', (req, res) => {
    stocks.update_room(req.body.id, req.body.room).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
router.post('/stocks/destroy', (req, res) => {
    stocks.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/stocks/find_all', (req, res) => {
    stocks.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = router