import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'ER/223/532',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'ER/223/532',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ER/223/532',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
  {
    id: '584a0f-3da1-471f-bd96-145571e29d72',
    title: 'ER/223/532',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
];

const Catagories = ({navigation}) => {
  return (
    <View style={Styles.container}>
      {/* header */}
      <View style={Styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={Styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={Styles.headerText}>Earrings</Text>
      </View>
      {/* Submit button */}
      <View style={Styles.sbContainer}>
        <TouchableOpacity style={Styles.loginButton} onPress={() => {}}>
          <Text style={Styles.loginButtonText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.loginButton} onPress={() => {}}>
          <Text style={Styles.loginButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <View style={Styles.flatlistConatiner}>
            <TouchableOpacity
              style={Styles.item}
              onPress={() => navigation.navigate('Catagories')}>
              <Image
                style={Styles.tinyLogo1}
                source={{
                  uri: item.img,
                }}
              />
              <Text style={Styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.item}>
              <Image
                style={Styles.tinyLogo1}
                source={{
                  uri: item.img,
                }}
              />
              <Text style={Styles.title}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Catagories;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  headerText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // FlatList
  flatlistConatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  tinyLogo1: {
    flex: 1,
    width: '100%',
    height: 150,
    // resizeMode: 'contain',
  },
  item: {
    backgroundColor: '#8c8274',
    padding: 4,
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000000',
  },
  // Submit button
  sbContainer: {
    // alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  loginButton: {
    backgroundColor: '#454545',
    // paddingVertical: 5,
    borderRadius: 5,
    // marginTop: 5,
    width: 100,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
