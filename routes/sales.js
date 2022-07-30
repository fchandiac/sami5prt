const express = require('express')
const router = express.Router()
const sales = require('../server/controllers/sales')

router.post('/sales/create', (req, res) => {
    sales.create(req.body.amount, req.body.payment_method).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/sales/find_all', (req, res) => {
    sales.find_all().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/find_one_by_id', (req,res) => {
    sales.find_one_by_id(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/destroy_by_id', (req,res) => {
    sales.destroy_by_id(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/find_all_by_month_and_year', (req, res) => {
    sales.find_all_by_month_and_year(req.body.month, req.body.year).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/find_all_by_date_range', (req, res) => {
    sales.find_all_by_date_range(req.body.start_date, req.body.end_date).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


router.post('/sales/find_all_by_date_range_group_by_date', (req, res) => {
    sales.find_all_by_date_range_group_by_date(req.body.start_date, req.body.end_date).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


router.post('/sales/find_one_by_date', (req, res) => {
    sales.find_all_one_date(req.body.date).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


router.get('/sales/find_one_min_create', (req, res) => {
    sales.find_one_min_create().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
module.exports = router