import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/BottomNavigationScreens/SettingsScreen";
import GeneralSettingsScreen from "../screens/SettingsScreens/GeneralSettingsScreen";

const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="setting" component={SettingsScreen} />
      <Stack.Screen name="general_settings" component={GeneralSettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
