import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default function Splash() {
  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../assets/NG_logo.png')} />
      {/* <Text style={styles.text}>NG JEWELLERS</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e1d2c4',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 40,
    color: '#000',
  },
});
