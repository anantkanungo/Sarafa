import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

const Catagories = ({navigation}) => {
  const numColumns = 3;
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
      id: 10,
      title: 'Product 10',
      image: 'https://bootdey.com/image/400x200/FA8072/000000',
    },
    {id: 11, image: 'https://bootdey.com/img/Content/avatar/avatar1.png'},
    {id: 12, image: 'https://bootdey.com/img/Content/avatar/avatar2.png'},
    {id: 13, image: 'https://bootdey.com/img/Content/avatar/avatar3.png'},
    {id: 14, image: 'https://bootdey.com/img/Content/avatar/avatar4.png'},
    {id: 15, image: 'https://bootdey.com/img/Content/avatar/avatar5.png'},
    {id: 16, image: 'https://bootdey.com/img/Content/avatar/avatar6.png'},
    {id: 17, image: 'https://bootdey.com/img/Content/avatar/avatar7.png'},
    {id: 18, image: 'https://bootdey.com/img/Content/avatar/avatar1.png'},
    {id: 19, image: 'https://bootdey.com/img/Content/avatar/avatar2.png'},
    {id: 20, image: 'https://bootdey.com/img/Content/avatar/avatar3.png'},
    {id: 21, image: 'https://bootdey.com/img/Content/avatar/avatar1.png'},
    {id: 22, image: 'https://bootdey.com/img/Content/avatar/avatar2.png'},
    {id: 23, image: 'https://bootdey.com/img/Content/avatar/avatar3.png'},
    {id: 24, image: 'https://bootdey.com/img/Content/avatar/avatar4.png'},
    {id: 25, image: 'https://bootdey.com/img/Content/avatar/avatar5.png'},
    {id: 26, image: 'https://bootdey.com/img/Content/avatar/avatar6.png'},
    {id: 27, image: 'https://bootdey.com/img/Content/avatar/avatar7.png'},
    {id: 28, image: 'https://bootdey.com/img/Content/avatar/avatar1.png'},
    {id: 29, image: 'https://bootdey.com/img/Content/avatar/avatar2.png'},
    {id: 30, image: 'https://bootdey.com/img/Content/avatar/avatar3.png'},
  ];

  const [options, setOptions] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  // a state to toggle the multi-select mode
  const [selectedItems, setSelectedItems] = useState([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);

  const selectItem = (user, isLongPress) => {
    if (isLongPress) {
      setMultiSelectMode(true);
      toggleSelection(user);
    } else {
      if (multiSelectMode) {
        toggleSelection(user);
      } else {
        setUserSelected(user);
        setModalVisible(true);
      }
    }
  };

  const toggleSelection = user => {
    const index = selectedItems.findIndex(item => item.id === user.id);

    if (index === -1) {
      // Item not in selection, add it
      setSelectedItems([...selectedItems, user]);
    } else {
      // Item already in selection, remove it
      const newSelection = [...selectedItems];
      newSelection.splice(index, 1);
      setSelectedItems(newSelection);
    }
  };

  // selectItem = user => {
  //   setUserSelected(user);
  //   setModalVisible(true);
  // };

  const renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    var itemDimension = Dimensions.get('window').width / numColumns;
    return (
      <TouchableOpacity
        style={[styles.item, {height: itemDimension}]}
        onPress={() => selectItem(item, false)}
        onLongPress={() => selectItem(item, true)}
        activeOpacity={0.8}>
        {/* <TouchableOpacity
        style={[styles.item, {height: itemDimension}]}
        onPress={() => selectItem(item)}> */}
        <View style={styles.innerItem}>
          <Image
            style={{height: itemDimension - 2, width: itemDimension - 2}}
            source={{uri: item.image}}
          />
          {multiSelectMode && selectedItems.includes(item) && (
            <View style={styles.tickContainer}>
              <Text style={styles.tick}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const formatRow = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({id: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return data;
  };

  const handleSubmit = () => {
    // Perform the action with selectedItems
    console.log('Selected Items:', selectedItems);

    // Reset state
    setSelectedItems([]);
    setMultiSelectMode(false);
  };

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
      {multiSelectMode && selectedItems.length > 0 && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}

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
        data={formatRow(options, numColumns)}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={renderItem}
        numColumns={numColumns}
      />

      {
        <Text style={styles.txt}>
          {!multiSelectMode
            ? 'Long press to select'
            : selectedItems.length + ' item selected'}
        </Text>
      }

      <Modal
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}>
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <View style={styles.popupContent}>
              <ScrollView contentContainerStyle={styles.modalInfo}>
                <Image
                  style={{width: 200, height: 200}}
                  source={{uri: userSelected.image}}
                />
                <Text style={styles.title}>{userSelected.title}</Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#555',
                    marginTop: 10,
                  }}>
                  Description Lorem dolor sit amet, consectetuer adipiscing
                  elit. Aenean commodo ligula..
                </Text>
              </ScrollView>
            </View>
            <View style={styles.popupButtons}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.btnClose}>
                <Text style={styles.txtClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Catagories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },

  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 20,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    flex: 1,
    height: 40,
    backgroundColor: '#20b2aa',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtClose: {
    color: 'white',
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
  },
  // Style Submit Button:
  submitButton: {
    backgroundColor: '#20b2aa',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  txt: {
    textAlign: 'center',
    padding: 2,
  },
  innerItem: {
    flex: 1,
    // backgroundColor: '#7e9e0b',
  },
  tickContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    // backgroundColor: 'transparent',
    backgroundColor: '#35A7FF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderRadius: 5,
  },
  tick: {
    fontSize: 20,
    color: '#fff',
  },
});
