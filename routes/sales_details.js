const express = require('express')
const router = express.Router()
const sales_detail = require('../server/controllers/sales_details')


router.post('/sales_detail/create', (req, res) => {
    sales_detail.create(req.body.sale_id, req.body.price_id, req.body.product_id, req.body.category_id, req.body.quanty, req.body.subtotal).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/sales_details/find_all', (req, res) => {
    sales_detail.find_all().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales_details/find_all_by_date_range_group_by_category', (req, res) => {
    sales_detail.find_all_by_date_range_group_by_category(req.body.start_date, req.body.end_date).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales_details/find_all_by_date_range_group_by_product', (req, res) => {
    sales_detail.find_all_by_date_range_group_by_product(req.body.start_date, req.body.end_date).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales_details/find_all_by_date_range', (req, res) => {
    sales_detail.find_all_by_date_range(req.body.start_date, req.body.end_date).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales_details/find_all_by_date_range_and_category', (req, res) => {
    sales_detail.find_all_by_date_range_and_category(req.body.start_date, req.body.end_date, req.body.category_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales_details/find_total_by_date_range', (req, res) => {
    sales_detail.find_total_by_date_range(req.body.start_date, req.body.end_date).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales_details/find_total_by_date_range_and_category', (req, res) => {
    sales_detail.find_total_by_date_range_and_category(req.body.start_date, req.body.end_date, req.body.category_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = router