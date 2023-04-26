const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {

    const { cart } = JSON.parse(event.body)

    const lineItems = cart.map((product) => ({
        price_data: {
            currency: 'pln',
            product_data: {
                name: product.name,
            },
            unit_amount: product.price
        },
        quantity: product.qty,
    }))

    console.log(lineItems)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'p24', 'blik'],
        line_items: lineItems, 
        mode: 'payment',
        success_url: `${process.env.URL}/success`,
        cancel_url: `${process.env.URL}/cancel`
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            id: session.id
        })
    }
}