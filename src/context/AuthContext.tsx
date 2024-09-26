'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  logoutError: string | null;
  loginError: string | null;
  logoutSuccess: string | null;
  loginSuccess: string | null;
  setLoginError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoginSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  setLogoutSuccess: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => { 
  const [user, setUser] = useState<any>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [logoutSuccess, setLogoutSuccess] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (e.g., from cookies or localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (logoutError || loginError || logoutSuccess || loginSuccess) {
      const timer = setTimeout(() => {
        setLogoutError(null);
        setLoginError(null);
        setLogoutSuccess(null);
        setLoginSuccess(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [logoutError, loginError, logoutSuccess, loginSuccess]);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLoginSuccess('Logged in successfully');
  };

  const logout = async () => {
    try {
      const userData = localStorage.getItem('user') || '';
      const userValue = JSON.parse(userData);
      const token = userValue?.data?.data?.data?.tokens?.accessToken || userValue?.data?.data?.tokens?.accessToken;

      // Make an API call to the logout endpoint
      const response = await fetch('/api/logout', { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`, // Assuming the token is stored in the user object
        },
      });

      if (response.ok) {
        // Clear the user data on the client-side
        setUser(null);
        localStorage.removeItem('user');
        setLogoutSuccess('Logged out successfully');
      } else {
        // Handle failed logout
        const errorData = await response.json();
        setLogoutError('Failed to logout: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to logout:', error);
      setLogoutError('Failed to logout: An unexpected error occurred.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, logoutError, loginError, setLoginError, loginSuccess, logoutSuccess, setLoginSuccess, setLogoutSuccess }}>
      {children}
      {logoutError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded">
          {logoutError}
        </div>
      )}
      {loginError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded">
          {loginError}
        </div>
      )}
      {logoutSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
          {logoutSuccess}
        </div>
      )}
      {loginSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
          {loginSuccess}
        </div>
      )}
    </AuthContext.Provider>
  );
};
