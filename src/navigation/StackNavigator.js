import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderScreen from '../screens/OrderScreen';
import Orderpage from '../screens/Orderpage';
import ScreenZoom from '../screens/ScreenZoom';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="Orderpage" component={Orderpage} />
      <Stack.Screen name="ScreenZoom" component={ScreenZoom} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
