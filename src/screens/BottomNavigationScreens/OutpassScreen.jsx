import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PixelRatio,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import CustomButton from "../../components/CustomButton";
import RoundedInputField from "../../components/RoundedInputField";
import normalize from "react-native-normalize";
import colors from "../../resources/colors/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import icons from "../../resources/icons/icons";
import { useState } from "react";

export default function OutpassScreen() {
  const [number, setNumber] = useState("");
  return (
    <SafeAreaView>
      <CustomHeader title={"BILL/OUTPASS"} />
      <View style={styles.padding_container}>
        <CustomButton.GoButton
          title={"Scan"}
          onAction={() => console.log("scanner()")}
        />

        <Text style={styles.receipt_or_vehicleNo}>Receipt / Vehicle No.</Text>
        <View style={styles.radioButton_container}>
          {/* <RadioButton.RoundedRadioButton title={'Vehicle Number'} /> */}
          {/* <RadioButton.RoundedRadioButton title={"Receipt Number"} /> */}
        </View>

        {/* <View
          style={{
            width: '97%',
            bottom: PixelRatio.roundToNearestPixel(160),
            position: 'absolute',
            backgroundColor: colors['light-gray'],
            borderRadius: PixelRatio.roundToNearestPixel(10),
            maxHeight: PixelRatio.roundToNearestPixel(100),
            justifyContent: 'center',
            left: PixelRatio.roundToNearestPixel(25),
          }}>

          <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps={'handled'}>
            {data &&
              data.map((props, index) => {
                const formatTime = new Date(props.date_time_in);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleUploadOutPassData(index)}
                    style={{
                      borderColor: colors.white,
                      borderBottomWidth: 1,
                      width: '100%',
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: PixelRatio.roundToNearestPixel(16),
                        color: 'black',
                        margin: PixelRatio.roundToNearestPixel(2),
                      }}>
                      {' '}
                      {props?.vehicleNumber || props?.vehicle_no}
                      {'   -  '}
                      {formatTime.toLocaleString()} {'   -  '}
                      {props.receiptNo}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View> */}
        <RoundedInputField
          placeholder={"Enter Receipt / Vehicle No"}
          value={number}
          onChangeText={setNumber}
        />
        {/* render vehicle */}

        <Pressable
          onPress={() => console.log("uploadDataToTheServer()")}
          style={{ alignSelf: "center", marginTop: normalize(30) }}>
          {icons.sync}
        </Pressable>

        {/* <View style={{ width: '100%', bottom: PixelRatio.roundToNearestPixel(55), position: 'absolute', backgroundColor: colors['light-gray'], borderRadius: PixelRatio.roundToNearestPixel(10),maxHeight:PixelRatio.roundToNearestPixel(100) }}>
        <ScrollView>
        {data &&
                data.map((props, index) => {
                  const formatTime = new Date(props.date_time_in)
                  return(
                    <>
                     <Pressable
                    key={index}
                    onPress={() => handleUploadOutPassData(index)}
                   style={{borderColor:colors.white,borderBottomWidth:1,width:"100%",}}
                  >
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: PixelRatio.roundToNearestPixel(16),
                        color: 'black',
                        margin: PixelRatio.roundToNearestPixel(2),
                      }}>
                      {' '}
                      {props?.vehicleNumber || props?.vehicle_no}{'   -  '}
                      {formatTime.toLocaleString()} {'   -  '}
                      {props.receiptNo}
                    </Text>
                  </Pressable>
                    </>
                  )
                })}
        </ScrollView>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  padding_container: {
    padding: normalize(20),
  },
  receipt_or_vehicleNo: {
    alignSelf: "center",
    color: colors.black,
    marginTop: normalize(20),
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
  },
  radioButton_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: normalize(10),
  },
});
