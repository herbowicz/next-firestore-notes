import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import Button from '../components/Button'

const Shop = () => {

    const cart = [{
        id: 1,
        name: "Multisport",
        description: "Połowa opłaty za 2 karty Multisport dla dzieci",
        slug: "/products/multisport",
        price: 4000,
        qty: 1
    }]

    const processPayment = async () => {
        const newCart = cart.map(({ id, name, price, qty }) => ({ id, name, price, qty }))
        const url = './.netlify/functions/charge'

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
        const { data } = await axios.post(url, { cart: newCart })
        await stripe.redirectToCheckout({ sessionId: data.id })

    }

    return (
        <div className="container">
            <h3>Shop</h3>
            <hr />
            <p>
                <span>Buy your favourite items</span>
            </p>
            <Button variant="success" onClick={processPayment}>Multisport (40 PLN)</Button>{' '}
            <Button variant="secondary" disabled={true} onClick={() => {}}>1000 Credits (10 PLN)</Button>
        </div>
    )
}

export default Shop