import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Button,
  Modal,
} from 'react-native';
import styles from './cartStyles';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {removeFromCart} from '../../reduxThunk/action/orderAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(cartData);

  // Edit item in cart
  const editItemInCart = (cartItems, itemId, newSize, newQuantity) => {
    return cartItems.map(item =>
      item.id === itemId
        ? {...item, size: newSize, quantity: newQuantity}
        : item,
    );
  };

  const handleEditItem = () => {
    const newCartItems = editItemInCart(
      cartItems,
      selectedItemId,
      size,
      quantity,
    );
    setCartItems(newCartItems);
    console.log(newCartItems);
  };

  // Remove item from cart

  const handleRemoveFromCart = userSelected => {
    // console.warn(userSelected);
    dispatch(removeFromCart(userSelected.id));
  };

  useEffect(() => {
    setCartItems(cartData);
  }, [cartData]);

  const handlePlaceOrder = async () => {
    console.warn('Place Order: ', cartItems);
    try {
      const token = await AsyncStorage.getItem('@AuthToken');

      const formData = new FormData();
      // Append each property of each cartItem to formData with a unique keyword
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        cartItems.forEach((item, index) => {
          const imgCamera = {
            name: new Date() + 'image.jpg' || 'image.jpg' || 'image.png',
            type: 'image/jpeg' || 'image/jpg' || 'image/png',
            uri: item.image,
          };
          formData.append('cameraImage', imgCamera);
          formData.append('category', item.category);
          formData.append('quantity', item.quantity);
          formData.append('size', item.size);
          formData.append('weight', item.weight);
        });
      }

      await axios
        .post('http://139.59.58.151:8000/cartorder', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        })
        .then(response => {
          // console.log('Response:', response);
          // console.log('Response status:', response.status);
          console.log('Response data:', response.data);
          Alert.alert('Your order is Successful.');
        })
        .catch(error => {
          console.error('Failed to place order. Error message:', error.message);
          console.error('Failed to place order. Error:', error);
        });
    } catch (error) {
      console.error('Error in handlePlaceOrder:', error);
    }
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
      {cartItems.length > 0 ? (
        <>
          <FlatList
            style={styles.list}
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={({item}) => (
              <View style={styles.card} key={item.id}>
                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(item)}
                  style={styles.voiceButton}>
                  <FontAwesome5 name={'trash'} size={25} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setSelectedItemId(item.id);
                  }}
                  style={[styles.voiceButton, {top: '50%'}]}>
                  <FontAwesome5 name={'pen'} size={25} color={'#000'} />
                </TouchableOpacity>
                <Image style={styles.cardImage} source={{uri: item.image}} />
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.category}</Text>
                  <Text style={styles.order}>Weight: {item.weight}</Text>
                  <Text style={styles.order}>Size: {item.size}</Text>
                  <Text style={styles.order}>Quantity: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
          <View style={{height: 40}} />
          {/* Place Order button */}
          <TouchableOpacity
            style={styles.button1}
            onPress={() => handlePlaceOrder()}>
            <Text style={styles.buttonText1}>Place Order</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{textAlign: 'center', color: '#000', fontSize: 22}}>
          Your cart is empty!
        </Text>
      )}

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {selectedItemId && (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Size & Quantity:</Text>
              <View style={styles.orderContainer}>
                <Text style={styles.order}>Size: </Text>
                <TextInput
                  style={styles.input1}
                  value={size}
                  onChangeText={setSize}
                  placeholder="Enter new size"
                  placeholderTextColor={'#000'}
                  maxLength={8}
                />
              </View>
              <View style={styles.orderContainer}>
                <Text style={styles.order}>Quantity: </Text>
                <TextInput
                  style={styles.input1}
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Enter new quantity"
                  placeholderTextColor={'#000'}
                  keyboardType="numeric"
                  maxLength={8}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Button
                  title="Submit"
                  onPress={() => {
                    handleEditItem();
                    setModalVisible(!modalVisible);
                    setSize('');
                    setQuantity('');
                  }}
                />
                <View style={{width: 10}} />
                <Button
                  title="Cancel"
                  color={'red'}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;
