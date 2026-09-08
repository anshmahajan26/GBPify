'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('gbp_auth_token');
    const savedUser = localStorage.getItem('gbp_user_data');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
        localStorage.removeItem('gbp_auth_token');
        localStorage.removeItem('gbp_user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success && res.data.data) {
        const { token: userToken, ...userData } = res.data.data;
        setToken(userToken);
        setUser(userData);
        localStorage.setItem('gbp_auth_token', userToken);
        localStorage.setItem('gbp_user_data', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success && res.data.data) {
        const { token: userToken, ...userData } = res.data.data;
        setToken(userToken);
        setUser(userData);
        localStorage.setItem('gbp_auth_token', userToken);
        localStorage.setItem('gbp_user_data', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gbp_auth_token');
    localStorage.removeItem('gbp_user_data');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
