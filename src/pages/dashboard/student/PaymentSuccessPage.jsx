// src/pages/dashboard/student/PaymentSuccessPage.jsx (Conceptual)
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../../utils/api';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('Verifying payment...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      const verifyPayment = async () => {
        try {
          // 1. Call your backend endpoint to verify the session
          // Add a timeout to prevent hanging forever
          const response = await Promise.race([
            api.post('/payments/success', { sessionId }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Request timed out')), 10000)
            )
          ]);

          // 2. The backend should confirm the payment was processed (by the webhook)
          if (response.data.message.includes('recorded') || response.data.payment) {
            setStatus('Payment Successful! Your tutor has been approved.');
          } else if (response.data.message.includes('processing')) {
            setStatus(
              'Payment verified. Tutor approval is processing. Please check your "My Tuitions" shortly.'
            );
          } else {
            setStatus('Payment verification uncertain. Please contact support.');
          }
        } catch (err) {
          console.error('Payment verification error trace:', err);
          
          let errorMessage = 'Payment verification failed.';
          if (err.message === 'Request timed out') {
             errorMessage = 'Verification timed out. The server might be busy processing the webhook.';
          } else if (err.response) {
             errorMessage = `Server Error: ${err.response.data?.message || err.response.statusText}`;
          }
          
          setError(errorMessage);
          setStatus('Verification Failed');
        } finally {
          setLoading(false);
        }
      };

      verifyPayment();
    } else {
      setError('Missing payment session ID.');
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-xl shadow-lg text-center">
      {loading ? (
        <div className="flex items-center justify-center">
          {/* Add a spinner or loading animation */}
          <p className="ml-2">{status}</p>
        </div>
      ) : error ? (
        <div className="text-red-600">
          <h2 className="text-2xl font-bold mb-4">Payment Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="text-green-600">
          <h2 className="text-2xl font-bold mb-4">🎉 {status}</h2>
          <p>Transaction ID: {sessionId}</p>
          <p className="mt-4">You can view your approved tuitions in the "My Tuitions" section.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
