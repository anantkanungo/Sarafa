import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// https://github.com/oblador/react-native-vector-icons
// fontawesome.com
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../User/screens/Homescreen';
import PlaceOrder from '../User/screens/PlaceOrder';
import OrderScreen from '../User/screens/OrderScreen';
import CartScreen from '../User/screens/CartScreen';
import {useSelector} from 'react-redux';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const cartData = useSelector(state => state.cart);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    setCartItems(cartData.length);
  }, [cartData]);
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#E78C37',
        tabBarInactiveTintColor: '#555',
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#fff',
        tabBarLabelStyle: {fontSize: 12},
        headerShown: false,
        tabBarIcon: ({focused, size, color}) => {
          let imageUri;
          if (route.name === 'Home') {
            imageUri = focused
              ? 'https://img.icons8.com/material-outlined/24/shop.png'
              : 'https://img.icons8.com/material-outlined/24/shop.png';
            size = focused ? 20 : 20;
            // color = focused ? '#E78C37' : '#555';
          } else if (route.name === 'My Cart') {
            imageUri = focused
              ? 'https://img.icons8.com/material-outlined/24/000000/shopping-bag--v1.png'
              : 'https://img.icons8.com/material-outlined/24/000000/shopping-bag--v1.png';
            size = focused ? 20 : 20;
          } else if (route.name === 'Place Order') {
            imageUri = focused
              ? 'https://img.icons8.com/material-outlined/24/shopaholic.png'
              : 'https://img.icons8.com/material-outlined/24/shopaholic.png';
            size = focused ? 20 : 20;
          } else if (route.name === 'My Orders') {
            imageUri = focused
              ? 'https://img.icons8.com/material-outlined/24/check.png'
              : 'https://img.icons8.com/material-outlined/24/check.png';
            size = focused ? 20 : 20;
          }
          return (
            <Image
              source={{uri: imageUri}}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="My Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartItems > 0 ? cartItems : null,
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: 'white',
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen name="Place Order" component={PlaceOrder} />
      <Tab.Screen name="My Orders" component={OrderScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
