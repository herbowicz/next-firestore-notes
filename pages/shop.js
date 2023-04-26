import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import Button from '../components/Button'

const Shop = () => {

    const cart = [{
        id: 1,
        name: "Multisport",
        description: "Opłata 40 zł za Karty Multisport",
        slug: "/products/multisport",
        price: 4000, // in pennies
        quantity: 1
    }]

    const processPayment = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}/api/charge`

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
        const { data } = await axios.post(url, { cart })
        console.log('DATA', data)

        await stripe.redirectToCheckout({ sessionId: data.id })
    }

    return (
        <div className="container">
            <h3>Shop</h3>
            <p>
                <span>Buy your favourite items</span>
            </p>
            <Button variant="success" onClick={processPayment}>Multisport (40 PLN)</Button>{' '}
            <Button variant="secondary" disabled={true} onClick={() => {}}>1000 Credits (10 PLN)</Button>
        </div>
    )
}

export default Shop