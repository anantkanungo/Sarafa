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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UploadImage from '../assets/UploadImage.png';
// https://www.npmjs.com/package/@react-native-picker/picker
// https://github.com/lawnstarter/react-native-picker-select/issues/402
import {Picker} from '@react-native-picker/picker';
// https://www.npmjs.com/package/react-native-document-picker
import DocumentPicker from 'react-native-document-picker';
import Voice from '@react-native-voice/voice';
import Styles from './placeOrderStyles';

const PlaceOrder = ({navigation}) => {
  const [selectedJewelry, setSelectedJewelry] = useState();
  const [selectedTunch, setSelectedTunch] = useState();
  const [width, onChangeWidth] = useState('');
  const [size, onChangeSize] = useState('');
  const [quantity, onChangeQuantity] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // UploadImage
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick();
      console.log(doc);
    } catch (error) {
      // console.log(error);
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled the upload', error);
      } else {
        console.log(error);
      }
    }
  };

  // Voice Recording
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListing;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => console.log('onSpeechError: ', error);

    const androidPermissionChecking = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        console.log(
          'androidPermissionChecking - hasPermission:',
          hasPermission,
        );
        const getService = await Voice.getSpeechRecognitionServices();
        console.log('androidPermissionChecking - getService: ', getService);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = event => {
    console.log('Recording onSpeechStart...', event);
  };

  const onSpeechResults = event => {
    console.log('Recording onSpeechResults...', event);
    const text = event.value[0];
    setRecognizedText(text);
  };

  const startListing = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('startListing - error:', error);
    }
  };

  const stopListing = async () => {
    try {
      Voice.removeAllListeners();
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.log('stopListing - error:', error);
    }
  };

  return (
    <View style={Styles.container}>
      {/* header */}
      <View style={Styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={Styles.tinyLogo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* UploadImage */}
        <View style={Styles.contain}>
          <TouchableOpacity onPress={selectDoc}>
            <Image style={Styles.image} source={UploadImage} />
          </TouchableOpacity>
        </View>
        {/* jewelryPicker */}
        <View style={Styles.jewelryPicker}>
          <Picker
            selectedValue={selectedJewelry}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedJewelry(itemValue)
            }>
            <Picker.Item label="Tikka" value="tikka" />
            <Picker.Item label="Haar" value="haar" />
            <Picker.Item label="MS" value="mS" />
            <Picker.Item label="Latkan" value="latkan" />
            <Picker.Item label="Pendal" value="pendal" />
          </Picker>
        </View>
        {/* Description & voiceButton */}
        <View style={Styles.rowContainer}>
          <TextInput
            style={Styles.input}
            placeholder="Description"
            onChangeText={text => setRecognizedText(text)}
            value={recognizedText}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                isListening ? stopListing() : startListing();
              }}
              style={Styles.voiceButton}>
              {isListening ? (
                <Text style={Styles.voiceButtonText}>•••</Text>
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
                selectedValue={selectedTunch}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedTunch(itemValue)
                }>
                <Picker.Item label="50" value="5" />
                <Picker.Item label="75" value="7" />
                <Picker.Item label="90" value="9" />
              </Picker>
            </View>
            <Text style={Styles.tunchView3}>%</Text>
          </View>
          <View style={Styles.tunchView4}>
            <TouchableOpacity style={Styles.tunchView5}>
              <Image
                style={Styles.tinyLogo}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/149/149705.png',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* weight & Size */}
        <View style={Styles.wsContainer}>
          <Text style={Styles.text}>Weight :</Text>
          <TextInput
            style={Styles.input1}
            placeholder="g"
            onChangeText={onChangeWidth}
            value={width}
          />
          <Text style={Styles.text}>Size :</Text>
          <TextInput
            style={Styles.input1}
            placeholder=""
            onChangeText={onChangeSize}
            value={size}
          />
        </View>
        <View style={Styles.wsContainer}>
          <Text style={Styles.text}>Quantity :</Text>
          <TextInput
            style={Styles.input1}
            placeholder=""
            onChangeText={onChangeQuantity}
            value={quantity}
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
          <TouchableOpacity style={Styles.loginButton} onPress={() => {}}>
            <Text style={Styles.loginButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceOrder;
