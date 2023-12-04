import React, { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";
import { ADDRESSES } from "../routes/addresses";
import { loginStorage } from "../storage/appStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(() => false);
  const [loading, setLoading] = useState(() => false);
  const [generalSettings, setGeneralSettings] = useState({
    // setting_id: 9,
    // app_id: "1324567890",
    // customer_id: 12,
    // mc_lang: "E",
    // dev_mod: "F",
    // report_flag: "Y",
    // otp_val: "N",
    // signIn_session: null,
    // total_collection: "Y",
    // vehicle_no: "Y",
    // adv_pay: "",
    // auto_archive: null,
    // max_receipt: 500,
    // reset_recipeit_no: "D",
    // parking_entry_type: "S",
    // created_at: "2023-10-16T11:27:23.000Z",
    // updated_at: "2023-10-16T11:56:18.000Z",
  });

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

  const loginData = JSON.parse(loginStorage.getString("login-data"));

  const getGeneralSettings = async () => {
    await axios
      .post(
        ADDRESSES.GENERAL_SETTINGS,
        {},
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        setGeneralSettings(res.data.data.msg[0]);
      })
      .catch(err => {
        console.log("CATCH - getGeneralSettings", err);
      });
  };

  // useEffect(() => {
  //   const generalSettings = getGeneralSettings();
  //   return () => clearInterval(generalSettings);
  // }, []);

  const logout = () => {
    setIsLogin(!isLogin);
    loginStorage.clearAll();
    console.log("LOGGING OUT...");
  };

  return (
    <AuthContext.Provider value={{ isLogin, loading, login, logout, generalSettings, getGeneralSettings }}>
      {children}
    </AuthContext.Provider>
  );
};
