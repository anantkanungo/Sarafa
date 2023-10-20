import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import BackgroundImage from '../../assets/IMG_HEADER.jpg';

export default function Header() {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={BackgroundImage} /> */}
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={BackgroundImage}>
        <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold'}}>Hello, UserName</Text>
        <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold'}}>John Jewelers</Text>
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
    paddingVertical: 30,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
});
