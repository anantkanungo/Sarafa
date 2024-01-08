import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';

const workshop = ({ navigation }) => {
  const data = [
    {
      id: 1,
      title: 'Karigar_Name',
      image: 'https://static.vecteezy.com/system/resources/previews/015/271/968/non_2x/business-man-flat-icon-design-human-resource-and-businessman-icon-concept-man-icon-in-trendy-flat-style-symbol-for-your-web-site-design-logo-app-vector.jpg',
    },
    {
      id: 2,
      title: 'Karigar Details 2',
      image: 'https://static.vecteezy.com/system/resources/previews/015/271/968/non_2x/business-man-flat-icon-design-human-resource-and-businessman-icon-concept-man-icon-in-trendy-flat-style-symbol-for-your-web-site-design-logo-app-vector.jpg',
    },
    {
      id: 3,
      title: 'Karigar Details 3',
      image: 'https://static.vecteezy.com/system/resources/previews/015/271/968/non_2x/business-man-flat-icon-design-human-resource-and-businessman-icon-concept-man-icon-in-trendy-flat-style-symbol-for-your-web-site-design-logo-app-vector.jpg',
    },
    {
      id: 4,
      title: 'Karigar Details 4',
      image: 'https://static.vecteezy.com/system/resources/previews/015/271/968/non_2x/business-man-flat-icon-design-human-resource-and-businessman-icon-concept-man-icon-in-trendy-flat-style-symbol-for-your-web-site-design-logo-app-vector.jpg',
    },
    {
      id: 5,
      title: 'Sample_namee',
      image: 'https://static.vecteezy.com/system/resources/previews/015/271/968/non_2x/business-man-flat-icon-design-human-resource-and-businessman-icon-concept-man-icon-in-trendy-flat-style-symbol-for-your-web-site-design-logo-app-vector.jpg',
    }

  ];

  const [results, setResults] = useState(data);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Your_Order')}>
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
      <View style={styles.headerContainer}>results
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Karigar Details</Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={results}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderCategoryItem}
      />
    </View>
  );
};

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
  },
  cardContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7788',
  },
  cardImage: {
    flex: 1,
    height: 120,
    width: null,
    borderWidth: 2,
    borderColor: 'black',
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
  tinyLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
    marginBottom: 6,
  },
});
export default workshop;
