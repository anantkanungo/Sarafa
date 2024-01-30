import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { customerLogout } from '../reduxThunk/action/authAction';
import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';

const OrderScreen = ({ customerLogout, details, navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState('');

  const fetchOrders = async () => {
    try {
      const token = details?.token;
      const response = await axios.get(
        'http://139.59.58.151:8000/workshop/task',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userData = response.data.data[0];
      setAddress(userData.address);
      setOrders(userData.task || []); // Assuming 'task' contains the array of orders
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ShopOrder')}>
      <View style={styles.cardHighlight} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.category}</Text>
        <Text style={styles.description}>{item.orderId}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}></View>
        <TouchableOpacity onPress={() => customerLogout()}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{details?.username}</Text>
        <Text style={styles.infoText}>Address: {address}</Text>
      </View>

      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Shops/आपके ग्राहक</Text>
      </View>

      {/* FlatList */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={orders}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

const mapDispatchToProps = {
  customerLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  infoContainer: {
    backgroundColor: 'black',
    marginHorizontal: 15,
    padding: 20,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: 'white',
    marginTop: 8,
  },
  titleContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontFamily: 'Gilroy-Regular',
    padding: 10,
    color: '#79443B',
  },
  list: {
    flex: 1,
  },
  listContainer: {},
  separator: {
    // height: 1,
    // backgroundColor: 'black',
    // marginVertical: 10,
  },
  cardContainer: {
    marginHorizontal: 15,
    borderColor: 'black',
    borderWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  cardHighlight: {
    backgroundColor: '#ACE1AF',
    position: 'absolute',
    height: '100%',
    width: 180,
    left: 0,
  },
  cardContent: {
    marginLeft: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: '#79443B',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Gilroy-Regular',
    color: 'grey',
    marginTop: 5,
  },
  logoutButtonText: {
    color: '#79443B',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginRight: 15,
    padding: 5,
  },
});
