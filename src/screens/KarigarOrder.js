import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const KarigerOrder = ({navigation}) => {
  const data = [];

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
      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Order Details</Text>
      </View>
      <View>
        {
          <TouchableOpacity onPress={() => navigation.navigate('ScreenZoom')}>
            <Image
              style={styles.productImage}
              src="https://i.pinimg.com/originals/34/89/c5/3489c53379ede9c53be27ca67342f639.jpg"
            />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.productText}>
        <Text style={styles.catagory1}>Catagory</Text>
        <Text style={styles.catagory2}>Description about the jewllery...</Text>
        <Text style={styles.catagory3}>Assigned to : Karigar_Name</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 10,
  },
  productImage: {
    // flex: 1,
    height: 300,
    width: '100%',
    objectFit: 'cover',
  },
  catagory1: {
    fontSize: 24,
    fontFamily: 'Gilroy-Regular',
    marginTop: 8,
    marginBottom: 4,
    color: 'black',
    marginLeft: 4,
    alignItems: 'center',
  },
  catagory2: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 4,
    color: 'grey',
    marginLeft: 4,
    fontFamily: 'Gilroy-Regular',
  },
  titleContainer: {
    marginTop: 2,
    marginBottom: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 27,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
  },
  catagory3: {
    fontSize: 22,
    marginTop: 8,
    marginBottom: 4,
    color: 'black',
    marginLeft: 4,
    fontFamily: 'Gilroy-Regular',
  },
});

export default KarigerOrder;
