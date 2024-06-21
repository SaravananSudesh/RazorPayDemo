const Razorpay = require('razorpay')
const {validatePaymentVerification, validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const axios = require('axios')
const formidable = require('formidable')
const creds = require('./razorpay')

const key_id = creds.key_id
const key_secret = creds.key_secret

var instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret
})

const createOrder = async(req,res) => {
    try {

        const receiptId = String(Math.random().toString(36).slice(2))
        const amount = req.params.amount

        const response = await instance.orders.create({
            "amount": amount,
            "currency": "INR",
            "receipt": receiptId,
            "partial_payment": false
        })

        res.status(200).send(response)

    } catch (error) {
        res.status(403).send({ "message" : error })
    }
}

const payOrder = async(req,res) => {
    try {
        
        let data = {
            'key_id': key_id,
            'name': 'Test Corp',
            'order_id': req.body.order_id,
            'amount': req.body.amount,
            'currency': 'INR',
            'callback_url': 'http://localhost:3000/api/orderCallback'
        }

        let headers = { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'responseType': 'text'
        }

        axios.post('https://api.razorpay.com/v1/checkout/embedded', data, { headers: headers })
        .then((response) => {
            res.status(200).send(response.data)
        })
        .catch((error) => {
            res.status(403).send({ "message" : error })
        })

    } catch (error) {
        res.status(403).send({ "message" : error })
    }
}

const orderCallback = async(req,res) => {
    try {

        const form = formidable.formidable({})
        form.parse(req, (err, fields, files) => {
            if (err) {
              next(err)
              return
            }
            // res.status(200).send({
            //     'razorpay_payment_id': fields.razorpay_order_id[0],
            //     'razorpay_order_id': fields.razorpay_order_id[0],
            //     'razorpay_signature': fields.razorpay_signature[0]
            // })

            const razorpay_order_id = fields.razorpay_order_id[0]

            return res.writeHead(301, {
                Location: `http://localhost:4200/validate/${razorpay_order_id}`
            }).end()
        })

    } catch (error) {
        
    }
}

const checkPayment = async(req,res) => {
    try {
        const razorpay_signature = req.body.razorpay_signature
        const razorpay_order_id = req.body.razorpay_order_id
        const razorpay_payment_id = req.body.razorpay_payment_id

        const validity = validatePaymentVerification({
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id
        }, razorpay_signature, key_secret)

        if (validity === true) {
            return res.status(200).send({
                success: true
            })
        }
        else {
            return res.status(200).send({
                success: false
            })
        }
    } catch (error) {
        res.status(403).send({ "message" : error })
    }
}

const capturePayment = async(req,res) => {
    try {

        const response = await instance.payments.all({
            count: 10
        })

        return res.status(200).send(response)
        
    } catch (error) {
        res.status(403).send({ "message" : error })
    }
}

module.exports = { createOrder, payOrder, orderCallback, checkPayment, capturePayment }