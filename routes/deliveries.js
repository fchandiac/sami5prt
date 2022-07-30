const express = require('express')
const router = express.Router()

const deliveries = require('../server/controllers/deliveries')


router.post('/deliveries/create', (req, res) => {
    deliveries.create(
        req.body.order_id,
        req.body.phone,
        req.body.address,
        req.body.transfer
    ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/deliveries/find_one_by_order', (req, res) => {
    deliveries.find_one_by_order(req.body.order_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router