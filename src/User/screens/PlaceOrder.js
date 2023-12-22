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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                style={Styles.image}
                source={{
                  uri: 'data:image/png;base64,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',
                }}
              />
            </TouchableOpacity>
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
                    <Text style={Styles.textStyle}>Gallery</Text>
                  </Pressable>
                  <Pressable
                    style={[Styles.button, Styles.buttonOpen]}
                    onPress={takePhotoFromCamera}>
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
            style={Styles.pikerLabel}>
            <Picker.Item
              style={Styles.pikerLabel}
              label="Select category"
              value=""
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Ring 'रिंग'"
              value="ring"
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Earring 'इयररिंग '"
              value="earring"
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Bangle 'बैंगल'"
              value="bangle"
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Chain 'चेन'"
              value="chain"
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Necklace 'नेकलेस'"
              value="necklace"
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Nosepin 'नोज पिन'"
              value="nosepin"
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Pendants 'पेंडेंट'"
              value="pendants"
            />
            <Picker.Item
              style={Styles.pikerLabel}
              label="Mangalsutra 'मंगलसूत्र'"
              value="mangalsutra"
            />
            <Picker.Item
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
                <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
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
                onValueChange={(itemValue, itemIndex) => setTunch(itemValue)}>
                <Picker.Item
                  style={Styles.pikerLabel}
                  label="Regular"
                  value="regular"
                />
                <Picker.Item style={Styles.pikerLabel} label="92" value="92" />
                <Picker.Item
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
                    style={[Styles.button, Styles.buttonOpen]}
                    onPress={() => setModalVisible1(!modalVisible1)}>
                    <Text style={Styles.textStyle}>Done</Text>
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
