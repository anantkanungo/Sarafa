import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import BackgroundImage from '../../assets/IMG_HEADER.jpg';

export default function Header() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={BackgroundImage}>
        <Text
          style={{
            fontSize: 26,
            color: 'white',
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Hello, UserName
        </Text>
        <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold'}}>
          Jeweler's name
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // marginHorizontal: 10,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: 45,
    backgroundColor: '#000',
    opacity: 100,
  },
});
