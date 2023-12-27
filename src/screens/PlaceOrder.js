/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// https://www.npmjs.com/package/@react-native-picker/picker
// https://github.com/lawnstarter/react-native-picker-select/issues/402
import {Picker} from '@react-native-picker/picker';
import Voice from '@react-native-voice/voice';
import Styles from './placeOrderStyles';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const GilroyText = ({label, ...props}) => (
  <Text style={{fontFamily: 'Gilroy-Regular', ...Styles.pikerLabel}} {...props}>
    {label}
  </Text>
);

const PlaceOrder = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [category, setCategory] = useState();
  const [description, setRecognizedText] = useState('');
  const [tunch, setTunch] = useState('regular');
  const [weight, onChangeWeight] = useState('');
  const [size, onChangeSize] = useState('');
  const [quantity, onChangeQuantity] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isListening, setIsListening] = useState(false);
  const [camera, setCamera] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState([]);
  const [recorderPlayer, setRecorderPlayer] = useState(
    new AudioRecorderPlayer(),
  );
  const [audioPath, setAudioPath] = useState('');
  const [audio, setAudio] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playButtonVisible, setPlayButtonVisible] = useState(false);

  const submitAlert = () => {
    Alert.alert(
      'Submit Order',
      'Are you sure you want to submit this order?',
      [
        {text: 'Submit', onPress: submitData},
        {text: 'Cancel', onPress: clearAllStates},
      ],
      {cancelable: true},
    );
  };

  const submitData = async () => {
    try {
      // Check if any value in userData is empty
      const data = {
        category,
        // weight,
        // size,
        // quantity,
      };
      // the userData object using a for...in loop.
      for (let key in data) {
        if (!data[key]) {
          Alert.alert('Please fill in all fields.');
          return;
        }
      }

      const formData = new FormData();

      // Append gallery from Gallery
      if (Array.isArray(gallery) && gallery.length > 0) {
        gallery.forEach((selectedImage, index) => {
          if (selectedImage && selectedImage.data && selectedImage.mime) {
            const imgGallery = {
              name:
                new Date() + `image${index + 1}.png` ||
                `image${index + 1}.jpeg` ||
                `image${index + 1}.jpg`,
              type: 'image/png' || 'image/jpeg' || 'image/jpg',
              uri:
                Platform.OS === 'android'
                  ? selectedImage.path
                  : selectedImage.path.replace('file://', ''),
            };
            formData.append('galleryImage', imgGallery);
          } else {
            console.error(
              `Image ${index + 1} object is missing expected properties.`,
            );
          }
        });
      }

      // Append camera
      // console.log('camera: ', camera);
      if (Array.isArray(camera) && camera.length > 0) {
        camera.forEach((item, index) => {
          const imgCamera = {
            name:
              new Date() + `image${index + 1}.jpg` ||
              `image${index + 1}.jpeg` ||
              `image${index + 1}.png`,
            type: 'image/jpeg' || 'image/jpg' || 'image/png',
            uri:
              Platform.OS === 'android'
                ? item.path
                : item.path.replace('file://', ''),
          };
          formData.append('cameraImage', imgCamera);
        });
      }

      // console.log('audio: ', audio);

      // Append the audio file to the FormData
      if (Array.isArray(audio) && audio.length > 0) {
        const audioFile = {
          uri: Platform.OS === 'android' ? audio : audio.replace('file://', ''),
          type: 'audio/mp3', // or 'audio/mpeg', depending on the actual MIME type of your audio file
          name: `${new Date().toISOString()}-audio.mp3`, // or use a UUID for a unique name
        };
        formData.append('audio', audioFile);
      }

      // Append other form data
      formData.append('category', category);
      formData.append('description', description);
      formData.append('tunch', tunch);
      formData.append('weight', weight);
      formData.append('size', size);
      formData.append('quantity', quantity);
      formData.append('urgent', isEnabled);

      // Make the API request
      const token = await AsyncStorage.getItem('@AuthToken');
      await axios
        .post('http://139.59.58.151:8000/placeorder', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        })
        .then(response => {
          console.log('Response:', response);
          console.log('Response status:', response.status);
          console.log('Response data:', response.data);
          Alert.alert('Your order is Successful.');
          clearAllStates();
        })
        .catch(error => {
          console.error('Failed to upload error message:', error.message);
          console.error('Failed to upload error:', error);
          clearAllStates();
        });
    } catch (error) {
      console.log('Error sending  to server: ', error);
    }
  };

  const clearAllStates = () => {
    setGallery([]);
    setSelectedGallery([]);
    setRecognizedText('');
    setCamera([]);
    setCategory('');
    setAudio([]);
    setAudioPath([]);
    setTunch('regular');
    onChangeWeight('');
    onChangeSize('');
    onChangeQuantity('');
    setPlayButtonVisible(false);
    setIsEnabled(false);
  };

  // UploadImage
  // camera function
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.5,
    })
      .then(image => {
        console.log('image', image);
        const imageData = {
          data: image.data,
          path: image.path,
          mime: image.mime,
        };
        if (!camera.some(photo => photo.data === image.data)) {
          setCamera(prevPhotos => [...prevPhotos, imageData]);
        }
        setModalVisible(false);
      })
      .catch(error => {
        console.error('Failed to open camera:', error);
      });
  };

  // Gallery function
  const choosePhotoFromLibrary = async () => {
    try {
      const images = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        compressImageQuality: 0.5,
        multiple: true,
        includeBase64: true,
        includeExif: true,
        // cropping: cropit,
      });
      setGallery(images);
      console.log('Gallery: ', images);
      setModalVisible(false);
      if (Array.isArray(images) && images.length > 0) {
        setSelectedGallery(images.map(img => ({uri: img.path})));
      }
    } catch (error) {
      console.error('Failed to open gallery:', error);
    }
  };

  // Audio Recording
  const startRecording = async () => {
    try {
      const path = RNFetchBlob.fs.dirs.DocumentDir + '/audio.mp3';
      const result = await recorderPlayer.startRecorder(path);
      setIsRecording(true);
      setAudioPath(path);
      setAudio(result);
      console.log(result);
      console.log('Audio Path: ', path);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    const result = await recorderPlayer.stopRecorder();
    setIsRecording(false);
    setPlayButtonVisible(true);
    console.log(result);
  };

  const startPlayback = async () => {
    const result = await recorderPlayer.startPlayer(audioPath);
    setIsPlaying(true);
    console.log(result);
  };

  const stopPlayback = async () => {
    const result = await recorderPlayer.stopPlayer();
    setIsPlaying(false);
    console.log(result);
  };

  const deleteRecording = () => {
    setAudio([]);
    setAudioPath([]);
    setPlayButtonVisible(false);
  };

  return (
    <View style={Styles.container}>
      {/* header */}
      <View style={Styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={Styles.tinyLogo}
            src="https://img.icons8.com/ios/50/long-arrow-left.png"
          />
        </TouchableOpacity>
        <Text style={Styles.headerText}>Place Order</Text>
      </View>

      <ScrollView>
        {/* UploadImage */}
        <View style={Styles.contain}>
          <ScrollView horizontal={true}>
            {selectedGallery.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={{width: 100, height: 100}}
              />
            ))}
            {camera.map((photo, index) => (
              <Image
                key={index}
                source={{uri: photo.path}}
                style={{width: 100, height: 100}}
              />
            ))}
            <Pressable
              style={[Styles.button, Styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Image
                style={[Styles.tinyLogo, {alignSelf: 'center'}]}
                src="https://img.icons8.com/material-outlined/add-image.png"
              />
              <Text style={Styles.textStyle}>Upload Photo</Text>
            </Pressable>
          </ScrollView>
        </View>
        {/* Modal */}
        <View style={Styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                <Text style={Styles.modalText}>Upload Photo!</Text>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[Styles.button, Styles.buttonOpen]}
                    onPress={choosePhotoFromLibrary}>
                    <Image
                      style={[Styles.tinyLogo, {alignSelf: 'center'}]}
                      src="https://img.icons8.com/material-outlined/image-gallery.png"
                    />
                    <Text style={Styles.textStyle}>Gallery</Text>
                  </Pressable>
                  <Pressable
                    style={[Styles.button, Styles.buttonOpen]}
                    onPress={takePhotoFromCamera}>
                    <Image
                      style={[Styles.tinyLogo, {alignSelf: 'center'}]}
                      src="https://img.icons8.com/material-outlined/compact-camera--v2.png"
                    />
                    <Text style={Styles.textStyle}>Camera</Text>
                  </Pressable>
                </View>
                <Pressable
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={Styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        {/* jewelryPicker */}
        <View style={Styles.jewelryPicker}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            dropdownIconColor="#000"
            itemStyle={Styles.pikerLabel}>
            <GilroyText
              style={Styles.pikerLabel}
              label="Select category"
              value=""
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="Ring 'रिंग'"
              value="ring"
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="Earring 'इयररिंग '"
              value="earring"
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="Bracelet 'ब्रेसलेट '"
              value="bracelet"
            />

            <GilroyText
              style={Styles.pikerLabel}
              label="Chain 'चेन'"
              value="chain"
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="Necklace 'नेकलेस'"
              value="necklace"
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="Nosepin 'नोज पिन'"
              value="nosepin"
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="Pendants 'पेंडेंट'"
              value="pendants"
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="Mangalsutra 'मंगलसूत्र'"
              value="mangalsutra"
            />
            <GilroyText
              style={Styles.pikerLabel}
              label="others"
              value="others"
            />
          </Picker>
        </View>
        {/* Description & voiceButton */}
        <View style={Styles.rowContainer}>
          <TextInput
            style={Styles.input}
            placeholder="Description"
            placeholderTextColor="#495057"
            onChangeText={text => setRecognizedText(text)}
            value={description}
            multiline={true}
          />
          {playButtonVisible && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[Styles.voiceButton, {paddingTop: 10}]}
                onPress={deleteRecording}>
                <Image
                  src="https://img.icons8.com/material-outlined/24/trash--v1.png"
                  style={{width: 25, height: 25, tintColor: '#000'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={isPlaying ? stopPlayback : startPlayback}
                style={Styles.voiceButton}>
                {isPlaying ? (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/709/709714.png',
                    }}
                    style={Styles.tinyLogo}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/109/109197.png',
                    }}
                    style={Styles.tinyLogo}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}

          <View>
            <TouchableOpacity
              onPress={isRecording ? stopRecording : startRecording}
              style={Styles.voiceButton}>
              {isRecording ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={Styles.voiceButtonText}>•••</Text>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/709/709714.png',
                    }}
                    style={Styles.tinyLogo}
                  />
                </View>
              ) : (
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/7175/7175253.png',
                  }}
                  style={Styles.tinyLogo}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Tunch */}
        <View style={Styles.rowContainer}>
          <View style={Styles.tunchContainer}>
            <Text style={Styles.tunchView1}>टंच :</Text>
            <View style={Styles.tunchView2}>
              <Picker
                selectedValue={tunch}
                onValueChange={(itemValue, itemIndex) => setTunch(itemValue)}
                dropdownIconColor="#000"
                itemStyle={Styles.pikerLabel}>
                <GilroyText
                  style={Styles.pikerLabel}
                  label="Regular"
                  value="regular"
                />
                <GilroyText style={Styles.pikerLabel} label="92" value="92" />
                <GilroyText
                  style={{color: '#000'}}
                  label={tunch}
                  value={tunch}
                  onChangelable={setTunch}
                />
              </Picker>
            </View>
            <Text style={Styles.tunchView1}>%</Text>
          </View>
          <View style={Styles.tunchView4}>
            <TouchableOpacity
              style={Styles.tunchView5}
              onPress={() => setModalVisible1(true)}>
              <Image
                style={Styles.tinyLogo}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/149/149705.png',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Tunch Modal */}
        <View style={Styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setModalVisible1(!modalVisible1);
            }}>
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                <Text style={Styles.modalText}>Enter टंच :</Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    style={Styles.input1}
                    placeholder=""
                    onChangeText={setTunch}
                    value={tunch}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <Pressable
                    style={[
                      Styles.button,
                      Styles.buttonOpen,
                      {backgroundColor: '#000'},
                    ]}
                    onPress={() => setModalVisible1(!modalVisible1)}>
                    <Text style={[Styles.textStyle, {color: '#fff'}]}>
                      Done
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* weight & Size */}
        <View style={Styles.wsContainer}>
          <Text style={Styles.text}>Weight :</Text>
          <TextInput
            style={Styles.input1}
            placeholder="g"
            placeholderTextColor="#495057"
            onChangeText={onChangeWeight}
            value={weight}
            maxLength={8}
            keyboardType="default"
          />
          <Text style={Styles.text}>Size :</Text>
          <TextInput
            style={Styles.input1}
            placeholder=""
            onChangeText={onChangeSize}
            value={size}
            maxLength={8}
            keyboardType="default"
          />
        </View>
        <View style={Styles.wsContainer}>
          <Text style={Styles.text}>Quantity :</Text>
          <TextInput
            style={Styles.input1}
            placeholder=""
            onChangeText={onChangeQuantity}
            value={quantity}
            maxLength={2}
            keyboardType="default"
          />
        </View>
        {/* Switch */}
        <View style={Styles.switchContainer}>
          <Text style={Styles.text}>Urgent Delivery :</Text>
          <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={isEnabled ? '#000000' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
          />
        </View>
        {/* Submit button */}
        <View style={Styles.sbContainer}>
          <TouchableOpacity style={Styles.loginButton} onPress={submitAlert}>
            <Text style={Styles.loginButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceOrder;

// Voice Recording
// useEffect(() => {
//   Voice.onSpeechStart = onSpeechStart;
//   Voice.onSpeechEnd = stopListing;
//   Voice.onSpeechResults = onSpeechResults;
//   Voice.onSpeechError = error => console.log('onSpeechError: ', error);

//   const androidPermissionChecking = async () => {
//     if (Platform.OS === 'android') {
//       const hasPermission = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       );
//       console.log(
//         'androidPermissionChecking - hasPermission:',
//         hasPermission,
//       );
//       const getService = await Voice.getSpeechRecognitionServices();
//       console.log('androidPermissionChecking - getService: ', getService);
//     }
//   };

//   return () => {
//     Voice.destroy().then(Voice.removeAllListeners);
//   };
// }, []);

// const onSpeechStart = event => {
//   console.log('Recording onSpeechStart...', event);
// };

// const onSpeechResults = event => {
//   console.log('Recording onSpeechResults...', event);
//   const text = event.value[0];
//   setRecognizedText(text);
// };

// const startListing = async () => {
//   setIsListening(true);
//   try {
//     await Voice.start('hi-IN');
//   } catch (error) {
//     console.log('startListing - error:', error);
//   }
// };

// const stopListing = async () => {
//   try {
//     Voice.removeAllListeners();
//     await Voice.stop();
//     setIsListening(false);
//   } catch (error) {
//     console.log('stopListing - error:', error);
//   }
// };

// {/* <View>
//   <TouchableOpacity
//     onPress={() => {
//       isListening ? stopListing() : startListing();
//     }}
//     style={Styles.voiceButton}>
//     {isListening ? (
//       <Text style={Styles.voiceButtonText}>•••</Text>
//     ) : (
//       <Image
//         source={{
//           uri: 'https://cdn-icons-png.flaticon.com/128/7175/7175253.png',
//         }}
//         style={Styles.tinyLogo}
//       />
//     )}
//   </TouchableOpacity>
// </View>; */}
