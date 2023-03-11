const app = require('express')()
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')

app.use(cors())

const razorpay = new Razorpay({
    key_id: 'rzp_test_Mhe0iWXkuICNRK',
    key_secret: 'QQUkFPr1gqcWaUWDqcRBJocV',
})

app.post('/razorpay', async (req, res) => {

    const payment_capture = 1
    const amount = 500
    const currency = 'INR'

    const options = {
        amount: (amount*100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
    }
    
    const response = await razorpay.orders.create(options)
    console.log(response)
    res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        
    })
})

app.listen(1337, () => {
    console.log("Listening on 1337")
})

// rzp_test_Mhe0iWXkuICNRK
// QQUkFPr1gqcWaUWDqcRBJocV