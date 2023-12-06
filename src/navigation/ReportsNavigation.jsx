import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportScreen from "../screens/BottomNavigationScreens/ReportScreen";
import navigationRoutes from "../routes/navigationRoutes";
import VehicleWiseFixedReportScreen from "../screens/ReportScreens/VehicleWiseFixedReportScreen";
import DetailedReportScreen from "../screens/ReportScreens/DetailedReportScreen";

const Stack = createNativeStackNavigator();

const ReportsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={navigationRoutes.reportScreen}
        component={ReportScreen}
      />
      <Stack.Screen
        name="Detailed_Report_Screen"
        component={DetailedReportScreen}
      />
    </Stack.Navigator>
  );
};

export default ReportsNavigation;
