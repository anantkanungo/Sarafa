import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import styles from './orderStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import close from '../assets/icons8-close-window-50.png';
import { RadioButton } from 'react-native-paper';

const GilroyText = ({ label, ...props }) => (
  <Text style={{ fontFamily: 'Gilroy-Regular', ...styles.pikerLabel }} {...props}>
    {label}
  </Text>
);

const fetchOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('@AuthToken');
    const response = await axios.get('http://139.59.58.151:8000/allorders', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const OrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState();
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusInput, setStatusInput] = useState('');
  const [clearFilterStatus, setClearFilterStatus] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Function to filter options by status
  const filterOptionsByStatus = statusIs => {
    console.log('Filtering by status:', statusIs);

    const filteredOptions = orders.filter(item => item.statusIs === statusIs);
    console.log('Filtered options:', filteredOptions);

    setAutoRefresh(false); // Disable auto-refresh
    setOrders(filteredOptions);
  };

  const clearFilter = () => {
    setAutoRefresh(true); // Enable auto-refresh
  };

  const applyFilter = () => {
    if (statusInput !== 'all') {
      filterOptionsByStatus(statusInput);
    } else {
      clearFilter();
    }
    setClearFilterStatus(!clearFilterStatus);
    setAutoRefresh(false); // Disable auto-refresh when the filter button is clicked
  };

  const renderStatusFilter = () => (
    <RadioButton.Group
      onValueChange={newValue => {
        setAutoRefresh(true); // Enable auto-refresh when the picker value changes
        setStatusInput(newValue);
      }}
      value={statusInput}>
      <RadioButton.Item label="All" value="all" />
      <RadioButton.Item label="🔵 Pending" value="pending" />
      <RadioButton.Item label="🟡 Processing" value="processing" />
      <RadioButton.Item label="🟢 Completed" value="completed" />
      {/* <RadioButton.Item label="🟠 Collect" value="collect" /> */}
      <RadioButton.Item label="🔴 Rejected" value="rejected" />
    </RadioButton.Group>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setIsLoading(false);
        // After the initial data load, enable auto-refresh
        setAutoRefresh(true);
      } catch (error) {
        console.error(error);
      }
    };
    if (autoRefresh) {
      fetchData();
    }
  }, [autoRefresh]);
  console.log("Orders", orders)

  const handleCardPress = order => {
    setSelectedOrder(order);
    setAudioURL(order.audio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    stopAudio();
  };

  // Audio Player
  const startAudio = async () => {
    let url = audioURL;

    if (Array.isArray(url)) {
      console.error('url is an array:', url);
      url = url[0];
    }

    // console.log('Audio URL:', url);
    const result = await audioPlayer.startPlayer(url);
    setIsPlaying(true);
    console.log(result);
  };

  const stopAudio = async () => {
    const result = await audioPlayer.stopPlayer();
    setIsPlaying(false);
    console.log(result);
  };

  useEffect(() => {
    setAudioPlayer(new AudioRecorderPlayer());

    return () => {
      stopAudio();
      if (audioPlayer) {
        audioPlayer.destroy();
      }
    };
  }, []);

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
        <Text style={styles.headerText}>Orders</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator visible={isLoading} />
      ) : orders.length > 0 ? (
        <>
          <FlatList
            style={styles.list}
            data={orders}
            keyExtractor={item => {
              return item._id.toString();
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={orders => {
              const item = orders.item;
              return (
                <TouchableOpacity onPress={() => handleCardPress(item)}>
                  <View style={styles.card} key={item._id}>
                    <FastImage
                      style={styles.cardImage}
                      source={{
                        uri: item.image[0],
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={styles.cardHeader}>
                      <Text style={styles.title}>{item.category}</Text>
                      <Text style={styles.order}>Tunch: {item.tunch}</Text>
                      <Text style={styles.order}>Weight: {item.weight}</Text>
                      <Text style={styles.order}>Size: {item.size}</Text>
                      <Text style={styles.order}>
                        Quantity: {item.quantity}
                      </Text>
                      <Text style={styles.order}>Status: {item.statusIs}</Text>
                    </View>
                    <View
                      style={[
                        {
                          backgroundColor:
                            item.statusIs === 'pending'
                              ? '#aecbfa'
                              : item.statusIs === 'processing'
                                ? '#FFBF00'
                                : item.statusIs === 'completed'
                                  ? '#ccff90'
                                  : item.statusIs === 'collect'
                                    ? '#FF4F00'
                                    : item.statusIs === 'rejected'
                                      ? '#f28b82'
                                      : '#ffffff',
                        },
                        styles.color,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity
            style={styles.button1}
            onPress={() => setClearFilterStatus(true)}>
            <Text style={styles.buttonText1}>Filter</Text>
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
            Your Orders is empty!
          </Text>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => setClearFilterStatus(true)}>
            <Text style={styles.buttonText1}>Filter</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={clearFilterStatus}
        onRequestClose={() => {
          setClearFilterStatus(!clearFilterStatus);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Filter */}
            {renderStatusFilter()}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setStatusInput('all');
                  clearFilter();
                  setClearFilterStatus(!clearFilterStatus);
                }}>
                <Text style={styles.textStyle}>Reset</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  applyFilter();
                }}>
                <Text style={styles.textStyle}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <View style={styles.popupContent}>
              <View contentContainerStyle={styles.modalInfo}>
                <View style={styles.orderContainer}>
                  <Text style={styles.titleModal}>Order Details</Text>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                    }}
                    onPress={closeModal}>
                    <Image
                      source={close}
                      style={{ height: 40, width: 40, tintColor: '#000' }}
                    />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={selectedOrder?.image} // Assuming selectedOrder.images is an array of image URIs
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Image
                      style={{ width: 300, height: 300, resizeMode: 'contain' }}
                      source={{ uri: item }}
                    />
                  )}
                  horizontal // Set this to render images horizontally
                />
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <Text style={styles.titleModal}>Audio: </Text>
                  {Array.isArray(audioURL) && audioURL.length > 0 ? (
                    <TouchableOpacity
                      onPress={isPlaying ? stopAudio : startAudio}
                      style={styles.voiceButton}>
                      {isPlaying ? (
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/709/709714.png',
                          }}
                          style={styles.tinyLogo}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/109/109197.png',
                          }}
                          style={styles.tinyLogo}
                        />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.titleModal}>No Audio Available</Text>
                  )}
                </View>
                <ScrollView style={{ height: 150 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ borderWidth: 1, paddingHorizontal: 10 }}>
                      <Text style={styles.orderModal}>Date: </Text>
                      <Text style={styles.orderModal}>Category:</Text>
                      <Text style={styles.orderModal}>Tunch:</Text>
                      <Text style={styles.orderModal}>Weight:</Text>
                      <Text style={styles.orderModal}>Size:</Text>
                      <Text style={styles.orderModal}>Quantity:</Text>
                      <Text style={styles.orderModal}>Status:</Text>
                    </View>
                    <View style={{ borderWidth: 1, flex: 1, paddingLeft: 10 }}>
                      <Text style={styles.orderModal}>
                        {new Date(selectedOrder?.updatedAt).toLocaleString()}
                      </Text>
                      <Text
                        style={[
                          styles.orderModal,
                          {
                            textTransform: 'capitalize',
                          },
                        ]}>
                        {selectedOrder?.category}
                      </Text>
                      <Text style={styles.orderModal}>
                        {selectedOrder?.tunch}
                      </Text>
                      <Text style={styles.orderModal}>
                        {selectedOrder?.weight}
                      </Text>
                      <Text style={styles.orderModal}>
                        {selectedOrder?.size}
                      </Text>
                      <Text style={styles.orderModal}>
                        {selectedOrder?.quantity}
                      </Text>
                      <Text style={styles.orderModal}>
                        {selectedOrder?.statusIs}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 5,
                    }}>
                    <Text style={styles.orderModal}>
                      Description: {selectedOrder?.description}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderScreen;
