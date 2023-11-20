import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

const Order = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header_container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
              }}
            />
          </TouchableOpacity>
        </View>
        {/* <Text>Place Order</Text> */}
        <View
          style={{
            width: '100%',
            height: 450,
          }}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
            }}
            style={{height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#000',
          }}>
          RG/833/234
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 'bold',
            color: '#555',
            marginTop: 10,
          }}>
          Description Lorem dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula..
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText1}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  // header
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  button1: {
    backgroundColor: '#454545',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    width: 150,
  },
  buttonText1: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
