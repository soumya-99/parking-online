import {
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  NativeModules,
  ToastAndroid,
  PermissionsAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import CustomHeader from "../../components/CustomHeader";
import colors from "../../resources/colors/colors";
import icons from "../../resources/icons/icons";
const width = Dimensions.get("screen").width;
import DeviceInfo from "react-native-device-info";
import { AuthContext } from "../../context/AuthProvider";

export default function VehicleWiseFixedReportScreen({ navigation }) {
  const { vehicleWiseReports, getVehicleWiseReport } = useContext(AuthContext);

  const [detailedReportData, setDetailedReportData] = useState([]);
  // State for manage the  loading values
  const [loading, setLoading] = useState();

  // create a new Date object
  const date = new Date();

  // State for manage the From date
  const [mydateFrom, setDateFrom] = useState(new Date());
  const [displaymodeFrom, setModeFrom] = useState("date");
  const [isDisplayDateFrom, setShowFrom] = useState(false);

  // handle change From date
  const changeSelectedDateFrom = (event, selectedDate) => {
    const currentDate = selectedDate || mydateFrom;
    setDateFrom(currentDate);
    setShowFrom(false);
    setShowFrom(false);
  };

  const [mydateTo, setDateTo] = useState(new Date());
  const [displaymodeTo, setModeTo] = useState("date");
  const [isDisplayDateTo, setShowTo] = useState(false);
  // handle change to date
  const changeSelectedDateTo = (event, selectedDate) => {
    const currentDate = selectedDate || mydateTo;
    setDateTo(currentDate);
    setShowTo(false);
    // console.log(selectedDate)
    // getUnbilledReport(selectedDate)
  };

  const [showGenerate, setShowGenerate] = useState(false);
  const [value, setValue] = useState(0);

  /**
   * vehicle_id
   * vehicle_no
   * date_time_in
   * paid_amt
   */

  // useEffect(() => {
  //   getVehicleWiseReport(mydateFrom, mydateTo);
  // }, [mydateFrom, mydateTo]);

  const submitDetails = () => {
    let formattedDateFrom = mydateFrom.toISOString().slice(0, 10);
    let formattedDateTo = mydateTo.toISOString().slice(0, 10);
    getVehicleWiseReport(formattedDateFrom, formattedDateTo);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* render custom Header */}
      <CustomHeader title="Vehicle Wise Report" navigation={navigation} />
      {/* render from date picker */}
      {isDisplayDateFrom && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={mydateFrom}
          mode={displaymodeFrom}
          is24Hour={true}
          display="default"
          onChange={changeSelectedDateFrom}
        />
      )}

      {/* render to date picker */}
      {isDisplayDateTo && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={mydateTo}
          mode={displaymodeTo}
          is24Hour={true}
          display="default"
          onChange={changeSelectedDateTo}
        />
      )}

      <View style={{ padding: PixelRatio.roundToNearestPixel(20), flex: 1 }}>
        <Text style={styles.select_date_header}>
          Select Date
          {}
        </Text>
        {/* date selector button */}
        <View style={styles.select_date_button_container}>
          <Text style={{ ...styles.date_text, marginRight: 50 }}>
            From Date
          </Text>
          <Text style={{ ...styles.date_text, marginLeft: 20 }}>To Date</Text>
        </View>
        <View style={styles.select_date_button_container}>
          <Pressable
            style={styles.select_date_button}
            onPress={() => setShowFrom(true)}>
            {icons.calendar}
            <Text style={styles.date_text}>
              {mydateFrom.toLocaleDateString("en-GB")}
            </Text>
          </Pressable>

          <Pressable
            style={styles.select_date_button}
            onPress={() => setShowTo(true)}>
            {icons.calendar}
            <Text style={styles.date_text}>
              {mydateTo.toLocaleDateString("en-GB")}
            </Text>
          </Pressable>
        </View>
        <CustomButton.GoButton
          title="Submit"
          style={{ margin: 10 }}
          onAction={() => submitDetails()}
        />

        {loading && <Text> fetching data... </Text>}

        {/* report genarate table */}
        {vehicleWiseReports && (
          <View>
            <ScrollView>
              <View style={styles.container}>
                <View style={[styles.row, styles.header]}>
                  <Text style={[styles.headerText, styles.hcell]}>
                    Veh. Id.
                  </Text>
                  <Text style={[styles.headerText, styles.hcell]}>
                    Veh. No.
                  </Text>
                  <Text style={[styles.headerText, styles.hcell]}>In time</Text>

                  <Text style={[styles.headerText, styles.hcell]}>
                    Paid Amt.
                  </Text>
                </View>
                {vehicleWiseReports &&
                  vehicleWiseReports.map((item, index) => (
                    <View
                      style={[
                        styles.row,
                        index % 2 != 0 ? styles.evenBg : styles.oddbg,
                      ]}
                      key={index}>
                      <Text style={[styles.cell]}>{item.vehicle_id} </Text>
                      <Text style={[styles.cell]}>{item.vehicle_no}</Text>
                      <Text style={[styles.cell]}>
                        {new Date(item.date_time_in).toLocaleString()}
                      </Text>

                      <Text style={[styles.cell]}>{item.paid_amt}</Text>
                      {/* <Text style={[styles.cell]}>{item.age}</Text> */}
                    </View>
                  ))}
                {
                  //     <View
                  //   style={{
                  //     ...styles.row,
                  //     backgroundColor: colors["primary-color"],
                  //   }}>
                  //   <Text style={[styles.cell, styles.hcell]}>{"Total"} </Text>
                  //   <Text style={[styles.cell, styles.hcell]}>
                  //     {detailedReportData && totalQTY}
                  //   </Text>
                  //   <Text style={[styles.cell, styles.hcell]}>
                  //     {detailedReportData && totalAdvance}
                  //   </Text>
                  //   <Text style={[styles.cell, styles.hcell]}>
                  //     {detailedReportData && totalPrice}
                  //   </Text>
                  //   {/* <Text style={[styles.cell]}>{item.age}</Text> */}
                  // </View>
                }
                <View style={{}}>
                  <Text style={{ marginLeft: 10 }}>
                    Report Generated on {date.toLocaleString()}{" "}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
        {/* back and print action button */}
        <View style={styles.actionButton}>
          {/* Generate Button */}
          {
            //   showGenerate && (
            //     <CustomButton.GoButton
            //       title={"Generate Report"}
            //       style={{ flex: 1, marginLeft: 10 }}
            //       onAction={() => handleGenerateReport()}
            //     />
            //   )
          }
          {/* Back Button */}
          {
            <CustomButton.CancelButton
              title={"Back"}
              style={{ flex: 1, marginRight: 10 }}
              onAction={() => navigation.goBack()}
            />
          }
          {/* Print Button */}
          {detailedReportData && (
            <CustomButton.GoButton
              title="Print Report"
              style={{ flex: 1, marginLeft: 10 }}
              onAction={() => console.log("handleUnbilledPrint()")}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  select_date_header: {
    alignSelf: "center",
    fontSize: PixelRatio.roundToNearestPixel(16),
    paddingBottom: PixelRatio.roundToNearestPixel(10),
    fontWeight: "500",
    color: colors.black,
  },
  select_date_button: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors["light-gray"],
    padding: PixelRatio.roundToNearestPixel(10),
    margin: PixelRatio.roundToNearestPixel(5),
    borderRadius: PixelRatio.roundToNearestPixel(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: PixelRatio.roundToNearestPixel(20),
  },
  date_text: {
    marginLeft: PixelRatio.roundToNearestPixel(10),
    fontWeight: "600",
    color: colors.black,
  },
  select_date_button_container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    marginBottom: PixelRatio.roundToNearestPixel(5),
    width: width,
    padding: PixelRatio.roundToNearestPixel(10),
  },
  container: {
    flex: 1,
    borderRadius: PixelRatio.roundToNearestPixel(10),
    backgroundColor: colors.white,
    marginBottom: 200,
  },
  header: {
    backgroundColor: colors["primary-color"],
    borderTopRightRadius: PixelRatio.roundToNearestPixel(10),
    borderTopLeftRadius: PixelRatio.roundToNearestPixel(10),
  },
  headerText: {
    fontWeight: "bold",
    color: colors.white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: PixelRatio.roundToNearestPixel(10),
  },
  cell: {
    flex: 1,
    color: colors.black,
  },
  hcell: {
    flex: 1,
    color: colors.white,
  },
  oddbg: {},

  evenBg: {
    backgroundColor: "#dddddd",
  },
});
