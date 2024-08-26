'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Input from '@/shared/Input';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Login() { 
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Submit form data to the server-side API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      // Handle error
      const error = await response.json();
      console.error('Login failed:', error);
      setLoading(false);
      setErrors({ api: error.message || 'Email Id or password is incorrect.' });
    } else {
      // Handle success
      const userData = await response.json();
      login(userData);
      setLoading(false);
      setNotification('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/'; // Redirect to a dashboard or another page
      }, 500);
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
            value={form.email}
            onChange={handleChange}
            placeholder="example@example.com"
            required
            className="mt-1"
          />
        </label>
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
            <Link href="/forgotpassword" className="text-sm underline font-medium">
              Forgot password?
            </Link>
          </span>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </label>
        {errors.api && <span className="text-red-500 text-sm">{errors.api}</span>}
        <ButtonPrimary loading={loading} style={{ backgroundColor: '#7C25E9' }} type="submit">Continue</ButtonPrimary>
      </form>
      {notification && <div className="mt-4 text-green-600 text-center">{notification}</div>}
    </div>
  );
}
