import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('@AuthToken');
    const response = await axios.get(
      'http://139.59.58.151:8000/pendingorders',
      {
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.result;
    // console.log(response.data.result.category);
  } catch (error) {
    console.log(error);
  }
};

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrders();
      setOrders(data);
      setIsLoading(false);
      console.log(orders);
    };

    fetchData();
  }, []);

  // return (
  //   <View>
  //     {isLoading ? (
  //       <Text>Loading...</Text>
  //     ) : (
  //       <FlatList
  //         data={orders}
  //         renderItem={({item}) => <Text key={item.id}>{item.category}</Text>}
  //         keyExtractor={item => item.id}
  //       />
  //     )}
  //   </View>
  // );
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header_container}>
        <TouchableOpacity>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.headerText}>Orders</Text>
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={orders}
          keyExtractor={item => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={orders => {
            const item = orders.item;
            return (
              <View style={styles.card}>
                {/* <Image style={styles.cardImage} source={{uri: item.image}} /> */}
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.category}</Text>
                  <Text style={styles.order}>Quantity: {item.quantity}</Text>
                  <View style={styles.orderContainer}>
                    {/* <Image
                    style={styles.iconData}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828644.png',
                    }}
                  /> */}
                    {/* <Text style={styles.order}>{item.order}</Text> */}
                  </View>
                  <View style={styles.orderContainer}>
                    {/* <Image
                    style={styles.iconData}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828644.png',
                    }}
                  /> */}
                    {/* <Text style={styles.order}>{item.status}</Text> */}
                  </View>
                  <View style={styles.orderContainer}>
                    {/* <Image
                    style={styles.iconData}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828644.png',
                    }}
                  /> */}
                    {/* <Text style={styles.order}>{item.done}</Text> */}
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>Previous Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PendingOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
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
    marginVertical: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    // alignContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
  },
  cardHeader: {
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  cardImage: {
    // flex: 1,
    height: 100,
    width: 100,
    // width: null,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
    color: '#000',
  },
  order: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#000',
    // color: '#808080',
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  orderContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    // margin: 10,
    width: 200,
  },
  buttonText1: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
