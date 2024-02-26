import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { customerLogout } from '../reduxThunk/action/authAction';
import axios from 'axios';

const KarigarInfo = ({ route, customerLogout, details, navigation }) => {
  const [orders, setOrders] = useState([]);
  const { id } = route.params || {};

  const fetchOrders = async () => {
    // const id = '659a6b88c3cafd83cfd41cf2';
    try {
      const token = details?.token;
      const response = await axios.get(
        `http://139.59.58.151:8000/workshop/kariger/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userData = response.data.data[0];
      setOrders(userData.kariger || []); // Assuming contains the array of orders
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    console.log(orders);
    // console.log(id);
  }, [orders]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Karigar_Details', { orders })}
      style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/015/271/968/non_2x/business-man-flat-icon-design-human-resource-and-businessman-icon-concept-man-icon-in-trendy-flat-style-symbol-for-your-web-site-design-logo-app-vector.jpg',
          }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* </View> */}
          <TouchableOpacity onPress={() => customerLogout()}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Karigar Details</Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        horizontal={false}
        numColumns={2}
        data={orders}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderCategoryItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(KarigarInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {},
  card: {
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7788',
  },
  cardImage: {
    flex: 1,
    height: 120,
    width: null,
    borderWidth: 1,
    borderColor: 'black',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
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
  headerTextContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
    marginBottom: 6,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginRight: 15,
    padding: 5,
  },
});
