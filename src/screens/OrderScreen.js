import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { customerLogout } from '../reduxThunk/action/authAction';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTabsNavigator from '../navigation/TopTabsNavigator';
import ImageZoomScreen from './ImageZoomScreen';

const Stack = createNativeStackNavigator();

const OrderScreen = ({ customerLogout, details }) => {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState('');

  const fetchOrders = async () => {
    try {
      const token = details?.token;
      const response = await axios.get(
        'http://139.59.58.151:8000/kariger/task',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userData = response.data.data[0];
      setAddress(userData.address);
      setOrders(userData.task || []); // Assuming 'task' contains the array of orders
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // console.log(orders);
  }, [address]); // address, 

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}></View>
        <TouchableOpacity onPress={() => customerLogout()}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{details?.username}</Text>
        <Text style={styles.infoText}>Address: {address}</Text>
      </View>

      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Orders/आपके ऑर्डर्स</Text>
      </View>

      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Orders" component={TopTabsNavigator} />
        <Stack.Screen name="ImageZoom" component={ImageZoomScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

const mapDispatchToProps = {
  customerLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e1d2c4'
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  logoutButtonText: {
    color: '#79443B',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginRight: 15,
    padding: 5,
  },
  infoContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 20,
    borderWidth: .85,
    borderColor: 'grey',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: '#79443B',
    marginTop: 8,
  },
  titleContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    padding: 10,
    color: '#79443B',
  },
});
