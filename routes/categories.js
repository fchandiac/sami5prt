const express = require('express')
const categories = require('../server/controllers/categories')
const router = express.Router()

router.post('/categories/create', (req, res) => {
    categories.create(req.body.name).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/categories/find_all', (req, res) => {
    categories.find_all().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/categories/update', (req, res) => {
    categories.update(req.body.id, req.body.name).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router