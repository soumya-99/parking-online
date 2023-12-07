import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportScreen from "../screens/BottomNavigationScreens/ReportScreen";
import navigationRoutes from "../routes/navigationRoutes";
import VehicleWiseFixedReportScreen from "../screens/ReportScreens/VehicleWiseFixedReportScreen";
import DetailedReportScreen from "../screens/ReportScreens/DetailedReportScreen";
import ShiftWiseReportScreen from "../screens/ReportScreens/ShiftWiseReportScreen";
import OperatorWiseReportScreen from "../screens/ReportScreens/OperatorWiseReportScreen";

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
      <Stack.Screen
        name="Vehiclewise_Fixed_Report_Screen"
        component={VehicleWiseFixedReportScreen}
      />
      <Stack.Screen
        name="Shiftwise_Report_Screen"
        component={ShiftWiseReportScreen}
      />
      <Stack.Screen
        name="Operatorwise_Report_Screen"
        component={OperatorWiseReportScreen}
      />
    </Stack.Navigator>
  );
};

export default ReportsNavigation;
