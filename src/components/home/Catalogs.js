import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import localStorage from 'redux-persist/es/storage';

const Catalogs = ({ details, navigation }) => {
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
      console.log(userData)
      console.log(orders)
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
        'https://img.icons8.com/ios-glyphs/FAB005/select-all.png'
    },
    {
      id: 2,
      title: 'Karigar Details / कारीगर जानकारी',
      componentName: 'KarigarInfo',
      image:
        "https://img.icons8.com/glyph-neue/FAB005/about-us-male.png"
    },
    // {
    //   id: 3,
    //   title: 'Task Assign / कार्य नियत',
    //   componentName: 'TaskAssign',
    //   image:
    //     "https://cdn-icons-png.flaticon.com/128/5847/5847233.png",
    // },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(`${item.componentName}`, { orders, id })
      }>
      <View style={styles.imageContainer}>
        <Image style={styles.cardImage} source={{ uri: item.image }} />
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
        numColumns={1}
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
    paddingHorizontal: 5,
  },
  listContainer: {
    // alignItems: 'center',
  },
  separator: {
    marginTop: 5,
  },
  card: {
    marginVertical: 10,
    backgroundColor: 'white',
    // flexBasis: '45%',
    // width: '80%',
    // flex: 1,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#79443B',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-evenly',
  },
  cardContent: {
    // paddingVertical: 4,
    paddingHorizontal: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImage: {
    // flex: 1,
    height: 90,
    width: 90,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,

    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    alignSelf: 'center',
    elevation: 9,
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    // flex: 1,
    // backgroundColor: '#79443B',
    color: '#79443B',
    fontFamily: 'Gilroy-Regular',
  },
  titleContainer: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    // fontWeight:
    color: '#79443B',
    marginTop: 10,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 10,
  },
});
