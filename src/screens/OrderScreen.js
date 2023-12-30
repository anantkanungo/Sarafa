import React, {useState} from 'react';
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

const OrderScreen = ({customerLogout, navigation}) => {
  const data = [
    {
      id: 1,
      title: 'Order 1',
      Text: 'Description about the order',
    },

    {
      id: 2,
      title: 'Order 2',
      Text: 'Description about the order(earring)',
    },
    {
      id: 3,
      title: 'Order 3',
      Text: 'Description about the order(earring)',
    },
    {
      id: 4,
      title: 'Order 4',
      Text: 'Description about the order(earring)',
    },
    {
      id: 5,
      title: 'Order 5',
      Text: 'Description about the order(earring)',
    },
  ];

  const [results, setResults] = useState(data);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('Orderpage')}>
      <View style={styles.cardHighlight} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.Text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          /> */}
        {/* </TouchableOpacity> */}
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
        <Text style={styles.infoText}>Karigar_Name</Text>
        <Text style={styles.infoText}>Ph:+91912365498</Text>
      </View>

      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Orders/आपके ऑर्डर्स</Text>
      </View>

      {/* FlatList */}
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={results}
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
    color: 'black',
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
    color: '#000',
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Gilroy-Regular',
    color: 'grey',
    marginTop: 5,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginRight: 15,
    padding: 5,
  },
});
