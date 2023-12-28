import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { customerLogout } from '../../reduxThunk/action/authAction';

const OrderScreen = ({ customerLogout, navigation }) => {
  const data = [{
    id: 1,
    title: 'Shop ID_1',
  },

  {
    id: 2,
    title: 'Shop ID_2',
  },
  {
    id: 3,
    title: 'Shop ID_3',
  },
  {
    id: 4,
    title: 'Shop ID_4',
  },
  {
    id: 5,
    title: 'Shop ID_5',
  },
  ];

  const [results, setResults] = useState(data);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ShopOrder')}>
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
        {/* <TouchableOpacity onPress={() => navigation.navigate(Your_Order)}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }} */}
        {/* /> */}
        {/* </TouchableOpacity> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        </View>
        <TouchableOpacity onPress={() => customerLogout()}><Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Full_Name</Text>
        <Text style={styles.infoText2}>Ph:+91912365498</Text>
        <Text style={styles.infoText}>Distributor_ID</Text>
      </View>

      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your Shops/आपके ग्राहक</Text>
      </View>

      {/* FlatList */}
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={results}
        keyExtractor={(item) => item.id.toString()}
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
    marginLeft: 15,
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
  infoText2: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Gilroy-Regular',
    color: 'white',
    marginTop: 8,
  },
  titleContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Gilroy-Regular',
    color: 'black',
    marginTop: 5,
    marginBottom: 5,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: 15,
  },
  separator: {
    // height: 1,
    // backgroundColor: 'black',
    // marginVertical: 10,
  },
  cardContainer: {
    margin: 6,
    borderColor: 'black',
    borderWidth: .25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardContent: {
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: '#000',
    marginTop: 2,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 10,
    marginRight: 15,
  },
});

