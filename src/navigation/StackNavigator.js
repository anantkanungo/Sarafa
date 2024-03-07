import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderScreen from '../screens/OrderScreen';
import OrderPage from '../screens/Orderpage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="OrderPage" component={OrderPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
