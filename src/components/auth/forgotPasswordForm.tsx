'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Input from '@/shared/Input';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit email to the server-side API to send a password reset link
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      // Handle error
      const error = await response.json();
      console.error('Password reset request failed:', error);
      setErrors({ api: error.message || 'Failed to send reset link' });
    } else {
      // Handle success
      setErrors({});
      setNotification('Verification email sent! Please check your inbox.');
      setEmail(''); // Clear the email input field
    }
  };

  return (
    <div>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="example@example.com"
            required
            className="mt-1"
          />
        </label>
        {errors.api && <span className="text-red-500 text-sm">{errors.api}</span>}
        <ButtonPrimary style={{ backgroundColor: '#7C25E9' }} type="submit">Send Verification Email</ButtonPrimary>
      </form>
      {notification && <div className="mt-4 text-green-600 text-center">{notification}</div>}
    </div>
  );
}
