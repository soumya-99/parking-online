import React, { createContext, useState } from 'react';
import LOGIN_DATA from "../data/login_dummy_data.json";
import { ToastAndroid } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (username, password) => {
    if (LOGIN_DATA.username === username && LOGIN_DATA.password === password) {
      setIsLogin(!isLogin)
    } else {
      ToastAndroid.showWithGravityAndOffset("Wrong Credentials", 3, 25, 25, 25)
    }
  }

  const logout = () => {
    setIsLogin(!isLogin)
  }

  return (
    <AuthContext.Provider
      value={{ isLogin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
