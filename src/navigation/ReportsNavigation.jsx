import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportScreen from "../screens/ReportScreen";
import navigationRoutes from "../routes/navigationRoutes";

const Stack = createNativeStackNavigator();

const ReportsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={navigationRoutes.reportScreen}
        component={ReportScreen}
      />
    </Stack.Navigator>
  );
};

export default ReportsNavigation;
