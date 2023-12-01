import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReceiptScreen from "../screens/BottomNavigationScreens/ReceiptScreen";

const Stack = createNativeStackNavigator();

const ReceiptNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
      {/* <Stack.Screen
                name="create_receipt"
                component={CreateReceipt}
            /> */}
    </Stack.Navigator>
  );
};

export default ReceiptNavigation;
