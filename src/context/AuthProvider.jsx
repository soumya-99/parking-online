import React, { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";
import { ADDRESSES } from "../routes/addresses";
import { loginStorage } from "../storage/appStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(() => false);
  const [loading, setLoading] = useState(() => false);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = async (username, password) => {
    const credentials = {
      password: password,
      user_id: username,
    };

    try {
      setLoading(true);
      await axios
        .post(ADDRESSES.LOGIN, credentials, {
          headers: {
            Accept: "application/json",
          },
        })
        .then(res => {
          if (res.data.status) {
            loginStorage.set("login-data-local", JSON.stringify(credentials));
            loginStorage.set("login-data", JSON.stringify(res.data.data));
            console.log("=====================", res.data.data);
            setIsLogin(!isLogin);
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Invalid Credentials",
              3,
              25,
              25,
              25,
            );
            console.log("Error login Axios");
          }
        })
        .catch(err => {
          console.log("Error occurred in server. ", err);
        });
      setLoading(false);
    } catch (error) {
      console.log("Error login Try-Catch", error);
    }
  };

  const isLoggedIn = () => {
    if (loginStorage.getAllKeys().length === 0) {
      console.log("IF - isLoggedIn");
      setIsLogin(isLogin);
    } else {
      console.log("ELSE - isLoggedIn");
      setIsLogin(!isLogin);
    }
  };

  const logout = () => {
    setIsLogin(!isLogin);
    loginStorage.clearAll();
    console.log("LOGGING OUT...");
  };

  return (
    <AuthContext.Provider value={{ isLogin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
