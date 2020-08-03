import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

class StripePayment extends React.Component {

    render() {
        const stripePromise = loadStripe("pk_test_Egzk9dR5UgqqBUZbuYh8PPGl00qSk4jnXl");

        return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
        );
    }
};

export default StripePayment;