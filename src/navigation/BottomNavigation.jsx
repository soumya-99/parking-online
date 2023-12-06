import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import navigationRoutes from "../routes/navigationRoutes";
import ReceiptNavigation from "./ReceiptNavigation";
import ReportScreen from "../screens/BottomNavigationScreens/ReportScreen";
import icons from "../resources/icons/icons";
import SettingsScreen from "../screens/BottomNavigationScreens/SettingsScreen";
import OutpassScreen from "../screens/BottomNavigationScreens/OutpassScreen";
import ReportsNavigation from "./ReportsNavigation";
import SettingsNavigation from "./SettingsNavigation";
import { AuthContext } from "../context/AuthProvider";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const { receiptScreen, outpassScreen, reportScreen, settingsScreen } =
    navigationRoutes;

  const { generalSettings } = useContext(AuthContext);
  const { dev_mod } = generalSettings;

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
      {dev_mod != "R" && dev_mod != "F" && (
        <Tab.Screen
          name={outpassScreen}
          options={{
            title: "Outpass",
            tabBarIcon: ({ color, size }) => icons.setting(color, 30),
          }}
          component={OutpassScreen}
        />
      )}

      {/* report genarate */}
      <Tab.Screen
        name="Reports_Navigation"
        options={{
          title: "Report",
          tabBarIcon: ({ color, size }) => icons.report(color, 30),
        }}
        component={ReportsNavigation}
      />

      {/*Setting Screen */}
      <Tab.Screen
        name={settingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => icons.setting(color, 30),
        }}
        component={SettingsNavigation}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
