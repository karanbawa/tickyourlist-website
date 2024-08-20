'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ButtonPrimary from '@/shared/ButtonPrimary';

const VerifyContent = () => {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('Verifying...');
    const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(null);
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setStatus('Invalid token');
                setVerificationSuccess(false);
                return;
            }

            try {
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.status === 200) {
                    setStatus('Verification successful! Please log in.');
                    setVerificationSuccess(true);
                } else {
                    const data = await response.json();
                    setStatus(`Verification failed: ${data.error}`);
                    setVerificationSuccess(false);
                }
            } catch (error) {
                setStatus('Verification failed. Please try again.');
                setVerificationSuccess(false);
                console.error('Verification error:', error);
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center min-h-screen mt-10">
                <h1 className="text-2xl font-bold text-center mb-4">Email Verification</h1>
                <div className="bg-white shadow-md rounded p-6 max-w-md w-full text-center">
                    {verificationSuccess === null ? (
                        <p>{status}</p>
                    ) : verificationSuccess ? (
                        <>
                            <p className="text-green-600">{status}</p>
                            <ButtonPrimary style={{ backgroundColor: '#7C25E9' }} onClick={() => window.location.href = '/login'} className='mt-8'>Go to Login</ButtonPrimary>
                        </>
                    ) : (
                        <>
                            <p className="text-red-600">{status}</p>
                            <ButtonPrimary style={{ backgroundColor: '#7C25E9' }} onClick={() => window.location.href = '/signup'} className='mt-8'>Try Again</ButtonPrimary>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const VerifyPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
};

export default VerifyPage;
