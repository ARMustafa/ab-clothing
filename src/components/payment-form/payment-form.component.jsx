// import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useSelector } from 'react-redux';

// import { selectCartTotal } from '../../redux/cart/cart.selectors';
// import { selectCurrentUser } from '../../redux/user/user.selectors';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    // const amount = useSelector(selectCartTotal);
    // const currentUser = useSelector(selectCurrentUser);
    // const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // setIsProcessingPayment(false);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 })
        }).then((res) => {
            return res.json();
        });

        const clientSecret = response.paymentIntent.client_secret;


        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                // billing_details: {
                //     name: currentUser ? currentUser.displayName : 'Guest',
                // },
            }
        });

        if (result.error) {
            alert(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
            }
        }

    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
            <CardElement />
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;

// disabled={isProcessingPayment}