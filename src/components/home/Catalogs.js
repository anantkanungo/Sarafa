// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   FlatList,
// } from 'react-native';

// const Catalogs = ({ navigation }) => {
//   const data = [
//     {
//       id: 1,
//       title: 'WorkShop',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrRkFIuxRyQ4VSBoaEAGFn8_w1YBOvXVTb4qQZCxZ7oc42va5iWStOIEWQsMQeW2TFZSw&usqp=CAU',
//     },

//     {
//       id: 2,
//       title: 'Karigar Details',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHDlRVsz7KgsE7gDAmhRvCP4Ww2TfcS9Q845TkhQBtp-TXQpphcyfkTPXS9hk5CWloUs&usqp=CAU',

//     }
//   ];

//   const [results, setResults] = useState(data);

//   return (
//     // 1. Add a view
//     // 2. <View> Add Admin Text </View>
//     // 3. Make Flatlist with data
//     // 4. data = [{Task assign, etc...}]
//     <View style={styles.container}>
//       <FlatList
//         style={styles.list}
//         contentContainerStyle={styles.listContainer}
//         data={results}
//         horizontal={false}
//         numColumns={2}
//         keyExtractor={item => {
//           return item.id;
//         }}
//         ItemSeparatorComponent={() => {
//           return <View style={styles.separator} />;
//         }}
//         renderItem={post => {
//           const item = post.item;
//           return (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() => navigation.navigate('Catagories')}>
//               <View style={styles.imageContainer}>
//                 <Image style={styles.cardImage} source={{ uri: item.image }} />
//               </View>
//               <View style={styles.cardContent}>
//                 <Text style={styles.title}>{item.title}</Text>
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default Catalogs;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // marginTop: 20,
//   },
//   list: {
//     paddingHorizontal: 10,
//   },
//   listContainer: {
//     alignItems: 'center',
//   },
//   separator: {
//     // marginTop: 10,
//   },
//   /******** card **************/
//   card: {
//     marginVertical: 10,
//     backgroundColor: 'white',
//     flexBasis: '45%',
//     marginHorizontal: 10,
//     borderWidth: 3,
//     borderRadius: 4,
//     borderColor: 'black',
//   },
//   cardContent: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // color: 'white',
//     borderBottomLeftRadius: 5,
//     borderBottomEndRadius: 5,
//   },
//   cardImage: {
//     flex: 1,
//     height: 150,
//     width: null,
//     borderTopRightRadius: 5,
//     borderTopLeftRadius: 5,
//   },
//   imageContainer: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.32,
//     shadowRadius: 5.46,
//     elevation: 9,
//   },
//   /******** card components **************/
//   title: {
//     fontSize: 18,
//     flex: 1,
//     color: '#000',
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';

const Catalogs = ({ navigation }) => {
  const data = [
    {
      id: 1,
      title: 'Workshop',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrRkFIuxRyQ4VSBoaEAGFn8_w1YBOvXVTb4qQZCxZ7oc42va5iWStOIEWQsMQeW2TFZSw&usqp=CAU',
    },
    {
      id: 2,
      title: 'Karigar Details',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHDlRVsz7KgsE7gDAmhRvCP4Ww2TfcS9Q845TkhQBtp-TXQpphcyfkTPXS9hk5CWloUs&usqp=CAU',
    }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Catagories')}>
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
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
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
  separator: {
    // marginTop: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '45%',
    marginHorizontal: 10,
    borderWidth: 3,
    borderRadius: 4,
    borderColor: 'black',
  },
  cardContent: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: '100%',
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
  title: {
    fontSize: 18,
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Catalogs;
