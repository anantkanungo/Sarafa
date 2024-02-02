import React, { useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  removeAllItemsFromCart,
} from '../reduxThunk/action/orderAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CartScreen = ({ navigation }) => {
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
      item._id === itemId
        ? { ...item, size: newSize, quantity: newQuantity }
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
  // const handleRemoveFromCart = item => {
  //   // console.warn(item);
  //   dispatch(removeFromCart(item._id));
  // };
  // Remove item from cart
  const handleRemoveFromCart = item => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${item.category} from your cart?`,
      [
        {
          text: 'Remove',
          onPress: () => {
            dispatch(removeFromCart(item._id));
            // Display a success alert
            Alert.alert(
              'Item Removed',
              `${item.category} has been removed from your cart.`,
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    setCartItems(cartData);
  }, [cartData]);

  const submitAlert = () => {
    Alert.alert(
      'Place Order',
      'Are you sure you want to place all this orders?',
      [
        { text: 'Place Order', onPress: handlePlaceOrder },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const handlePlaceOrder = async () => {
    console.warn('Place Order: ', cartItems);
    // WARN  Place Order:  [{"category": "ring", "id": 1, "image": "https://m.media-amazon.com/images/I/71tg+iUHJ9L._AC_UY1100_.jpg", "quantity": "1", "size": "2", "weight": "2.5"}, {"category": "chain", "id": 4, "image": "https://bootdey.com/image/400x200/4682B4/000000", "quantity": "1", "size": "1", "weight": "1.5"}]
    try {
      const token = await AsyncStorage.getItem('@AuthToken');

      const items = cartItems.map(item => ({
        category: item.category,
        image: item.image,
        quantity: item.quantity,
        size: item.size,
        weight: item.weight,
      }));
      console.log('Items:', items);
      await axios
        .post('http://139.59.58.151:8000/cartorder', items, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        })
        .then(response => {
          // console.log('Response:', response);
          // console.log('Response status:', response.status);
          console.log('Response data:', response.data);
          Alert.alert('Your order is Successful.');
          setCartItems([]);
          dispatch(removeAllItemsFromCart());
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
            source={{ uri: 'https://img.icons8.com/ios/50/long-arrow-left.png' }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Cart</Text>
      </View>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            style={[styles.list, { backgroundColor: '#F2F3F4' }]}
            data={cartItems}
            // keyExtractor={item => item.id.toString()}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={({ item }) => (
              <View style={styles.card} key={item._id}>
                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(item)}
                  style={styles.voiceButton}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/material-outlined/trash--v1.png',
                    }}
                    style={{ width: 18, height: 18, tintColor: '#000' }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setSelectedItemId(item._id);
                  }}
                  style={[styles.voiceButton, { top: '50%' }]}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/material-outlined/edit.png',
                    }}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
                <Image style={styles.cardImage} source={{ uri: item.image[0] }} />
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.category}</Text>
                  <Text style={styles.order}>Weight: {item.weight}</Text>
                  <Text style={styles.order}>Size: {item.size}</Text>
                  <Text style={styles.order}>Quantity: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
          {/* <View style={{height: 40, opacity: 1}} /> */}
          {/* Place Order button */}
          <TouchableOpacity
            style={styles.button1}
            onPress={() => submitAlert()}>
            <Text style={styles.buttonText1}>Place Order</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <Image
            style={{ alignSelf: 'center', width: 100, height: 100 }}
            source={{
              uri: 'https://img.icons8.com/ios/100/000000/empty-box.png',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 22,
              fontFamily: 'Gilroy-Regular',
            }}>
            Your cart is empty!
          </Text>
        </View>
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
              <View style={{ flexDirection: 'row' }}>
                <Button
                  title="Submit"
                  color={'#000'}
                  onPress={() => {
                    handleEditItem();
                    setModalVisible(!modalVisible);
                    setSize('');
                    setQuantity('');
                  }}
                />
                <View style={{ width: 10 }} />
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
