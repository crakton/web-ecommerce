// import React from 'react';
// import { PaystackButton } from 'react-paystack';
// import api from '../../config/api';

// const PaystackPayment = ({ amount, email, setIsProcessing, handleOrderSuccess }) => {
//   const publicKey = 'pk_test_6bd575a6439037e4b48d69d5666c03620b0e3fd8'; // replace with your public key

//   const componentProps = {
//     email,
//     amount: amount * 100,
//     publicKey,
//     text: 'Pay Now',
//     onSuccess: async (response) => { // make the onSuccess async
//       console.log('Success:', response);
//       setIsProcessing(false);
//       handleOrderSuccess();

//       try {
//         const verified = await api.post("/payments/verify-payment", { reference: response?.reference });
//         console.log('Payment verified:', verified);
//       } catch (error) {
//         console.log('Payment verification failed:', error);
//       }
//     },
//     onClose: () => alert("Payment closed"),
//   };

//   return <PaystackButton className='p-5 w-full absolute' {...componentProps} />;
// };

// export default PaystackPayment;
import React, { useEffect } from 'react';

const PayStackPayment = ({
  email = 'customer@example.com',
  amount = 500000,      // amount in kobo (₦5,000 = 500000 kobo)
  publicKey = 'pk_test_6bd575a6439037e4b48d69d5666c03620b0e3fd8',
  currency = 'NGN',
  onSuccess = (ref) => alert(`Payment successful! Ref: ${ref.reference}`),
  onClose = () => alert('Payment closed'),
  text = 'Pay Now'
}) => {
  // Load Paystack script once
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.PaystackPop) {
      console.error('Paystack SDK not loaded');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount,
      currency,
      ref: `${Date.now()}`, // a unique transaction reference
      callback: onSuccess,
      onClose
    });

    handler.openIframe();
  };

  return (
    <button onClick={handlePayment}>
      {text}
    </button>
  );
};

export default PayStackPayment;
