import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../../components/home/Header';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Header />
            <Text style={{fontSize: 34, color: '#000000'}}>CataLogs</Text>
        </View>
    )
}

function PlaceOrder() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Place Order!</Text>
        </View>
    );
}

function PendingOrder() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pending Order!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

const BottomTab = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                headerShown: false,
            }}



        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Place Order"
                component={PlaceOrder}
            // options={{
            //   tabBarLabel: 'Home',
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons name="home" color={color} size={size} />
            //   ),
            // }}
            />
            <Tab.Screen
                name="Pending Order"
                component={PendingOrder}
            // options={{
            //   tabBarLabel: 'Updates',
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons name="bell" color={color} size={size} />
            //   ),
            // }}
            />
        </Tab.Navigator>
    );
}

export default BottomTab;