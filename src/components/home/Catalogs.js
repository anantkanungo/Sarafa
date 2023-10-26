import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import CatalogsImage from '../../assets/ringimage.jpg';
// https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg

const Catalogs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 34, color: '#000000'}}>Catalogs</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 20,
        }}>
        <Image style={styles.tinyLogo} source={CatalogsImage} />
        <Image style={styles.tinyLogo} source={CatalogsImage} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 20,
        }}>
        <Image style={styles.tinyLogo} source={CatalogsImage} />
        <Image style={styles.tinyLogo} source={CatalogsImage} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 20,
        }}>
        <Image style={styles.tinyLogo} source={CatalogsImage} />
        <Image style={styles.tinyLogo} source={CatalogsImage} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 20,
        }}>
        <Image style={styles.tinyLogo} source={CatalogsImage} />
        <Image style={styles.tinyLogo} source={CatalogsImage} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 20,
        }}>
        <Image style={styles.tinyLogo} source={CatalogsImage} />
        <Image style={styles.tinyLogo} source={CatalogsImage} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 20,
        }}>
        <Image style={styles.tinyLogo} source={CatalogsImage} />
        <Image style={styles.tinyLogo} source={CatalogsImage} />
      </View>
    </ScrollView>
  );
};

export default Catalogs;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    // borderRadius: 10,
    // padding: 15,
    // border: 1,
  },
});
