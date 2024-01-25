import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { customerLogout } from '../reduxThunk/action/authAction';
import axios from 'axios';

const OrderScreen = ({ customerLogout, details, navigation }) => {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState('');
  const [uid, setUid] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = details?.token;
      const response = await axios.get(
        'http://139.59.58.151:8000/distributor/shops',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userData = response.data.data[0];
      setAddress(userData.address);
      const data = response.data.data;
      setOrders(data);
      setUid(userData.uid);
      if (!response.data || !response.data.data || !response.data.data.length) {
        console.log('Invalid response data');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // console.log(orders);
    // console.log(uid);
  }, [orders, uid]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ShopOrder', { uid })}>
      <View style={styles.cardHighlight} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.address}</Text>
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
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={orders}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />
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
    backgroundColor: 'white',
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
    marginBottom: 10,
  },
  infoContainer: {
    // backgroundColor: '',
    // backgroundColor: '#e1d2c4',

    backgroundColor: '#C19A6B',
    marginHorizontal: 15,
    padding: 20,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: 'white',
    // color: '#79443B',
    marginTop: 8,
  },
  titleContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontFamily: 'Gilroy-Regular',
    padding: 10,
    // color: 'black',

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
    // borderColor: 'black',
    // borderWidth: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  cardHighlight: {
    // backgroundColor: 'white',
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
    // color: '#000',
    color: '#79443B',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Gilroy-Regular',
    // color: 'grey',
    marginTop: 5,
  },
  logoutButtonText: {
    // color: 'black',
    color: '#79443B',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginRight: 15,
    padding: 5,
  },
});
