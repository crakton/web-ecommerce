import React from 'react';
import { PaystackButton } from 'react-paystack';
import api from '../../config/api';

const PaystackPayment = ({ amount, email, setIsProcessing, handleOrderSuccess }) => {
  const publicKey = 'pk_test_6bd575a6439037e4b48d69d5666c03620b0e3fd8'; // replace with your public key

  const componentProps = {
    email,
    amount: amount * 100,
    publicKey,
    text: 'Pay Now',
    onSuccess: async (response) => { // make the onSuccess async
      console.log('Success:', response);
      setIsProcessing(false);
      handleOrderSuccess();

      try {
        const verified = await api.post("/payments/verify-payment", { reference: response?.reference });
        console.log('Payment verified:', verified);
      } catch (error) {
        console.log('Payment verification failed:', error);
      }
    },
    onClose: () => alert("Payment closed"),
  };

  return <PaystackButton className='p-5 w-full absolute' {...componentProps} />;
};

export default PaystackPayment;
