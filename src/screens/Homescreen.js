import React, {useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
// https://github.com/ladjs/react-native-loading-spinner-overlay
// import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../components/home/Header.js';
import Catalogs from '../components/home/Catalogs.js';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.welcome}>Welcome {userInfo.user.fullname}</Text> */}
      <Header />
      <Catalogs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
