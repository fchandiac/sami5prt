const express = require('express')
const orders_details = require('../server/controllers/orders_details')
const router = express.Router()

router.post('/orders_details/create', (req,res) => {
    orders_details.create(req.body.order_id, req.body.product_id, req.body.quanty).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders_details/find_all_by_order', (req, res) => {
    orders_details.find_all_by_order(req.body.order_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})





module.exports = router