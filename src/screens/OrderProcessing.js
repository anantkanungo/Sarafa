
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

const OrderProcessing = ({ details, navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      const processingOrders =
        userData.task?.filter((order) => order.statusIs === 'processing') || [];
      setOrders(processingOrders);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToOrderPage(item)}>
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

  const navigateToOrderPage = (selectedTask) => {
    navigation.navigate('OrderPage', { selectedTask });
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <FlatList
        style={styles.list}
        data={orders}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

export default connect(mapStateToProps)(OrderProcessing);

const styles = StyleSheet.create({
  list: {
    flex: 1,
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
  cardImage: {
    // flex: 1,
    height: 'auto',
    width: '40%',
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#000000',
  },
  cardHeader: {
    paddingVertical: 7,
    paddingHorizontal: 16,
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
