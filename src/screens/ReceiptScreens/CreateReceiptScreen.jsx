import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  PermissionsAndroid,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import CustomHeader from "../../components/CustomHeader";
import icons from "../../resources/icons/icons";
import colors from "../../resources/colors/colors";
import normalize from "react-native-normalize";
import RoundedInputComponent from "../../components/RoundedInputComponent";
import CustomButton from "../../components/CustomButton";
import { InternetStatusContext } from "../../../App";
import BleManager from "react-native-ble-manager";
import { AuthContext } from "../../context/AuthProvider";
import gstPriceCalculator from "../../utils/gstPriceCalculator";
import axios from "axios";
import { loginStorage } from "../../storage/appStorage";
import { ADDRESSES } from "../../routes/addresses";

const CreateReceiptScreen = ({ navigation, route }) => {
  // check is Internet available or not
  const isOnline = useContext(InternetStatusContext);

  // loading when a vehicle in and prinout Process goes on
  const [loading, setLoading] = useState(() => false);
  const [pic, setPic] = useState();

  const { generalSettings, getRateDetailsList, gstList, carIn } =
    useContext(AuthContext);

  const { dev_mod } = generalSettings;
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [READ_PHONE_STATE, setREAD_PHONE_STATE] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { type, id, userId, operatorName, deviceId, fixedPriceData } =
    route.params;

  const [fixedVehicleRateObject, setFixedVehicleRateObject] = useState({});

  const getVehicleRateFixedByVehicleId = async (devMode, id) => {
    const loginData = JSON.parse(loginStorage.getString("login-data"));
    await axios
      .post(
        ADDRESSES.FIXED_RATE_DETAILS_LIST,
        { dev_mod: devMode, vehicle_id: id },
        {
          headers: {
            Authorization: loginData.token,
          },
        },
      )
      .then(res => {
        setFixedVehicleRateObject(res.data.data.msg[0]);
        console.log(
          "RES - getVehicleRateFixedByVehicleId",
          res.data.data.msg[0],
        );
      })
      .catch(err => {
        console.log(
          "ERR - getVehicleRateFixedByVehicleId - CreateReceiptScreen",
          err,
        );
      });
  };

  useEffect(() => {
    console.log("EFFECT - CreateReceiptScren");
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log(
      "getVehicleRateFixedByVehicleId called - CreateReceiptScreen",
      dev_mod,
      id,
    );
    getVehicleRateFixedByVehicleId(dev_mod, id);
  }, [generalSettings]);

  console.log(
    "fixedVehicleRateObject.vehicle_rate",
    fixedVehicleRateObject.vehicle_rate,
  );

  /**
   * {
    "vehicle_id":47, // আছে
    "vehicle_no":"abc123", // আছে
    "base_amt":10, // ?vehicle_rate?
    "paid_amt":10, // ?vehicle_rate?
    "gst_flag":"N", // আছে
    "cgst":0, // আছে
    "sgst":0 // আছে
  }
   * @returns 
   */

  const handleCreateReceipt = async () => {
    if (loading == true) {
      return;
    }
    setLoading(true);
    // if vehicleNumber is blank then return from the below block
    if (!vehicleNumber) {
      setLoading(false);
      return ToastAndroid.showWithGravity(
        "Please add the vehicle number to continue.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

    // console.log(
    //   "handleCreateReceipt - carIn params",
    //   id,
    //   vehicleNumber,
    //   fixedVehicleRateObject.vehicle_rate,
    //   fixedVehicleRateObject.vehicle_rate,
    // gstList.gst_flag,
    //   0,
    //   0,
    // );

    let vehicleRate = parseInt(fixedVehicleRateObject.vehicle_rate);
    let vehicleId = parseInt(id);

    await carIn(
      vehicleId,
      vehicleNumber,
      vehicleRate,
      vehicleRate,
      gstList.gst_flag,
      0,
      0,
      )
      
      setLoading(false);
      setVehicleNumber("");
      
      // navigate to previous screen
      navigation.navigate("ReceiptScreen");
  };

  return (
    <View>
      {/* if loading state is true render loading */}

      {loading && (
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "35%",
            backgroundColor: colors.white,
            padding: PixelRatio.roundToNearestPixel(20),
            borderRadius: 10,
          }}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      )}

      <ScrollView keyboardShouldPersistTaps={"handled"}>
        {/* render custom header */}
        <CustomHeader title={"RECEIPT"} navigation={navigation} />
        <View style={{ padding: PixelRatio.roundToNearestPixel(30) }}>
          {/* current time and date */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {/* date */}
            <View style={styles.date_time_container}>
              {icons.calendar}
              <View>
                <Text style={styles.date_time}>Date</Text>

                <Text style={styles.date_time_data}>
                  {currentTime.toLocaleDateString()}
                </Text>
              </View>
            </View>
            {/* time */}
            <View style={styles.date_time_container}>
              {icons.time}
              <View>
                <Text style={styles.date_time}>Time</Text>

                <Text style={styles.date_time_data}>
                  {currentTime.toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>

          {/* ......... vehicle type .......... */}
          <View style={{ marginTop: normalize(20) }}>
            <Text style={styles.vehicle_text}>Vechicle Type</Text>
            <RoundedInputComponent placeholder={type} disable={true} />
          </View>
          {/* ..........receipt type ........... */}

          {fixedVehicleRateObject && (
            <View style={{ marginTop: normalize(20) }}>
              <Text style={{ ...styles.vehicle_text, color: "red" }}>
                {" "}
                {/* {dev_mod == "F" ? "" : advanceData && "Advance"}{" "} */}
                {fixedVehicleRateObject && "Fixed"} Price is On{" "}
              </Text>
              <View
                style={{
                  marginLeft: normalize(10),
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text style={{ ...styles.vehicle_text, color: "red" }}>
                  Collect ₹{fixedVehicleRateObject.vehicle_rate} money from
                  customer.
                </Text>
              </View>
            </View>
          )}
          {/* ......... vehicle Number .......... */}
          <View style={{ marginTop: normalize(20) }}>
            <Text style={styles.vehicle_text}>Vechicle Number</Text>
            <RoundedInputComponent
              placeholder={"Enter Vechicle Number"}
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
            />
          </View>
          {/*............... action buttons ......... */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: normalize(10),
              marginHorizontal: normalize(10),
            }}>
            {/* GOBACK action button */}
            <CustomButton.CancelButton
              title={"Cancel"}
              onAction={() => {
                navigation.goBack();
                console.log("navigation.navigate('Receipt')");
              }}
              style={{ flex: 1, marginRight: normalize(8) }}
            />

            {/* Print Receipt Action Button */}
            <CustomButton.GoButton
              title={"Print Receipt"}
              onAction={() => handleCreateReceipt()}
              style={{ flex: 1, marginLeft: normalize(8) }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateReceiptScreen;

const styles = StyleSheet.create({
  container: {},
  date_time_container: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  date_time: {
    color: colors.black,
    fontWeight: "600",
    fontSize: PixelRatio.roundToNearestPixel(18),
    marginLeft: PixelRatio.roundToNearestPixel(10),
  },
  date_time_data: {
    color: colors.gray,
    fontWeight: "600",
    fontSize: PixelRatio.roundToNearestPixel(15),
    marginLeft: normalize(10),
  },
  vehicle_text: {
    marginLeft: PixelRatio.roundToNearestPixel(15),
    fontWeight: "600",
    color: colors.black,
    fontSize: PixelRatio.roundToNearestPixel(15),
    marginBottom: normalize(10),
  },
});

const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: PixelRatio.roundToNearestPixel(16),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
