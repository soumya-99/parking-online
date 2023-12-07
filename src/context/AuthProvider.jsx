import React, { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";
import { ADDRESSES } from "../routes/addresses";
import { appStorage, loginStorage } from "../storage/appStorage";
import { clearStates } from "../utils/clearStates";

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
  const [rateDetailsList, setRateDetailsList] = useState(() => []);
  const [gstList, setGstList] = useState({});
  const [detailedReports, setDetailedReports] = useState(() => []);
  const [shiftwiseReports, setShiftwiseReports] = useState(() => []);
  const [vehicleWiseReports, setVehicleWiseReports] = useState(() => []);
  const [operatorwiseReports, setOperatorwiseReports] = useState(() => []);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = async (username, password, deviceId) => {
    const credentials = {
      password: password,
      user_id: username,
      device_id: deviceId,
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
          console.log(res.data.message);
          if (res.data.status) {
            loginStorage.set("login-data-local", JSON.stringify(credentials));
            loginStorage.set("login-data", JSON.stringify(res.data.data));
            console.log("=====================", res.data.data);
            setIsLogin(!isLogin);
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Invalid Credentials",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
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

  const getGeneralSettings = async () => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
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
        getGstList();
        // appStorage.set("general-settings", JSON.stringify(res.data.data.msg[0]))
      })
      .catch(err => {
        console.log("CATCH - getGeneralSettings", err);
      });
  };

  // const getRateDetailsList = async () => {
  //   const loginData = JSON.parse(loginStorage.getString("login-data"));
  //   await axios
  //     .post(
  //       ADDRESSES.RATE_DETAILS_LIST,
  //       { dev_mod: generalSettings.dev_mod },
  //       {
  //         headers: {
  //           Authorization: loginData.token,
  //         },
  //       },
  //     )
  //     .then(res => {
  //       console.log("RES - getRateDetailsList", res.data.data);
  //       setRateDetailsList(res.data.data.msg);
  //     })
  //     .catch(err => {
  //       console.log("ERR - getRateDetailsList - AuthProvider", err);
  //     });
  // };

  const getGstList = async () => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
    await axios
      .post(
        ADDRESSES.GST_LIST,
        {},
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        setGstList(res.data.data.msg[0]);
      })
      .catch(err => {
        console.log("ERR - getGstList - AuthProvider", err);
      });
  };

  const carIn = async (
    vehicleId,
    vehicleNo,
    baseAmt,
    paidAmt,
    gstFlag,
    cgst,
    sgst,
  ) => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
    await axios
      .post(
        ADDRESSES.CAR_IN,
        {
          vehicle_id: vehicleId,
          vehicle_no: vehicleNo,
          base_amt: baseAmt,
          paid_amt: paidAmt,
          gst_flag: gstFlag,
          cgst: cgst,
          sgst: sgst,
        },
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        console.log("carIn - res - AuthProvider", res.data.message);
      })
      .catch(err => {
        console.log("EWREEEEEEEEEEEEEEEEEERRRRRR", err);
      });
  };

  const getDetailedReport = async (fromDate, toDate) => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
    await axios
      .post(
        ADDRESSES.DETAILED_REPORT,
        {
          from_date: fromDate,
          to_date: toDate,
        },
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        console.log("res - getDetailedReport - AuthProvider", res.data.message);
        setDetailedReports(res.data.data.msg);
      });
  };

  const getShiftwiseReport = async (fromDate, toDate) => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
    await axios
      .post(
        ADDRESSES.SHIFTWISE_REPORT,
        {
          from_date: fromDate,
          to_date: toDate,
        },
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        console.log(
          "res - getShiftwiseReport - AuthProvider",
          res.data.message,
        );
        setShiftwiseReports(res.data.data.msg);
      });
  };

  const getVehicleWiseReport = async (fromDate, toDate) => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
    await axios
      .post(
        ADDRESSES.VEHICLE_WISE_REPORT,
        {
          from_date: fromDate,
          to_date: toDate,
        },
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        // console.log("res - getVehicleWiseReport - AuthProvider", res);
        console.log(
          "res - getVehicleWiseReport - AuthProvider",
          res.data.message,
        );
        setVehicleWiseReports(res.data.data.msg);
      });
  };

  const getOperatorwiseReport = async (fromDate, toDate) => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
    await axios
      .post(
        ADDRESSES.OPERATORWISE_REPORT,
        {
          from_date: fromDate,
          to_date: toDate,
        },
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        // console.log("res - getOperatorwiseReport - AuthProvider", res);
        console.log(
          "res - getOperatorwiseReport - AuthProvider",
          res.data.message,
        );
        setOperatorwiseReports(res.data.data.msg);
      });
  };

  const logout = () => {
    loginStorage.clearAll();
    appStorage.clearAll();

    setGeneralSettings({});
    clearStates(
      [
        setGstList,
        setDetailedReports,
        setShiftwiseReports,
        setVehicleWiseReports,
        setOperatorwiseReports,
      ],
      [],
    );

    setIsLogin(!isLogin);
    console.log("LOGGING OUT...");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        loading,
        login,
        logout,
        generalSettings,
        getGeneralSettings,
        // rateDetailsList,
        // getRateDetailsList,
        gstList,
        getGstList,
        carIn,
        getDetailedReport,
        detailedReports,
        shiftwiseReports,
        getShiftwiseReport,
        vehicleWiseReports,
        getVehicleWiseReport,
        operatorwiseReports,
        getOperatorwiseReport,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
