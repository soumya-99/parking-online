import axios from "axios";
import { loginStorage } from "../storage/appStorage";
import { ToastAndroid } from "react-native";

export const loginStore = async (username, password) => {
  const loginDataObjectFromStorage = loginStorage.getString("login-data");
  const loginData = JSON.parse(loginDataObjectFromStorage);

  const credentials = {
    password: password,
    user_id: username,
  };

  try {
    await axios
      .post(ADDRESSES.LOGIN, credentials, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(res => {
        if (res.data.status) {
          loginStorage.set("login-data", JSON.stringify(res.data.data));
          // loginStorage.set("token", JSON.stringify(res.data.data.token))
          // loginStorage.set("userdata", JSON.stringify(res.data.data.user))
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
  } catch (error) {
    console.log("Error login Try-Catch", error);
  }

  return { loginData };
};
