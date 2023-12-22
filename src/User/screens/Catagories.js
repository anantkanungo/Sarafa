import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import styles from './CatagorieStyles';
import Check from '../../assets/icons8-checkmark-48.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../../reduxThunk/action/orderAction';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const Catagories = ({navigation}) => {
  const [numColumns, setNumColumns] = useState(3);
  const scaleRef = useRef(1);

  const setColumnCount = val => {
    LayoutAnimation.easeInEaseOut();
    setNumColumns(val);
  };

  const onPinchGestureEvent = event => {
    // Use the scale value from the pinch gesture to dynamically change numColumns
    const nextScale = Math.max(
      1,
      Math.min(10, scaleRef.current / event.nativeEvent.scale),
    );
    scaleRef.current = nextScale;
    setColumnCount(Math.round(nextScale));
  };

  const data = [
    {
      id: 1,
      category: 'ring',
      image: 'https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg',
      weight: '2.5',
      size: '2',
      quantity: '1',
    },
    {
      id: 2,
      category: 'earring',
      image: 'https://bootdey.com/image/400x200/87CEEB/000000',
      weight: '3.5',
      size: '3',
      quantity: '1',
    },
    {
      id: 3,
      category: 'bangle',
      image: 'https://bootdey.com/image/400x200/6A5ACD/000000',
      weight: '1',
      size: '1',
      quantity: '1',
    },
    {
      id: 4,
      category: 'chain',
      image: 'https://bootdey.com/image/400x200/4682B4/000000',
      weight: '1.5',
      size: '1',
      quantity: '1',
    },
    {
      id: 5,
      category: 'necklace',
      image: 'https://bootdey.com/image/400x200/40E0D0/000000',
      weight: '4.5',
      size: '4',
      quantity: '1',
    },
    {
      id: 6,
      category: 'nosepin',
      image: 'https://bootdey.com/image/400x200/008080/000000',
      weight: '5.5',
      size: '5',
      quantity: '1',
    },
    {
      id: 7,
      category: 'pendants',
      image: 'https://bootdey.com/image/400x200/FF6347/000000',
      weight: '7.5',
      size: '7',
      quantity: '1',
    },
    {
      id: 8,
      category: 'mangalsutra',
      image: 'https://bootdey.com/image/400x200/4169E1/000000',
      weight: '8',
      size: '8',
      quantity: '1',
    },
    {
      id: 9,
      category: 'others',
      image: 'https://bootdey.com/image/400x200/6A5ACD/000000',
      weight: '9',
      size: '9',
      quantity: '1',
    },
    {
      id: 10,
      category: 'mangalsutra',
      image: 'https://bootdey.com/image/400x200/FA8072/000000',
      weight: '10',
      size: '10',
      quantity: '1',
    },
    {
      id: 11,
      category: 'ring',
      image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      weight: '2.5',
      size: '2',
      quantity: '1',
    },
    {
      id: 12,
      category: 'pendants',
      image: 'https://bootdey.com/image/400x200/87CEEB/000000',
      weight: '2',
      size: '2',
      quantity: '1',
    },
    {
      id: 13,
      category: 'pendants',
      image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      weight: '1',
      size: '1',
      quantity: '1',
    },
    {
      id: 14,
      category: 'nosepin',
      image: 'https://bootdey.com/image/400x200/4682B4/000000',
      weight: '4',
      size: '4',
      quantity: '1',
    },
    {
      id: 15,
      category: 'necklace',
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      weight: '5',
      size: '5',
      quantity: '1',
    },
    {
      id: 16,
      category: 'earring',
      image: 'https://bootdey.com/image/400x200/008080/000000',
      weight: '6',
      size: '6',
      quantity: '1',
    },
    {
      id: 17,
      category: 'bangle',
      image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      weight: '7',
      size: '7',
      quantity: '1',
    },
    {
      id: 18,
      category: 'chain',
      image: 'https://bootdey.com/image/400x200/4169E1/000000',
      weight: '8',
      size: '8',
      quantity: '1',
    },
    {
      id: 19,
      category: 'others',
      image: 'https://bootdey.com/image/400x200/6A5ACD/000000',
      weight: '9',
      size: '9',
      quantity: '1',
    },
    {
      id: 20,
      category: 'mangalsutra',
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      weight: '10',
      size: '10',
      quantity: '1',
    },
  ];

  const [options, setOptions] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  // a state to toggle the multi-select mode
  const [selectedItems, setSelectedItems] = useState([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [clearButtonVisible, setClearButtonVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weightFilter, setWeightFilter] = useState(null);
  const [weightInput, setWeightInput] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

  const clearFilter = () => {
    setWeightFilter(null);
    setOptions(data);
  };

  // Function to filter options by weight
  const filterOptionsByWeight = weight => {
    setWeightFilter(weight);
    const filteredOptions = data.filter(
      item => parseFloat(item.weight) === parseFloat(weight),
    );
    setOptions(filteredOptions);
  };

  // UI component to set weight filter
  const renderWeightFilter = () => (
    <View style={styles.sbContainer}>
      <Text style={[styles.buttonText, {color: '#000'}]}>
        Filter by Weight:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setWeightInput}
        value={weightInput}
        placeholder="Enter weight"
        placeholderTextColor={'#000'}
        keyboardType="numeric"
        maxLength={5}
      />
      <TouchableOpacity
        onPress={() => {
          if (filterVisible) {
            clearFilter();
            setFilterVisible(false);
            setWeightInput('');
          } else {
            filterOptionsByWeight(weightInput);
            setFilterVisible(true);
          }
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>
          {filterVisible ? 'Clear' : 'Filter'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToPreviousItem = () => {
    if (currentIndex > 0) {
      setUserSelected(options[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const navigateToNextItem = () => {
    if (currentIndex < options.length - 1) {
      setUserSelected(options[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const selectItem = (user, isLongPress) => {
    if (isLongPress) {
      setMultiSelectMode(true);
      toggleSelection(user);
    } else {
      if (multiSelectMode || clearButtonVisible) {
        toggleSelection(user);
        setClearButtonVisible(true);
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
              {/* <Text style={styles.tick}>✓</Text> */}
              <Image style={styles.tick} source={Check} />
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
    // Filter out selected items that are already in the cart
    const itemsToAdd = selectedItems.filter(item => {
      return !cartItems.find(cartItem => cartItem.id === item.id);
    });

    // Dispatch addToCart action for each selected item that is not already in the cart
    itemsToAdd.forEach(item => {
      dispatch(addToCart(item));
    });

    // Reset state
    setSelectedItems([]);
    setMultiSelectMode(false);
    setClearButtonVisible(false);
  };

  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const handleAddToCart = userSelected => {
    dispatch(addToCart(userSelected));
  };

  const handleRemoveFromCart = userSelected => {
    // console.warn(userSelected);
    dispatch(removeFromCart(userSelected.id));
  };

  useEffect(() => {
    let result = cartItems.filter(element => {
      return element.id === userSelected.id;
    });
    if (result.length) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cartItems, userSelected]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* header */}
      <View style={styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.tinyLogo}
            src="https://img.icons8.com/ios/50/long-arrow-left.png"
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Catagories</Text>
      </View>
      {/* Filter */}
      {renderWeightFilter()}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        {clearButtonVisible && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSelectedItems([]);
                setMultiSelectMode(false);
                setClearButtonVisible(false);
              }}>
              <FontAwesome5 name={'times'} size={20} color={'#000'} />
            </TouchableOpacity>

            <Text
              style={[
                styles.txt,
                {
                  fontWeight: 'bold',
                  color: '#000',
                  marginLeft: 30,
                },
              ]}>
              {!multiSelectMode
                ? 'Long press to select'
                : selectedItems.length + ' item selected'}
            </Text>
          </View>
        )}
        {multiSelectMode && selectedItems.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.END) {
            // Save the scale value for future reference
            scaleRef.current /= nativeEvent.scale;
          }
        }}
        simultaneousHandlers={['pinchX', 'pinchY']}>
        <FlatList
          key={numColumns}
          data={formatRow(options, numColumns)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </PinchGestureHandler>

      {
        <Text style={styles.txt}>
          {
            !multiSelectMode
              ? 'Long press to select'
              : 'Click Submit to confirm order'
            // : selectedItems.length + ' item selected'
          }
        </Text>
      }

      <TouchableOpacity
        style={styles.button3}
        onPress={() => setColumnCount(numColumns - 1)}
        disabled={numColumns <= 1}>
        <FontAwesome5 name={'plus'} size={20} color={'#fff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => setColumnCount(numColumns + 1)}
        disabled={numColumns >= 10}>
        <FontAwesome5 name={'minus'} size={20} color={'#fff'} />
      </TouchableOpacity>

      <Modal
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}>
        <GestureRecognizer
          onSwipeLeft={navigateToNextItem}
          onSwipeRight={navigateToPreviousItem}
          config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
          style={styles.popupOverlay}>
          <View style={styles.popup}>
            <View style={styles.popupContent}>
              <View contentContainerStyle={styles.modalInfo}>
                <TouchableOpacity
                  onPress={navigateToNextItem}
                  style={[styles.btn, {right: 10}]}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/271/271228.png',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigateToPreviousItem}
                  style={[styles.btn, {left: 10}]}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/271/271220.png',
                    }}
                  />
                </TouchableOpacity>
                <Image
                  style={{width: 'auto', height: 300, resizeMode: 'contain'}}
                  source={{uri: userSelected.image}}
                />
                <Text style={styles.category}>{userSelected.category}</Text>
                <Text style={styles.textModal}>
                  Weight: {userSelected.weight}
                </Text>
                <Text style={styles.textModal}>
                  Description Lorem dolor sit amet, consectetuer adipiscing
                  elit. Aenean commodo ligula..
                </Text>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity
                  onPress={() => {
                    if (isAdded) {
                      handleRemoveFromCart(userSelected);
                    } else {
                      handleAddToCart(userSelected);
                    }
                  }}
                  style={styles.btnClose}>
                  <Text style={styles.txtClose}>
                    {isAdded ? 'Remove from Cart' : 'Add to Cart'}
                  </Text>
                </TouchableOpacity>
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
        </GestureRecognizer>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default Catagories;
