import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import LargeSpinner from '../../component/spinner/LargeSpinner';
import SmallSpinner from '../../component/spinner/SmallSpinner';

const bookin_data = {
    name: "sampodnath",
    email: "sampodnath@gmail.com"
}


const ChackoutFrom = ({ calculatePrice }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)

    const [clientSecret, setClientSecret] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [transitionId, setTransitionId] = useState('')

    useEffect(() => {
        const loadDate = async () => {
            setIsLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_DEV_URL}/create-payment-intent`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `${localStorage.getItem('tech_token')}`,
                },
                calculatePrice
            })

            if (response.data.success) {
                setClientSecret(response.data.clientSecret)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        }
        loadDate()
    }, [calculatePrice])
    const handleSubmit = async (e) => {
        setErrorMessage('')
        setSuccessMessage('')
        setIsLoading(true)
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        setIsLoading(true)
        if (paymentMethodError) {
            setErrorMessage(paymentMethodError.message)
            console.log(paymentMethodError.message);
            return
        } else {
            setErrorMessage('')
        }
        setIsLoading(true)
        const { paymentIntent, error: paymentIntentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: bookin_data.name,
                        email: bookin_data.email
                    },
                },
            },
        );

        if (paymentIntentError) {
            setErrorMessage(paymentMethodError.message)
            console.log(paymentMethodError.message);
            setIsLoading(false)
            return
        } else {
            setErrorMessage('')
            setIsLoading(false)
        }
        if (paymentIntent.id) {
            setSuccessMessage(`payment successfull.Your transition id:${paymentIntent.id}`)
            setTransitionId(paymentIntent.id)
            setIsLoading(false)
        } else {
            setIsLoading(false)

        }
       
    }

    if(isLoading){
        <LargeSpinner/>
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='rounded-xl px-3 py-2 mt-5 border-2 bg-green-500 font-bold text-lg disabled:text-slate-300 disabled:bg-slate-600' type="submit" disabled={!stripe || !elements || !clientSecret || isLoading}>
                {isLoading ? <SmallSpinner/> : "Pay"}
            </button>
            {
                errorMessage && <p className='text-lg rounded-lg border-2 border-red-500 text-center text-red-500'>{errorMessage}</p>
            }
            {
                successMessage && <p className='text-green-600 font-bold capitalize text-center'>{successMessage}</p>
            }
        </form>
    );
};

export default ChackoutFrom;