// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext(undefined);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on initial load
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token and get admin data
          // This is a mock implementation
          const mockUser = {
            id: '123',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin'
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, you would call your authentication API here
      // This is a mock implementation
      if (email === 'admin@example.com' && password === 'admin123') {
        const mockUser =  {
          id: '123',
          email,
          name: 'Admin User',
          role: 'admin'
        };
        
        localStorage.setItem('token', 'mock-jwt-token');
        setUser(mockUser);
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/admin/login');
  };

  const value = {
    isAuthenticated: !!admin,
    isAdmin: admin?.role === 'admin',
    admin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AdminAuthProvider');
  }
  return context;
};