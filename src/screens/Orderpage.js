import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Button, TextInput, Platform,
  PermissionsAndroid,
  Modal,
  Alert,
  Pressable,
} from 'react-native';

const Orderpage = ({ navigation }) => {

  const data = [];

  const taskComplete = () => {
    Alert.alert('Your task is complete');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        {<TouchableOpacity onPress={() => navigation.navigate('ScreenZoom')}>
          <Image style={styles.productImage}
            src='https://i.pinimg.com/originals/34/89/c5/3489c53379ede9c53be27ca67342f639.jpg' />

        </TouchableOpacity>}


      </View>
      <View style={styles.productText}>
        <Text style={styles.catagory1}>Catagory</Text>
        <Text style={styles.catagory2}>Description about the jewllery...</Text>
      </View>
      <View style={styles.sbContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={taskComplete}>
          <Text style={styles.SubmitButtonText}>Task Complete</Text>
        </TouchableOpacity>
      </View>


    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#DBD7D2',
  },
  tinyLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 50,
    // backgroundColor: '#DBD7D2',
  },
  sbContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  SubmitButtonText: {
    color: 'white',
    backgroundColor: 'black',
    alignSelf: 'center',
    fontSize: 18,
    padding: 10,
    fontFamily: 'Gilroy-Regular',

  },
  productImage: {
    marginHorizontal: 19,
    height: 300,
    width: '90%',
    // objectFit: "cover",
  },

  catagory1: {
    fontSize: 24,
    fontFamily: 'Gilroy-Regular',
    marginTop: 28,
    marginBottom: 4,
    color: 'black',
    marginLeft: 4,
    textAlign: 'center',
  },
  catagory2: {
    fontSize: 18,
    marginTop: 18,
    marginBottom: 4,
    color: 'grey',
    marginLeft: 4,
    fontFamily: 'Gilroy-Regular',
    textAlign: 'center',

  },

});

export default Orderpage;

