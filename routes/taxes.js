const express = require('express')
const taxes = require('../server/controllers/taxes')
const router = express.Router()

router.post('/taxes/create', (req, res) => {
    taxes.create(req.body.name, req.body.value).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/taxes/find_all', (req, res) => {
    taxes.find_all().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/taxes/update', (req, res) => {
    taxes.update(req.body.id, req.body.name, req.body.value).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/taxes/find_one_by_id', (req, res) => {
    taxes.find_one_by_id(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



module.exports = router