// components/GoogleLoginComponent.tsx

'use client';

import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const GoogleLoginComponent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const { login } = useAuth();

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
      console.log("rwewewew ", res);
      if (!res) {
        // Handle error
        const error = await response.json();
      } else {
        // Handle success
        login(res);
        setTimeout(() => {
          window.location.href = '/'; // Redirect to a dashboard or another page
        }, 500);
    } }catch (error) {
      console.error("Error decoding token: ", error);
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
          <img src={user.picture} alt={user.name} />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginComponent;
