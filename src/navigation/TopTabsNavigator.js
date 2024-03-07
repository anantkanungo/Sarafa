import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderProcessing from '../screens/OrderProcessing';
import OrderCompleted from '../screens/OrderCompleted';

const Tab = createMaterialTopTabNavigator();

export default function TopTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Processing" component={OrderProcessing} />
      <Tab.Screen name="Completed" component={OrderCompleted} />
    </Tab.Navigator>
  );
}
