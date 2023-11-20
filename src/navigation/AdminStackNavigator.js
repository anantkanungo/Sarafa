import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeAdmin from '../Admin/Screens/HomeAdmin';

const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeAdmin} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
