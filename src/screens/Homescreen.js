import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
// https://github.com/ladjs/react-native-loading-spinner-overlay
// import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../components/home/Header.js';
import Catalogs from '../components/home/Catalogs.js';

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.headerText}>Catalogue</Text>
      </View>
      <Catalogs navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d2c4',
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 6,
    fontFamily: 'Gilroy-Regular',
  },
});

export default HomeScreen;
