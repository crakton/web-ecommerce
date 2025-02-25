import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import api from '../config/api';
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({userData:null, isAuthenticated:false, token:null});

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setUser(null); // Clear user state if session expired
    }
  }, []);

  const signup = useCallback(async (name, email, password, phone) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password,phone });
    const data = response.data;

    if (data.success){
      toast.success(data.message);
      const userData = data.user;
    // Store userId in sessionStorage
    sessionStorage.setItem('userId', userData.userId);
  
    setUser({ userData, token:data.token});
    }

    } catch (error) {
      toast.error(error.response?.data?.mesage || error.message);
      console.error('Signup error:', error.response?.data?.error || error.message);
    }
  },[]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.status) {
        toast.success(response.data.message)
       const userData = response.data.user;
        
        // Save userId & token in sessionStorage
        sessionStorage.setItem('userId', userData.userId);
        sessionStorage.setItem('userToken', response.data.token);

        // Save user & authentication to localStorage
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isAuthenticated', true)

        // Update the state with the logged-in user
        setUser({ userData, token:response.data.token, isAuthenticated:true });
      } 
    } catch (err) {
      toast.warning(err.response.data.message)
     console.error('Login error:', err.response?.data?.message || err.message);
    }
  },[]);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userToken');
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      toast.success('Logged out successfully');
      
    } catch (error) {
      toast.warning(error.response.data.message)
      console.error('Logout error:', error.response?.data?.message || error.message);
    }
  },[]);



  const memorizedValues = useMemo(() => ({  user, signup, login, logout }), [login, logout, signup, user]);

  return (
    <AuthContext.Provider value={memorizedValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
