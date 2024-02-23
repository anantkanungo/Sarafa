import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
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
        'http://139.59.58.151:8000/kariger/task',
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
    console.log(orders);
  }, [address, orders]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToOrderPage(item)}>
      <View style={styles.card} key={item._id}>
        <Image style={styles.cardImage} source={{ uri: item.image[0] }} />
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.category}</Text>
          <Text style={styles.order}>Weight: {item.weight}</Text>
          <Text style={styles.order}>Size: {item.size}</Text>
          <Text style={styles.order}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const navigateToOrderPage = selectedTask => {
    navigation.navigate('OrderPage', { selectedTask });
  };

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
        <Text style={styles.titleText}>Your Orders/आपके ऑर्डर्स</Text>
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
    // backgroundColor: '#e1d2c4'
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
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 20,
    borderWidth: .85,
    borderColor: 'grey',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: '#79443B',
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
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 4,
    backgroundColor: 'white',
    flexDirection: 'row',
    // alignContent: 'center',
    borderWidth: 1,
    borderColor: '#8C92AC',
    padding: 10,
  },
  cardHeader: {
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  cardImage: {
    // flex: 1,
    height: 'auto',
    width: '40%',
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#000000',
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    color: '#000',
    textTransform: 'capitalize',
    fontFamily: 'Gilroy-Regular',
  },
  order: {
    fontSize: 13,
    marginTop: 5,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
  },
});
