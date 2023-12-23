import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import Catagories from '../screens/Catagories';
import PreviousOrder from '../screens/PreviousOrder';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Catagories" component={Catagories} />
      <Stack.Screen name="PreviousOrder" component={PreviousOrder} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
