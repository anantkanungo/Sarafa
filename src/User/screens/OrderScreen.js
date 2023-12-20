import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import styles from './orderStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const fetchOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('@AuthToken');
    const response = await axios.get(
      'http://139.59.58.151:8000/pendingorders',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(response);
    // console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

const OrderScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState();
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [orders]);

  // // Function to fetch orders and update state
  // const fetchAndSetOrders = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await fetchOrders();
  //     setOrders(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // Initial data fetch
  //   fetchAndSetOrders();

  //   // Set up interval for auto-refresh every 5 minutes (adjust as needed)
  //   const refreshInterval = setInterval(() => {
  //     fetchAndSetOrders();
  //   }, 5 * 60 * 1000); // 5 minutes in milliseconds

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(refreshInterval);
  // }, []);

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
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Orders</Text>
      </View>
      {/* <View style={{alignItems: 'center'}}>
        <Text style={styles.headerText}>Orders</Text>
      </View> */}
      {isLoading ? (
        <ActivityIndicator visible={isLoading} />
      ) : (
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
            // console.log(item.image[0]);
            // let Date = item.updatedAt;
            // console.log(Date);
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
                    <Text style={styles.order}>Quantity: {item.quantity}</Text>
                    <Text style={styles.order}>Status: {item.statusIs}</Text>
                  </View>
                  <View
                    style={[
                      {
                        backgroundColor:
                          item.statusIs === 'pending'
                            ? '#A0785A'
                            : item.statusIs === 'processing'
                            ? '#aecbfa'
                            : item.statusIs === 'completed'
                            ? '#ccff90'
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
      )}
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
                      padding: 6,
                      borderWidth: 2,
                      borderColor: '#000',
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      alignItems: 'center',
                    }}
                    onPress={closeModal}>
                    <FontAwesome5 name={'times'} size={20} color={'#000'} />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={selectedOrder?.image} // Assuming selectedOrder.images is an array of image URIs
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <Image
                      style={{width: 300, height: 300, resizeMode: 'contain'}}
                      source={{uri: item}}
                    />
                  )}
                  horizontal // Set this to render images horizontally
                />
                <View style={{flexDirection: 'row', margin: 10}}>
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
                <View style={{flexDirection: 'row'}}>
                  <View style={{borderWidth: 1, paddingHorizontal: 10}}>
                    <Text style={styles.orderModal}>Date: </Text>
                    <Text style={styles.orderModal}>Category:</Text>
                    <Text style={styles.orderModal}>Description:</Text>
                    <Text style={styles.orderModal}>Tunch:</Text>
                    <Text style={styles.orderModal}>Weight:</Text>
                    <Text style={styles.orderModal}>Size:</Text>
                    <Text style={styles.orderModal}>Quantity:</Text>
                    <Text style={styles.orderModal}>Status:</Text>
                  </View>
                  <View style={{borderWidth: 1, flex: 1, paddingLeft: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.orderModal}>
                        {new Date(selectedOrder?.updatedAt).toLocaleString()}
                      </Text>
                    </View>
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
                      {selectedOrder?.description}
                    </Text>
                    <Text style={styles.orderModal}>
                      {selectedOrder?.tunch}
                    </Text>
                    <Text style={styles.orderModal}>
                      {selectedOrder?.weight}
                    </Text>
                    <Text style={styles.orderModal}>{selectedOrder?.size}</Text>
                    <Text style={styles.orderModal}>
                      {selectedOrder?.quantity}
                    </Text>
                    <Text style={styles.orderModal}>
                      {selectedOrder?.statusIs}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderScreen;
