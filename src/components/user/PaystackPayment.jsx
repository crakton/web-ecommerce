import React from 'react';
import { PaystackButton } from 'react-paystack';
import api from '../../config/api';

const PaystackPayment = ({amount, email, setIsProcessing, handleOrderSuccess}) => {
  const publicKey = 'pk_test_392c3f84a9a492459289386a4917045513366763'; // replace with your public key

  const componentProps = {
    email,
    amount:(amount * 100),
    publicKey,
    text: 'Pay Now',
    onSuccess: (response) => {
      console.log('Success:', response);
      setIsProcessing(false)
      handleOrderSuccess()
      // verify payment on backend here
    },
    onClose: () => alert("Payment closed"),
  };

  return <PaystackButton className=' p-5 w-full absolute '  {...componentProps} />

   
};

export default PaystackPayment;
