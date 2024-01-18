import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderScreen from '../screens/OrderScreen';
import OrderPage from '../screens/Orderpage';
import ImageZoomScreen from '../screens/ImageZoomScreen';

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
      <Stack.Screen name="ImageZoom" component={ImageZoomScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
