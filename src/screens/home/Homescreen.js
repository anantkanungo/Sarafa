import React, {useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
// https://github.com/ladjs/react-native-loading-spinner-overlay
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/home/Header.js';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={{fontSize: 32}}>Place Order</Text>
      <Text style={{fontSize: 32}}>Pending Orders</Text>
      <Text style={{fontSize: 32}}>Caragories</Text>
      {/* <Text style={styles.welcome}>Welcome {userInfo.user.fullname}</Text> */}
      {/* <Button title="Logout" color="red" /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
