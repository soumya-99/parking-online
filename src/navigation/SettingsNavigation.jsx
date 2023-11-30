import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="setting" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
