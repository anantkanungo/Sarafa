import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {customerLogout} from '../reduxThunk/action/authAction';
import axios from 'axios';

const YourOrder = ({customerLogout, details, navigation}) => {
  const [orders, setOrders] = useState([]);

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
      setOrders(userData.task || []); // Assuming 'task' contains the array of orders
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigateToOrderPage(item)}>
      <View style={styles.cardHighlight} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToOrderPage = selectedTask => {
    navigation.navigate('Orderpage', {selectedTask});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => customerLogout()}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Order List</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(YourOrder);

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
  titleContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 27,
    // fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Gilroy-Regular',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    // Add any additional list container styles if needed
  },
  separator: {
    // height: 1,
    // backgroundColor: 'black',
    // marginVertical: 10,
  },
  cardContainer: {
    margin: 8,
    marginLeft: 5,
    borderColor: 'black',
    borderWidth: 0.25,
    alignItems: 'center',
    // borderRadius: 10,
    flexDirection: 'row',
  },
  cardHighlight: {
    // backgroundColor: 'lightpink',
    position: 'absolute',
    height: '100%',
    width: 30,
    left: 0,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
  },
  cardContent: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Gilroy-Regular',
    color: '#000',
    marginTop: 4,
  },
  description: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Gilroy-Regular',
    color: 'grey',
    marginTop: 5,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginRight: 10,
  },
});
