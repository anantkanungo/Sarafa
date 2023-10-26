import React from 'react';
// https://reactnavigation.org/docs/getting-started/
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/userLogin/Loginsecreen';
import HomeScreen from '../screens/home/Homescreen';
// import StackNavigator from '../navigation/stackNavigator';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default Root;
