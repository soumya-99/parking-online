import { PixelRatio, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../components/CustomHeader";
import colors from "../../resources/colors/colors";
import strings from "../../resources/strings/strings";
import icons from "../../resources/icons/icons";
import InputCustom from "../../components/InputCustom";
import CustomButton from "../../components/CustomButton";

import estyles from "../../styles/styles";

const ChangePasswordScreen = ({ navigation }) => {
  // state to store  password
  const [password, changePassword] = useState("");
  // state to store Confirm password
  const [confirmPassword, chaneConfirmPassword] = useState("");

  return (
    <>
      {/* Render Heade */}
      <CustomHeader title={"Change Password"} navigation={navigation} />
      <View style={styles.container}>
        <ScrollView>
          {/* user Details */}
          <View style={styles.userDetils_container}>
            {/* user name */}
            <Text style={styles.user_name}> Hello, {"userDetails?.name"} </Text>
            {/* comapny Name */}
            <Text style={styles.comapny_name}> {strings.company_name} </Text>
            {/* Divider */}
            <View style={styles.divider} />
            {/* email  */}
            {/* <View style={{flexDirection: 'row'}}>
              {icons.email}
              <Text style={{marginLeft: 10}}>{'email@email.com'}</Text>
            </View> */}
            {/* phone */}
            <View style={{ flexDirection: "row" }}>
              {icons.phone}
              <Text style={{ marginLeft: 10 }}>{"userDetails?.user_id"}</Text>
            </View>
          </View>
          {/* Change Password */}
          <View>
            <View
              style={{
                alignItems: "center",
                marginVertical: PixelRatio.roundToNearestPixel(10),
              }}>
              {/* icon */}
              {icons.forgot}

              {/* change password Text */}

              <Text style={styles.change_password_text}>
                {strings.change_password}
              </Text>
              {/* Divider */}
              <View style={styles.divider_Two} />
            </View>

            <View>
              {/* new  password feild */}

              {/* re-type Password feild */}

              {/* Action Button */}

              <View style={[estyles.login_container, estyles.login_container]}>
                <InputCustom
                  icon={icons.unlock}
                  placeholder={"Password"}
                  value={password}
                  onChangeText={changePassword}
                  keyboardType={"default"}
                  secureTextEntry={true}
                />
                <InputCustom
                  icon={icons.unlock}
                  placeholder={"Re-Enter Password"}
                  value={confirmPassword}
                  onChangeText={chaneConfirmPassword}
                  keyboardType={"default"}
                  secureTextEntry={true}
                />

                {/* password actions */}
                <View style={estyles.password_action_container}>
                  {/* reset action button */}
                  <CustomButton.CancelButton
                    title={"Reset"}
                    onAction={() => {
                      console.log(
                        "changePassword(''); chaneConfirmPassword('');",
                      );
                    }}
                    style={{
                      flex: 1,
                      marginRight: PixelRatio.roundToNearestPixel(8),
                    }}
                  />

                  {/* change password action button */}

                  <CustomButton.GoButton
                    title={"Change Password"}
                    onAction={
                      () => console.log("Handle Password Change!")
                      //   (password && confirmPassword) ? (
                      //     password === confirmPassword
                      //       ? handleChangePassword(
                      //         userDetails.user_id,
                      //         userDetails.name,
                      //         password,
                      //       ).then(() => {
                      //         changePassword('')
                      //         chaneConfirmPassword('')
                      //       })
                      //       : alert('password does not match ')) : alert('please enter  password')
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PixelRatio.roundToNearestPixel(10),
  },
  userDetils_container: {
    borderRadius: PixelRatio.roundToNearestPixel(10),
    padding: PixelRatio.roundToNearestPixel(10),
    backgroundColor: colors.white,
    borderWidth: PixelRatio.roundToNearestPixel(0.2),
    borderColor: colors["light-gray"],
    elevation: PixelRatio.roundToNearestPixel(1),
  },

  divider: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: colors.gray,
    marginVertical: PixelRatio.roundToNearestPixel(10),
  },
  divider_Two: {
    marginTop: PixelRatio.roundToNearestPixel(20),
    alignSelf: "center",
    backgroundColor: "#18a2ba",
    width: PixelRatio.roundToNearestPixel(60),
    height: PixelRatio.roundToNearestPixel(2),
  },
  change_password_text: {
    fontSize: PixelRatio.roundToNearestPixel(20),
    color: colors["black"],
    fontWeight: "bold",
    marginTop: PixelRatio.roundToNearestPixel(10),
  },
});
