const express = require("express")

const router = express.Router()

const controller = require("./controller.js")

router.post('/createOrder/:amount', controller.createOrder)
router.post('/payOrder', controller.payOrder)
router.post('/orderCallback', controller.orderCallback)
router.post('/checkPayment', controller.checkPayment)

router.post('/capturePayment', controller.capturePayment)

module.exports = router
