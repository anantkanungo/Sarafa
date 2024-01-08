import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Catalogs from '../components/home/Catalogs';
import KarigarInfo from '../screens/KarigarInfo';
import YourOrder from '../screens/YourOrder';
import OrderPage from '../screens/OrderPage';
import ScreenZoom from '../screens/ScreenZoom';
import KarigarDetails from '../screens/KarigarDetails';
import TaskAssign from '../screens/TaskAssign';
import KarigerOrder from '../screens/KarigarOrder';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Catalogs"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Catalogs" component={Catalogs} />
      <Stack.Screen name="KarigarInfo" component={KarigarInfo} />
      <Stack.Screen name="Your_Order" component={YourOrder} />
      <Stack.Screen name="Orderpage" component={OrderPage} />
      <Stack.Screen name="ScreenZoom" component={ScreenZoom} />
      <Stack.Screen name="Karigar_Details" component={KarigarDetails} />
      <Stack.Screen name="KarigerOrder" component={KarigerOrder} />
      <Stack.Screen name="TaskAssign" component={TaskAssign} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
