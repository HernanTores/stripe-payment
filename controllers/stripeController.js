const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeController = async (req, res) => {
    const {total_amount, shipping_fee} = req.body

    const total = () => {
        return total_amount + shipping_fee
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total(),
        currency: 'usd'
    })
    return res.json({clientSecret: paymentIntent.client_secret})
}

module.exports = stripeController