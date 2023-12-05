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
import gstPriceCalculator from "../../utils/gstPriceCalculator";

const CreateReceiptScreen = ({ navigation, route }) => {
  // check is Internet available or not
  const isOnline = useContext(InternetStatusContext);

  // loading when a vehicle in and prinout Process goes on
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();

  // get general settings from authcontext provider
  const { generalSettings, getRateDetailsList } = useContext(AuthContext);

  const { dev_mod, max_receipt, adv_pay } = generalSettings;

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
    userId,
    operatorName,
    currentDayTotalReceipt,
    imei_no,
    advanceData,
    fixedPriceData,
  } = route.params;

  // reinitiate the current time and date
  useEffect(() => {
    console.log("EFFECT - CreateReceiptScren");
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log("getRateDetailsList called - CreateReceiptScreen");
    getRateDetailsList();
  }, []);

  const handleCreateReceipt = async () => {
    // preventing the continuos button click

    if (loading == true) {
      return;
    }
    setLoading(true);
    // if vehicleNumber is blank then return from the below block
    if (!vehicleNumber) {
      setLoading(false);
      return ToastAndroid.showWithGravity(
        "plase add the vehicle number to continue",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

    // if (adv_pay == "Y" && dev_mod != "F") {
    //   // if adv_pay is equal to Y then  below function will work
    //   // Y =  Yes , N = No
    //   await handelAdvanceOfflineCarIN();
    // } // Commented In New Online...

    const handelFixedModCarIN = async () => {
      // if bluetooth not enabled then return fro here
      // if (!isBlueToothEnable) {
      //   ToastAndroid.show(
      //     'please enable the bluetooth first',
      //     ToastAndroid.SHORT,
      //   );
      //   return;
      // } // Commented In New Online...

      // receiptNo holds the return value of currentReceiptNo
      const receiptNo = await currentReceiptNo();
      // mc_srl_no holds serial number
      // const mc_srl_no = DeviceInfo.getSerialNumberSync();
      const gstSettings = await handleGetGstSettingsFromStorage();
      let isGst = "N";

      let gstPrice = {
        price: 0,
        CGST: 0,
        SGST: 0,
        totalPrice: fixedPriceData?.[0].vehicle_rate,
      };
      if (gstSettings && gstSettings?.gst_flag == "1") {
        gstPrice = gstPriceCalculator(
          gstSettings,
          fixedPriceData?.[0].vehicle_rate,
        );
        isGst = "Y";
      }

      try {
        // if READ_PHONE_STATE is not available then request for permission.
        if (!READ_PHONE_STATE) {
          Alert.alert(
            "Phone State Permission",
            "You have to give us the phone state permission to continue",
            [
              {
                text: "Cancel",
                style: "cancel",
              },

              { text: "OK", onPress: isPermitted },
            ],
          );
          return;
        }

        //store new vehicle data using createVehicleInOut()
        //increaseReceiptNo by 1
        // generate print using  handlePrintReceipt()
        // await Promise.all([
        //   createOrUpdateVehicleInOut(
        //     receiptNo,
        //     type,
        //     id,
        //     'S',
        //     vehicleNumber.toUpperCase(),
        //     currentTime.toISOString().slice(0, -5) + 'Z',
        //     dev_mod,
        //     operatorName,
        //     userId,
        //     imei_no,
        //     null,
        //     null,
        //     gstPrice.totalPrice,
        //     isGst,
        //     null,
        //     null,
        //     0,
        //     false,
        //     false,
        //     gstPrice.price,
        //     gstPrice.CGST,
        //     gstPrice.SGST,
        //   ),
        //   increaseReceiptNo(receiptNo),
        //   handleFixedModePrintReceipt(
        //     receiptNo,
        //     isGst,
        //     gstPrice.totalPrice,
        //     gstPrice.CGST,
        //     gstPrice.SGST,
        //     gstPrice.price,
        //   ),
        // ]); // Commented In New Online...

        // if  online run below block
        if (isOnline) {
          // init InData with important values
          // which are mandatory for uploading data to the server
          const InData = [
            {
              receiptNo: receiptNo,
              date_time_in: currentTime.toISOString(),
              oprn_mode: dev_mod,
              vehicle_id: id,
              vehicle_no: vehicleNumber.toUpperCase(),
              receipt_type: "S",
              mc_srl_no: imei_no,
              gst_flag: isGst,
              cgst: gstPrice.CGST,
              sgst: gstPrice.SGST,
              base_amt: gstPrice.price,
              paid_amt: gstPrice.totalPrice,
            },
          ];

          // store handleVehicleIn() return values in response
          const response = await handleVehicleIn(InData);
          console.log(
            "___________________ subham Da ___________________",
            InData,
          );

          if (response.status === 200) {
            // if status  equal to 200 run below block
            await Promise.all([
              createOrUpdateVehicleInOut(
                receiptNo,
                type,
                id,
                "S",
                vehicleNumber.toUpperCase(),
                currentTime.toISOString(),
                dev_mod,
                operatorName,
                userId,
                imei_no,
                null,
                null,
                gstPrice.totalPrice,
                isGst,
                null,
                null,
                0,
                false,
                false,
                gstPrice.price,
                gstPrice.CGST,
                gstPrice.SGST,
              ),
              increaseReceiptNo(receiptNo),
              handleFixedModePrintReceipt(
                receiptNo,
                isGst,
                gstPrice.totalPrice,
                gstPrice.CGST,
                gstPrice.SGST,
                gstPrice.price,
              ),
            ]);

            ToastAndroid.showWithGravity(
              "Uploaded",
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          } else {
            // if status not equal to 200 run below block
            await Promise.all([
              createOrUpdateVehicleInOut(
                receiptNo,
                type,
                id,
                "S",
                vehicleNumber.toUpperCase(),
                currentTime.toISOString(),
                dev_mod,
                operatorName,
                userId,
                imei_no,
                null,
                null,
                gstPrice.totalPrice,
                isGst,
                null,
                null,
                0,
                false,
                false,
                gstPrice.price,
                gstPrice.CGST,
                gstPrice.SGST,
              ),
              increaseReceiptNo(receiptNo),
              handleFixedModePrintReceipt(
                receiptNo,
                isGst,
                gstPrice.totalPrice,
                gstPrice.CGST,
                gstPrice.SGST,
                gstPrice.price,
              ),
            ]);
          }

          //  and return from here no internet connectivity
          return;
        }

        //  if you wonder why we are call createOrUpdateVehicleInOut() for status 200 and not equal 200
        //Although createOrUpdateVehicleInOut () requires a lot of arguments, there is a call for isUploadedIn that can be either true or false.
        // this help us in future to upload data to the server. which are not uploaded due to no internet connectivity.
      } catch (error) {
        console.error(error.message);
      }
    };

    if (adv_pay != "Y" || dev_mod == "F") {
      // if adv_pay is Not equal to Y then  below function will work
      // Y =  Yes , N = No
      if (dev_mod == "F") {
        await handelFixedModCarIN();
      } else {
        await handelOfflineCarIN();
      }
    }
    setLoading(false);
    setVehicleNumber();

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
