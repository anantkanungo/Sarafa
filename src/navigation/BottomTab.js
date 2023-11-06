import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// https://github.com/oblador/react-native-vector-icons
// fontawesome.com
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/Homescreen';
import PlaceOrder from '../screens/PlaceOrder';

function PendingOrder() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Pending Order!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#555555',
        tabBarActiveBackgroundColor: '#8c8274',
        tabBarInactiveBackgroundColor: '#abaaa8',
        tabBarLabelStyle: {fontSize: 14},
        headerShown: false,
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = 'home';
            // size = focused ? 25 : 20;
            // color = focused ? '#e91e63' : '#555'
          } else if (route.name === 'Place Order') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Pending Order') {
            iconName = 'tasks';
            // iconName = 'clock-o';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Place Order" component={PlaceOrder} />
      <Tab.Screen name="Pending Order" component={PendingOrder} />
    </Tab.Navigator>
  );
};

export default BottomTab;
