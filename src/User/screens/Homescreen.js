import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
// https://github.com/ladjs/react-native-loading-spinner-overlay
// import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../components/home/Header.js';
import Catalogs from '../components/home/Catalogs.js';
import {useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const userDetails = useSelector(state => state.userDetails);
  const userId = userDetails ? userDetails.id : null;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* <Text>Welcome, User Id: {userId}</Text> */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.headerText}>Catalog</Text>
      </View>
      <Catalogs navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export default HomeScreen;
