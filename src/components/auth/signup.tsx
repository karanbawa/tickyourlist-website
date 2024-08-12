'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Input from '@/shared/Input';
import { countries } from './countries';

export default function SignUp() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneCode: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [notification, setNotification] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validatePasswords = () => {
        const errors: { [key: string]: string } = {};
        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validatePasswords();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Submit form data to the server-side API
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            // Handle error
            const error = await response.json();
            console.error('Signup failed:', error);
            setErrors({ api: error.message || 'Signup failed' });
        } else {
            // Handle success
            setNotification('Signup successful! Please verify your email.');
        }
    };

    return (
        <div>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">First Name</span>
                        <Input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="mt-1" />
                    </label>
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">Last Name</span>
                        <Input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="mt-1" />
                    </label>
                </div>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
                    <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@example.com" required className="mt-1" />
                </label>
                <div className="grid grid-cols-2 gap-6">
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">Country Code</span>
                        <select name="phoneCode" value={form.phoneCode} onChange={handleChange} required className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            {countries.map((country) => (
                                <option key={country.code} value={country.dial_code}>
                                    {country.name} ({country.dial_code})
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">Phone Number</span>
                        <Input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required className="mt-1" />
                    </label>
                </div>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">Password</span>
                    <Input type="password" name="password" value={form.password} onChange={handleChange} required className="mt-1" />
                </label>
                <label className="block">
                    <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">Confirm Password</span>
                    <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="mt-1" />
                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                </label>
                {errors.api && <span className="text-red-500 text-sm">{errors.api}</span>}
                <ButtonPrimary type="submit">Continue</ButtonPrimary>
            </form>
            {notification && <div className="mt-4 text-green-600 text-center">{notification}</div>}
        </div>
    );
}
