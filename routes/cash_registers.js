const express = require('express')
const cash_registers = require('../server/controllers/cash_registers')
const router = express.Router()

router.post('/chash_registers/create', (req, res) => {
    cash_registers.create(
        req.body.state,
        req.body.balance,
        ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router