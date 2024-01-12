import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

const Catalogs = ({details, navigation}) => {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCatalog = async () => {
    try {
      const token = details?.token;

      const response = await axios.get(
        'http://139.59.58.151:8000/getallcatalog/category',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCatalog();
        setCatalog(data);
        // console.log('Data: ', data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator visible={isLoading} />
      ) : catalog && catalog.length > 0 ? (
        <>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={catalog}
            horizontal={false}
            numColumns={2}
            keyExtractor={item => {
              return item._id.toString();
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={catalog => {
              const item = catalog.item;
              return (
                <TouchableOpacity
                  style={styles.card}
                  // onPress={() => navigation.navigate('Catagories')}
                  onPress={() =>
                    navigation.navigate('Catagories', {category: item.category})
                  }>
                  <View style={styles.imageContainer}>
                    <FastImage
                      style={styles.cardImage}
                      source={{
                        uri: item.image,
                        priority: FastImage.priority.high,
                      }}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>{item.category}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </>
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 22,
            fontFamily: 'Gilroy-Regular',
          }}>
          Your Orders is empty!
        </Text>
      )}
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
    elevation: 5, // Android
  },
  cardContent: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7788',
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
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
    fontFamily: 'Gilroy-Regular',
    fontSize: 18,
    flex: 1,
    color: '#000',
    // fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
