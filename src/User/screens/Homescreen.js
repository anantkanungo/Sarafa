import React, {useContext} from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
// https://github.com/ladjs/react-native-loading-spinner-overlay
// import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../components/home/Header.js';
import Catalogs from '../components/home/Catalogs.js';
import {connect} from 'react-redux';
import {customerLogout} from '../../reduxThunk/Action.js';

const HomeScreen = ({navigation, customerLogout}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.welcome}>Welcome {userInfo.user.fullname}</Text> */}
      <Header />
      <Catalogs navigation={navigation} />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => customerLogout()}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = {
  customerLogout,
};

export default connect(null, mapDispatchToProps)(HomeScreen);
