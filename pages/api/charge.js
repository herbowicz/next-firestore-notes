import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {

    const { body: { cart } } = req

    const lineItems = cart.map((product) => ({
        price_data: {
            currency: 'pln',
            product_data: {
                name: product.name,
            },
            unit_amount: product.price,
        },
        quantity: product.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'p24', 'blik'],
        line_items: lineItems, 
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    })

    return res.status(200).json({
        id: session.id
    })
}