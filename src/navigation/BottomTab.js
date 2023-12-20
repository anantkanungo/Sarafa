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
import {Text} from 'react-native';

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
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#555',
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#fff',
        tabBarLabelStyle: {fontSize: 12},
        headerShown: false,
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            size = focused ? 20 : 20;
            // color = focused ? '#e91e63' : '#555'
          } else if (route.name === 'My Cart') {
            iconName = 'shopping-cart';
            size = focused ? 20 : 20;
          } else if (route.name === 'Place Order') {
            iconName = 'shopping-bag';
            size = focused ? 20 : 20;
          } else if (route.name === 'My Orders') {
            iconName = 'tasks';
            size = focused ? 20 : 20;
            // iconName = 'clock-o';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
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
