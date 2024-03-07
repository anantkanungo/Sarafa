import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

const Catalogs = ({ details, navigation }) => {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCatalog();
      setCatalog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator visible={isLoading} />
      ) : catalog && catalog.length > 0 ? (
        <>
          <FlatList
            refreshing={refreshing}
            onRefresh={handleRefresh}
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={catalog}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item._id.toString();
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={(catalog) => {
              const item = catalog.item;
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('Catagories', { category: item.category })
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
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your Orders is empty!</Text>
          <TouchableOpacity onPress={handleRefresh}>
            <Text style={styles.refreshText}>Click here to Refresh</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
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
  separator: {},
  card: {
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '45%',
    marginHorizontal: 10,
    elevation: 5,
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
  title: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 18,
    flex: 1,
    color: '#000',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
  },
  refreshText: {
    color: 'blue',
    marginTop: 10,
  },
});
