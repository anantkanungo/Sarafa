import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Tick from '../../assets/tick.png';

const PendingOrder = ({navigation}) => {
  return (
    <View style={Styles.container}>
      {/* header */}
      <View style={Styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={Styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={Styles.headerText}>Orders</Text>
      </View>
      {/* contain */}
      <View style={Styles.image_container}>
        <Image
          source={{
            uri: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
          }}
          style={Styles.tinyLogo1}
        />
        <View style={{marginLeft: 30}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#000',
            }}>
            RG/833/234
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Tick} style={Styles.tinyLogo2} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#000',
              }}>
              Order Confirmed
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000',
            }}>
            Processing
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000',
            }}>
            Completed
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity style={Styles.button1} onPress={() => {}}>
          <Text style={Styles.buttonText1}>Previous Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  tinyLogo2: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  tinyLogo1: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
  },
  // header
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image_container: {
    flexDirection: 'row',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  button1: {
    backgroundColor: '#454545',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    // marginTop: 10,
    margin: 10,
    width: 200,
  },
  buttonText1: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default PendingOrder;
