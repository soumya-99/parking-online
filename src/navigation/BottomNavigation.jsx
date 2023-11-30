import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import navigationRoutes from "../routes/navigationRoutes";
import ReceiptNavigation from "./ReceiptNavigation";
import ReportScreen from "../screens/ReportScreen";
import icons from "../resources/icons/icons";
import SettingsScreen from "../screens/SettingsScreen";
import OutpassScreen from "../screens/OutpassScreen";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const { receiptScreen, outpassScreen, reportScreen, settingsScreen } = navigationRoutes;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, size: 20 },
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName={receiptScreen}>
      {/* Receipt Screen */}
      {
        <Tab.Screen
          name={"Receipt_Navigation"}
          options={{
            title: "Receipt",
            tabBarIcon: ({ color, size }) => icons.receipt(color, 30),
          }}
          component={ReceiptNavigation}
        />
      }

      {/* Out pass bill */}
      <Tab.Screen
        name={outpassScreen}
        options={{
          title: "Outpass",
          tabBarIcon: ({ color, size }) => icons.setting(color, 30),
        }}
        component={OutpassScreen}
      />

      {/* report genarate */}
      <Tab.Screen
        name={reportScreen}
        options={{
          title: "Report",
          tabBarIcon: ({ color, size }) => icons.report(color, 30),
        }}
        component={ReportScreen}
      />

      {/*Setting Screen */}
      <Tab.Screen
        name={settingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => icons.setting(color, 30),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
