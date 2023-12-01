import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  PixelRatio,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import CustomHeader from "../../components/CustomHeader";
import styles from "../../styles/styles";
import colors from "../../resources/colors/colors";
import icons from "../../resources/icons/icons";
import { InternetStatusContext } from "../../../App";
import { AuthContext } from "../../context/AuthProvider";

export default function ReceiptScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const todayCollectionArray = [
    { title: "Operator Name", data: "Soumyadeep" },
    { title: "Total Vehicles In", data: 10 },
    { title: "Total Vehicles Out", data: 6 },
    { title: "Total Collection", data: 650 || 0 },
  ];

  const vechicles = [
    {
      vehicle_icon: "bike",
      vehicle_name: "Bike",
    },
    {
      vehicle_icon: "car",
      vehicle_name: "Car",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="RECEIPT" />
      {/* today total receipt */}
      <Text style={styles.title}>Today`s Collection</Text>
      <Text
        style={{
          ...styles.title,
          fontSize: PixelRatio.roundToNearestPixel(14),
          padding: 0,
          paddingBottom: PixelRatio.roundToNearestPixel(4),
          paddingTop: -20,
        }}>
        {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
      </Text>
      {/* today collection table */}
      <View style={styles.today_collection}>
        {todayCollectionArray.map((props, index) => (
          <View key={index}>
            <View style={otherStyle.today_collection_data}>
              <Text style={otherStyle.data}>{props.title}</Text>
              <Text style={otherStyle.data}>{props.data}</Text>
            </View>
            {/* if this is the last data then below border will not print */}
            {todayCollectionArray.length != index + 1 && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black,
                }}
              />
            )}
          </View>
        ))}
      </View>

      {/* print action conatiner */}
      <View style={otherStyle.print_container}>
        <TouchableOpacity
          style={otherStyle.print_action_button}
          onPress={() => console.log("======uploadDataToTheServer======")}>
          {icons.sync}
        </TouchableOpacity>
        <TouchableOpacity
          style={otherStyle.print_action_button}
          onPress={() => console.log("======handleSamplePrintReceipt======")}>
          {icons.arrowUp}
        </TouchableOpacity>
        <TouchableOpacity
          style={otherStyle.print_action_button}
          onPress={() => console.log("======handlePlay======")}>
          {icons.print}
        </TouchableOpacity>
      </View>
      {/* vehicle container */}
      {/* <View
        style={{
          ...otherStyle.vehicle_container,
          bottom: 20,
          alignSelf: "center",
        }}>
        {!generalSetting?.dev_mod && <ActivityIndicator size="large" />}
      </View> */}

      {/* {generalSetting?.dev_mod != "B" && (
        <ScrollView horizontal={true} style={otherStyle.vehicle_container}>
          {vechicles &&
            vechicles.map((props, index) => (
              <Pressable
                key={index}
                style={otherStyle.vehicle}
                onPress={() => {
                  console.log("handleNavigation(props)")
                }}>
                {icons.dynamicvechicleIcon(props.vehicle_icon)}
                <Text style={otherStyle.vehicle_name}>
                  {props.vehicle_name}
                </Text>
              </Pressable>
            ))}
        </ScrollView>
      )} */}
      <ScrollView horizontal={true} style={otherStyle.vehicle_container}>
        {vechicles &&
          vechicles.map((props, index) => (
            <Pressable
              key={index}
              style={otherStyle.vehicle}
              onPress={() => {
                console.log("handleNavigation(props)");
              }}>
              {icons.dynamicvechicleIcon(props.vehicle_icon)}
              <Text style={otherStyle.vehicle_name}>{props.vehicle_name}</Text>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
}

const otherStyle = StyleSheet.create({
  today_collection_data: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: PixelRatio.roundToNearestPixel(10),
  },
  data: {
    fontWeight: "400",
    color: colors.black,
    fontSize: PixelRatio.roundToNearestPixel(20),
  },
  print_container: {
    flexDirection: "row",
    justifyContent: "center",
    // margin: -6
  },
  print_action_button: {
    marginHorizontal: PixelRatio.roundToNearestPixel(5),
  },
  vehicle: {
    margin: 5,
    borderWidth: 1,
    alignSelf: "center",
    paddingHorizontal: PixelRatio.roundToNearestPixel(20),
    borderRadius: PixelRatio.roundToNearestPixel(10),
  },
  vehicle_container: {
    // flex: 1,
    flexDirection: "row",
    // justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
    // width: '100%',
    marginBottom: PixelRatio.roundToNearestPixel(5),
    elevation: 10,
  },
  vehicle_name: {
    alignSelf: "center",
    color: colors.black,
    fontWeight: "500",
    marginTop: PixelRatio.roundToNearestPixel(-10),
    marginBottom: PixelRatio.roundToNearestPixel(5),
  },
});
