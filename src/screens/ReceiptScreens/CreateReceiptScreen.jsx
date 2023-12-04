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
import React, { useContext, useEffect, useState } from "react";

import CustomHeader from "../../components/CustomHeader";
import icons from "../../resources/icons/icons";
import colors from "../../resources/colors/colors";
import normalize from "react-native-normalize";
import RoundedInputComponent from "../../components/RoundedInputComponent";
import CustomButton from "../../components/CustomButton";
import { InternetStatusContext } from "../../../App";
import BleManager from "react-native-ble-manager";
import { AuthContext } from "../../context/AuthProvider";

const CreateReceiptScreen = ({ navigation, route }) => {
  // check is Internet available or not
  const isOnline = useContext(InternetStatusContext);

  // loading when a vehicle in and prinout Process goes on
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();

  // get general settings from authcontext provider
  const { generalSettings } = useContext(AuthContext);

  // GET GST SETTINGS
  //   const { handleGetGstSettingsFromStorage } = gstSettingsController();

  //Destructuring dev_mod, max_receipt, and adv_pay from generalSetting.
  const { dev_mod, max_receipt, adv_pay } = generalSettings;

  // hooks that handle  vehicle rates by vehicleID
  //   const { getVehicleRatesByVehicleId } = vehicleRatesStorage();
  // hooks that  handle vehicle rates by vehicleID
  //   const { getAdvancePricesByVehicleId } = advancePriceStorage();

  // function handle offline storage
  //   const { createVehicleInOut, createOrUpdateVehicleInOut } = VehicleInOutStore();

  // this state store RECEIPT SETTINGS
  //   const { receiptSettings } = getReceiptSettings();

  // hooks handle to get the LOGO from local storage
  //   const { getReceiptImage } = ReceiptImageStorage();

  // vehicleNumber input controller
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [READ_PHONE_STATE, setREAD_PHONE_STATE] = useState(false);

  // The currentTime state variable is initialized using the useState hook to hold the current date and time.
  const [currentTime, setCurrentTime] = useState(new Date());

  //  The day, month, year, hour, minute, and formattedDateTime variables are created. These are used to format the date and time in a specific format.
  const day = String(currentTime.getDate()).padStart(2, "0");
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const year = String(currentTime.getFullYear()).slice(-2);
  const hour = String(currentTime.getHours()).padStart(2, "0");
  const minute = String(currentTime.getMinutes()).padStart(2, "0");

  // Format the date and time as "date/month year hh:mm"
  const formattedDateTime = `${day}/${month}/${year} ${hour}:${minute}`;
  // console.log("------------------",currentTime.toISOString("en-US"))

  // VEHICLE IN/OUT CONTROLLER
  //   const { handleVehicleIn } = vehicleINOUTController();

  const {
    type,
    id,
    //   userId,
    //   operatorName,
    //   currentDayTotalReceipt,
    //   imei_no,
    //   advanceData,
    //   fixedPriceData,
  } = route.params;

  //   const [isBlueToothEnable, setIsBlueToothEnable] = useState(false);
  //   // function to check isBlueToothEnable?
  //   async function checkBluetoothEnabled() {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: "Bluetooth Permission",
  //           message:
  //             "This app needs access to your location to check Bluetooth status.",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Permission granted, check Bluetooth status
  //         BleManager.enableBluetooth()
  //           .then(() => {
  //             // Success code
  //             setIsBlueToothEnable(true);
  //             console.log("The bluetooth is already enabled or the user confirm");
  //           })
  //           .catch(error => {
  //             // Failure code
  //             console.log("The user refuse to enable bluetooth");
  //           });
  //         // const isEnabled = await BluetoothStatus.isEnabled();
  //         // console.log('Bluetooth Enabled:', isEnabled);
  //       } else {
  //         // if bluetooth is not enabled call this functions it`s self.
  //         checkBluetoothEnabled();
  //         console.log("Bluetooth permission denied");
  //       }
  //     } catch (error) {
  //       console.log("Error checking Bluetooth status:", error);
  //     }
  //   }

  //   // check READ_PHONE_STATE available or not
  //   const isPermitted = async () => {
  //     console.log("/*/*/*/*/*/*/*/*/*/*/*/*/");
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
  //         {
  //           title: "Phone state access Permission",
  //           message: "to access your machine imei",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         setREAD_PHONE_STATE(true);
  //         // console.log('You can use this');
  //       } else {
  //         setREAD_PHONE_STATE(false);
  //         // console.log('permission denied');
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  // reinitiate the current time and date
  useEffect(() => {
    console.log("EFFECT - CreateReceiptScren");
    // checkBluetoothEnabled();
    // isPermitted();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // // main fun() for all upload and store and printing
  // const handleCreateReceipt = async () => {
  //   // preventing the continuos button click

  //   if (loading == true) {
  //     return;
  //   }
  //   setLoading(true);
  //   // if vehicleNumber is blank then return from the below block
  //   if (!vehicleNumber) {
  //     setLoading(false);
  //     return ToastAndroid.showWithGravity(
  //       'plase add the vehicle number to continue',
  //       ToastAndroid.SHORT,
  //       ToastAndroid.CENTER,
  //     );
  //   }

  //   if (adv_pay == 'Y' && dev_mod != 'F') {
  //     // if adv_pay is equal to Y then  below function will work
  //     // Y =  Yes , N = No
  //     await handelAdvanceOfflineCarIN();
  //   }

  //   if (adv_pay != 'Y' || dev_mod == 'F') {
  //     // if adv_pay is Not equal to Y then  below function will work
  //     // Y =  Yes , N = No
  //     if (dev_mod == 'F') {
  //       await handelFixedModCarIN();
  //     } else {
  //       await handelOfflineCarIN();
  //     }
  //   }
  //   setLoading(false);
  //   setVehicleNumber();

  //   // navigate to previous screen
  //   navigation.navigate('Receipt');
  // };

  //   useEffect(() => {
  //     // Get the offline stored Image

  //     getReceiptImage()
  //       .then(response => {
  //         // Store at pic State
  //         setPic(response.image);
  //       })
  //       .catch(error => {
  //         setPic(null);
  //         console.error(error);
  //       });
  //   }, []);

  return (
    <View>
      {/* if loading state is true render loading */}

      {/* {loading && (
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
      )} */}

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

          {/* {(advanceData || fixedPriceData) && (
            <View style={{ marginTop: normalize(20) }}>
              <Text style={{ ...styles.vehicle_text, color: "red" }}>
                {" "}
                {dev_mod == "F" ? "" : advanceData && "Advance"}{" "}
                {fixedPriceData && "Fixed "} Price is On{" "}
              </Text>
              <View
                style={{
                  marginLeft: normalize(10),
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text style={{ ...styles.vehicle_text, color: "red" }}>
                  Collect ₹
                  {(dev_mod == "F" ? "" : advanceData?.[0]?.advance_amount) ||
                    (fixedPriceData?.[0].vehicle_rate && " money")}{" "}
                  from customer
                </Text>
              </View>
            </View>
          )} */}
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
              onAction={() => console.log("handleCreateReceipt()")}
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
