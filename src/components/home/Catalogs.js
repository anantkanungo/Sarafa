import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';

const Catalogs = ({details, navigation}) => {
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState(null);

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
      setId(userData._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orders, id]);

  const data = [
    {
      id: 1,
      title: 'All Orders / सभी ऑर्डर',
      componentName: 'Your_Order',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrRkFIuxRyQ4VSBoaEAGFn8_w1YBOvXVTb4qQZCxZ7oc42va5iWStOIEWQsMQeW2TFZSw&usqp=CAU',
    },
    {
      id: 2,
      title: 'Karigar Details / कारीगर जानकारी',
      componentName: 'KarigarInfo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHDlRVsz7KgsE7gDAmhRvCP4Ww2TfcS9Q845TkhQBtp-TXQpphcyfkTPXS9hk5CWloUs&usqp=CAU',
    },
    {
      id: 3,
      title: 'Task Assign / कार्य नियत',
      componentName: 'TaskAssign',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHDlRVsz7KgsE7gDAmhRvCP4Ww2TfcS9Q845TkhQBtp-TXQpphcyfkTPXS9hk5CWloUs&usqp=CAU',
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(`${item.componentName}`, {orders, id})
      }>
      <View style={styles.imageContainer}>
        <Image style={styles.cardImage} source={{uri: item.image}} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome to Workshop</Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
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

export default connect(mapStateToProps)(Catalogs);

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
  separator: {
    marginTop: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '45%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  cardContent: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: '100%',
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
  titleContainer: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 27,
    color: '#000',
    marginTop: 10,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 10,
  },
});
