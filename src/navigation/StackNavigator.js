import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderScreen from '../screens/OrderScreen';
import ShopOrder from '../screens/ShopOrder';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="ShopOrder" component={ShopOrder} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
