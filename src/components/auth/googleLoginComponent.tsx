// components/GoogleLoginComponent.tsx

'use client';

import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const GoogleLoginComponent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const { login, setLoginError } = useAuth();

  const handleLoginSuccess = async (response: any) => {
    try {
      const decoded: any = jwtDecode(response.credential);
      const { email, given_name: firstName, family_name: lastName, sub: googleId, picture } = decoded;
  
      // Send the user data to your backend for authentication
      const res = await axios.post('/api/google', {
        googleId,
        email,
        firstName,
        lastName,
        picture
      });

      if (res.status !== 200) {
        // Handle error
        setLoginError('Failed to login, Please try again!');
      } else {
        // Handle success
        login(res);
        setTimeout(() => {
          window.location.href = '/'; // Redirect to a dashboard or another page
        }, 500);
      }
    } catch (error) {
      setLoginError('Failed to login: An unexpected error occurred.');
    }
  };
  

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    console.log("Logged out");
  };

  return (
    <div>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      ) : (
        <div>
          <h2>Welcome {user.name}</h2>
          <h2>Email: {user.email}</h2>
          <Image src={user.picture} alt={user.name} fill />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginComponent;
