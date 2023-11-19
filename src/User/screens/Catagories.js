import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

const Catagories = ({navigation}) => {
  const data = [
    {
      id: 1,
      title: 'ER/223/532',
      image: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      image: 'https://bootdey.com/image/400x200/87CEEB/000000',
    },
    {
      id: 3,
      title: 'Product 3',
      image: 'https://bootdey.com/image/400x200/6A5ACD/000000',
    },
    {
      id: 4,
      title: 'Product 4',
      image: 'https://bootdey.com/image/400x200/4682B4/000000',
    },
    {
      id: 5,
      title: 'Product 5',
      image: 'https://bootdey.com/image/400x200/40E0D0/000000',
    },
    {
      id: 6,
      title: 'Product 6',
      image: 'https://bootdey.com/image/400x200/008080/000000',
    },
    {
      id: 7,
      title: 'Product 7',
      image: 'https://bootdey.com/image/400x200/FF6347/000000',
    },
    {
      id: 8,
      title: 'Product 8',
      image: 'https://bootdey.com/image/400x200/4169E1/000000',
    },
    {
      id: 9,
      title: 'Product 9',
      image: 'https://bootdey.com/image/400x200/6A5ACD/000000',
    },
    {
      id: 9,
      title: 'Product 10',
      image: 'https://bootdey.com/image/400x200/FA8072/000000',
    },
  ];

  const [results, setResults] = useState(data);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.headerText}>Earrings</Text>
      </View>
      {/* button */}
      {/* <View style={styles.sbContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={results}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={post => {
          const item = post.item;
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Order')}>
              <View style={styles.imageContainer}>
                <Image style={styles.cardImage} source={{uri: item.image}} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText1}>Place Order</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Catagories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    // marginTop: 10,
  },
  /******** card **************/
  card: {
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '45%',
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7788',
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
    borderWidth: 4,
    borderColor: '#7788',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
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
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
  },
  /* header */
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
    marginBottom: 6,
  },
  button1: {
    backgroundColor: '#454545',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    width: 150,
  },
  buttonText1: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sbContainer: {
    // alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#454545',
    // paddingVertical: 5,
    borderRadius: 5,
    // marginTop: 5,
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
