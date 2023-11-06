import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
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

const Catalogs = () => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
<<<<<<< HEAD
        <Text style={styles.headerText}>Catalog</Text>
=======
        <Text style={styles.headerText}>Catalog's</Text>
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
<<<<<<< HEAD
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
=======
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
            <TouchableOpacity style={styles.item}>
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
            {/* <View style={styles.item_container}>
                <Text style={styles.title} numberOfLines={1}>
                  Title
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  Desc
                </Text>
              </View> */}
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
<<<<<<< HEAD
    paddingTop: 10,
  },
  headerText: {
    fontSize: 36,
    color: '#000000',
    fontWeight: 'bold',
    margin: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
=======
    // paddingTop: 50,
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
  },
  headerText: {
    fontSize: 36,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  tinyLogo: {
<<<<<<< HEAD
    width: 130,
    height: 130,
    // resizeMode: 'contain',
  },
  item: {
    backgroundColor: '#8c8274',
    padding: 4,
    alignItems: 'center',
=======
    width: 100,
    height: 140,
    // resizeMode: 'contain',
  },
  item: {
    backgroundColor: '#abaaa8',
    padding: 20,
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
    marginVertical: 8,
    marginHorizontal: 18,
    width: 140,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
<<<<<<< HEAD
    color: '#000000',
=======
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
  },
});
