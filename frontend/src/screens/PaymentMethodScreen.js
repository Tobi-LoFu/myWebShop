import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import CheckOutSteps from '../components/CheckOutSteps';
import { useNavigate } from 'react-router-dom';

function PaymentMethodScreen() {
    const navigate = useNavigate()
    const {state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: {shippingAddress, paymentMethod }
    } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'Paypal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName});
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder')
    }

    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <div className="container small-container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className="my-3">Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="Paypal"
                            label="Paypal"
                            value="Paypal"
                            checked={paymentMethodName === 'Paypal'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="Stripe"
                            label="Stripe"
                            value="Stripe"
                            checked={paymentMethodName === 'Stripe'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Button variant='primary' type='submit'>
                            Proceed
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PaymentMethodScreen