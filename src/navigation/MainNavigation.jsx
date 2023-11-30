import { Text, View } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import BottomNavigation from "./BottomNavigation";
import { AuthContext } from "../context/AuthProvider";

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  const { isLogin, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
        }}>
        <Text style={{ fontSize: 20, color: "yellow" }}>Loading...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {isLogin ? (
        <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Bottom_Navigation"
              component={BottomNavigation}
            />
          </Stack.Navigator>
        </>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Sign_In_Screen" component={SignInScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
