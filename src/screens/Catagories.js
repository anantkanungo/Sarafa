import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './CatagorieStyles';
import Check from '../assets/icons8-checkmark-48.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../reduxThunk/action/orderAction';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import Slider from 'react-native-slider';
import FastImage from 'react-native-fast-image';

const Catagories = ({details, navigation}) => {
  const route = useRoute();
  const {category} = route.params;
  // console.log('categry', category);

  const [categorys, setCategory] = useState([]);
  const [refreshCategorys, setRefreshCategorys] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTk3ZDNlMDM2NjA0ZjUxMTE3MWQ0MjIiLCJ1bmFtZSI6IlJhamt1bWFyIiwiaWF0IjoxNzA0Nzk5MTI4LCJleHAiOjE3MDUxNTkxMjh9.pjGYlGOzYQEgxKqVo7_YuJorpUcqGxNDMC1nsWpabM0';

      axios
        .get('http://139.59.58.151:8000/getallcatalog', {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          // console.log(res);

          const result = res.data.data.filter((items, index) => {
            return items.category === category;
          });
          // console.log('result', result);
          if (result) {
            setCategory(result);
          }
        });
    };
    // fetchCatalog();
    if (refreshCategorys) {
      fetchCatalog();
      setRefreshCategorys(false); // Disable auto-refresh
    }
  }, [categorys, refreshCategorys]);
  // console.log('catalog', categorys);

  const [numColumns, setNumColumns] = useState(3);
  const scaleRef = useRef(1);

  const setColumnCount = val => {
    LayoutAnimation.easeInEaseOut();
    setNumColumns(val);
  };

  const onPinchGestureEvent = event => {
    // Use the scale value from the pinch gesture to dynamically change numColumns
    const nextScale = Math.max(
      2,
      Math.min(5, scaleRef.current / event.nativeEvent.scale),
    );
    scaleRef.current = nextScale;
    setColumnCount(Math.round(nextScale));
  };

  const [options, setOptions] = useState(categorys);
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

  // Function to filter options by weight
  const filterOptionsByWeight = weight => {
    // Filter the options based on the provided weight
    const filteredOptions = categorys.filter(item => {
      const itemWeight = parseFloat(item.weight);
      return !isNaN(itemWeight) && itemWeight === parseFloat(weight);
    });

    setCategory(filteredOptions);
    setRefreshCategorys(false); // Disable auto-refresh
  };

  const clearFilter = () => {
    // Clear the weight filter and reset the category list
    setWeightFilter(null);
    setRefreshCategorys(true); // Enable auto-refresh
    // setCategory(categorys);
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
    const newIndex = currentIndex - 1;
    if (newIndex >= 0 && newIndex < categorys.length) {
      setCurrentIndex(newIndex);
      setUserSelected(categorys[newIndex]);
    }
  };

  const navigateToNextItem = () => {
    const newIndex = currentIndex + 1;
    if (newIndex >= 0 && newIndex < categorys.length) {
      setCurrentIndex(newIndex);
      setUserSelected(categorys[newIndex]);
    }
  };

  const selectItem = (user, isLongPress) => {
    if (isLongPress) {
      setMultiSelectMode(true);
      setClearButtonVisible(true);
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
    const index = selectedItems.findIndex(item => item._id === user._id);

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
        <View style={styles.innerItem}>
          <FastImage
            style={{height: itemDimension - 2, width: itemDimension - 2}}
            source={{
              uri: item.image[0],
              priority: FastImage.priority.high,
            }}
          />
          {multiSelectMode &&
            selectedItems.some(
              selectedItem => selectedItem._id === item._id,
            ) && (
              <View style={styles.tickContainer}>
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
      data.push({_id: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return data;
  };

  const handleSubmit = () => {
    // Filter out selected items that are already in the cart
    const itemsToAdd = selectedItems.filter(item => {
      return !cartItems.find(cartItem => cartItem._id === item._id);
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
    dispatch(removeFromCart(userSelected._id));
  };

  useEffect(() => {
    let result = cartItems.filter(element => {
      return element._id === userSelected._id;
    });
    if (result.length) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cartItems, userSelected]);

  const renderSlider = () => (
    <View style={styles.sliderContainer}>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={2}
        maximumValue={5}
        step={1}
        value={numColumns}
        onValueChange={value => setNumColumns(value)}
        trackStyle={{height: 8, borderRadius: 5, backgroundColor: 'grey'}}
        thumbStyle={{
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: 'grey',
        }}
        minimumTrackTintColor={'grey'}
        maximumTrackTintColor={'grey'}
        animationType="timing"
      />
    </View>
  );

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

        <Text style={styles.headerText}>{category}</Text>
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
          style={{backgroundColor: '#e1d2c4'}}
          // data={formatRow(category, numColumns)}
          data={categorys ? formatRow(categorys, numColumns) : []}
          // keyExtractor={item => {
          //   return item._id.toString();
          // }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </PinchGestureHandler>

      {/* Add the slider component here */}
      {renderSlider()}
      {
        <Text style={styles.txt}>
          {!multiSelectMode
            ? 'Long press to select'
            : 'Click Add to Cart Button'}
        </Text>
      }

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
                    style={[{tintColor: '#fff'}, styles.tinyLogo]}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/271/271228.png',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigateToPreviousItem}
                  style={[styles.btn, {left: 10}]}>
                  <Image
                    style={[{tintColor: '#fff'}, styles.tinyLogo]}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/271/271220.png',
                    }}
                  />
                </TouchableOpacity>
                <Image
                  style={{width: 'auto', height: 300}}
                  source={{
                    uri:
                      userSelected &&
                      userSelected.image &&
                      userSelected.image[0],
                  }}
                />
                <Text style={styles.category}>
                  {userSelected && userSelected.category}
                </Text>
                <Text style={styles.textModal}>
                  Weight: {userSelected && userSelected.weight}
                </Text>
                <Text style={styles.textModal}>
                  Size: {userSelected && userSelected.size}
                </Text>
                <Text style={styles.textModal}>
                  Description: {userSelected && userSelected.description}
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

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

export default connect(mapStateToProps)(Catagories);
