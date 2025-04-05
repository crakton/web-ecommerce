import React from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({amount, email}) => {
  const publicKey = 'pk_test_392c3f84a9a492459289386a4917045513366763'; // replace with your public key

  const componentProps = {
    email,
    amount:(amount * 100),
    publicKey,
    text: 'Pay Now',
    onSuccess: (response) => {
      console.log('Success:', response);
      // verify payment on backend here
    },
    onClose: () => alert("Payment closed"),
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackPayment;
