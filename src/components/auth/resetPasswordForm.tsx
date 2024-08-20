'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Input from '@/shared/Input';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm: React.FC = () => {
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Get the token from the query parameters

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setErrors({});

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (!token) {
      setErrors({ api: 'Invalid or missing token' });
      return;
    }

    try {
      // Submit the new password to the server-side API
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: form.password }), // Pass token and password in the body
      });

      if (!response.ok) {
        // Handle error
        const error = await response.json();
        console.error('Password reset failed:', error);
        setErrors({ api: error.message || 'Failed to reset password' });
      } else {
        // Handle success
        setNotification('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setErrors({ api: 'An unexpected error occurred. Please try again later.' });
    }
  };

  return (
    <div>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">New Password</span>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </label>
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">Confirm New Password</span>
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
        )}
        {errors.api && <span className="text-red-500 text-sm">{errors.api}</span>}
        <ButtonPrimary style={{ backgroundColor: '#7C25E9' }} type="submit">Reset Password</ButtonPrimary>
      </form>
      {notification && <div className="mt-4 text-green-600 text-center">{notification}</div>}
    </div>
  );
};

export default ResetPasswordForm;
