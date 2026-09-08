'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  demoLogin: () => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success && res.data.data) {
        const { token: userToken, ...userData } = res.data.data;
        setToken(userToken);
        setUser(userData as User);
        localStorage.setItem('gbp_auth_token', userToken);
        localStorage.setItem('gbp_user_data', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message: msg };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success && res.data.data) {
        const { token: userToken, ...userData } = res.data.data;
        setToken(userToken);
        setUser(userData as User);
        localStorage.setItem('gbp_auth_token', userToken);
        localStorage.setItem('gbp_user_data', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Registration failed.';
      return { success: false, message: msg };
    }
  };

  const demoLogin = async () => {
    // Attempt demo login; if account doesn't exist, auto-register demo user
    const demoEmail = 'demo@gbpexample.com';
    const demoPassword = 'password123';
    const demoName = 'Sarah Jenkins (Local SEO Lead)';

    const loginRes = await login(demoEmail, demoPassword);
    if (loginRes.success) {
      return loginRes;
    }

    return await register(demoName, demoEmail, demoPassword);
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
        demoLogin,
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
