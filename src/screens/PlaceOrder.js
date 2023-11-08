import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
  ScrollView,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import UploadImage from '../assets/UploadImage.png';
// https://www.npmjs.com/package/@react-native-picker/picker
// https://github.com/lawnstarter/react-native-picker-select/issues/402
import { Picker } from '@react-native-picker/picker';
// https://www.npmjs.com/package/react-native-document-picker
import DocumentPicker from 'react-native-document-picker';
import Voice from '@react-native-voice/voice';

const PlaceOrder = ({ navigation }) => {
  const [selectedJewelry, setSelectedJewelry] = useState();
  const [selectedTunch, setSelectedTunch] = useState();
  const [width, onChangeWidth] = useState('');
  const [size, onChangeSize] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
    Voice.onSpeechError = (error) => console.log('onSpeechError: ', error)

    const androidPermissionChecking = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        )
        console.log('androidPermissionChecking - hasPermission:', hasPermission)
        const getService = await Voice.getSpeechRecognitionServices();
        console.log('androidPermissionChecking - getService: ', getService)
      }
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const onSpeechStart = (event) => {
    console.log('Recording onSpeechStart...', event);
  }

  const onSpeechResults = (event) => {
    console.log('Recording onSpeechReesults...', event);
    const text = event.value[0]
    setRecognizedText(text)
  };

  const startListing = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('startListing - error:', error)
    }
  };

  const stopListing = async () => {
    try {
      Voice.removeAllListeners();
      await Voice.stop()
      setIsListening(false)
    } catch (error) {
      console.log('stopListing - error:', error)
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
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

      <ScrollView>
        <View style={styles.contain}>
          <TouchableOpacity onPress={selectDoc}>
            <Image style={styles.image} source={UploadImage} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderWidth: 1,
            marginVertical: 15,
            borderRadius: 5,
          }}>
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

        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={text => setRecognizedText(text)}
            value={recognizedText}
          />
          <View style={{ justifyContent: 'space-evenly' }}>
            <TouchableOpacity
              onPress={() => {
                isListening ? stopListing() : startListing();
              }}>
              {isListening ? (
                <Text style={styles.voiceButtonText}>•••</Text>
              ) : (
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/7175/7175253.png',
                  }}
                  style={styles.tinyLogo}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              flex: 1,
              marginVertical: 15,
              borderRadius: 5,
            }}>
            <Text style={{ fontSize: 22, marginLeft: 10, color: '#000000' }}>
              टंच :
            </Text>
            <View
              style={{
                borderWidth: 1,
                margin: 5,
                flex: 1,
                height: 40,
                justifyContent: 'center',
              }}>
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
            <Text style={{ fontSize: 22, margin: 10, color: '#000000' }}>%</Text>
          </View>
          <View style={{ justifyContent: 'space-evenly', marginLeft: 10 }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 3,
                borderRadius: 5,
              }}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/149/149705.png',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 22, color: '#000000' }}>Weigth :</Text>
          <TextInput
            style={styles.input1}
            placeholder="g"
            onChangeText={onChangeWidth}
            value={width}
          />
          <Text style={{ fontSize: 22, color: '#000000' }}>Size :</Text>
          <TextInput
            style={styles.input1}
            placeholder=""
            onChangeText={onChangeSize}
            value={size}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 22, color: '#000000' }}>Quantity :</Text>
          <TextInput
            style={styles.input1}
            placeholder=""
            onChangeText={onChangeWidth}
            value={width}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            justifyContent: 'space-around',
          }}>
          <Text style={{ fontSize: 22, color: '#000000' }}>
            Urgent Delivery :
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor={isEnabled ? '#000000' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.loginButton} onPress={() => { }}>
            <Text style={styles.loginButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    height: 150,
    width: 150,
  },
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contain: {
    alignItems: 'center',
    margin: 10,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    padding: 10,
    fontSize: 22,
    borderRadius: 5,
  },
  input1: {
    height: 45,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    width: 70,
    fontSize: 18,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#454545',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 130,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
  },
  voiceButtonText: {
    fontSize: 24,
    margin: 5,
    color: '#000000',
    marginHorizontal: 8,
  },
});
