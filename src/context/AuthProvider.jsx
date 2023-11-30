import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isLogin, loading, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
