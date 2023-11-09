import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Ring',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Ring',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Ring',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
  {
    id: '584a0f-3da1-471f-bd96-145571e29d72',
    title: 'Ring',
    img: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
  },
];

const Catalogs = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.headerText}>Catalog</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <View style={styles.flatlistConatiner}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Catagories')}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.img,
                }}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.img,
                }}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Catalogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 36,
    color: '#000000',
    fontWeight: 'bold',
    margin: 5,
  },
  flatlistConatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  // imageContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 20,
  // },
  tinyLogo: {
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
    fontSize: 22,
    textAlign: 'center',
    color: '#000000',
  },
});
