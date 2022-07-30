const express = require('express')
const router = express.Router()
const orders = require('../server/controllers/orders')


router.post('/orders/create', (req, res) => {
    orders.create(req.body.note).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/create_delivery', (req, res) => {
    orders.create_delivery(req.body.note).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/orders/find_all', (req, res) => {
    orders.find_all().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/find_one_by_id', (req, res) => {
    orders.find_one_by_id(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/destroy_by_id', (req, res) => {
    orders.destroy_by_id(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/update_state', (req,res) => {
    orders.update_state(req.body.id, req.body.state).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


router.post('/orders/update_printed', (req,res) => {
    orders.update_state(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
router.get('/orders/destroy_close_orders', (req, res) => {
    orders.destroy_close_orders().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/destroy_past_orders', (req, res) => {
    orders.destroy_past_orders(req.body.today).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/update_table', (req,res) => {
    orders.update_table(req.body.id, req.body.table).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/find_all_by_table_open', (req, res) => {
    orders.find_all_by_table_open(req.body.table).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

const print = require('../js/printer')



router.get('/print', (req, res) => {
    print.print_test()
    //console.log('hahaha')
    res.send('se imprimio?')
    
})





module.exports = router