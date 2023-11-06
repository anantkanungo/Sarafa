import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import UploadImage from '../assets/UploadImage.png';
// https://www.npmjs.com/package/@react-native-picker/picker
// https://github.com/lawnstarter/react-native-picker-select/issues/402
import {Picker} from '@react-native-picker/picker';
// https://www.npmjs.com/package/react-native-document-picker
import DocumentPicker from 'react-native-document-picker';

const PlaceOrder = ({navigation}) => {
  const [selectedJewelry, setSelectedJewelry] = useState();
  const [selectedTunch, setSelectedTunch] = useState();
  const [desc, onChangeDecs] = useState('');
  const [width, onChangeWidth] = useState('');
  const [size, onChangeSize] = useState('');
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
  const [quantity, onChangeQuantity] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isListening, setIsListening] = useState(false);
<<<<<<< HEAD
=======
=======
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e

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
  return (
<<<<<<< HEAD
    // main container
=======
<<<<<<< HEAD
    // main container
=======
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
    <View style={styles.container}>
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
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
      <ScrollView>
        <View style={styles.contain}>
          <TouchableOpacity onPress={selectDoc}>
            <Image style={styles.image} source={UploadImage} />
          </TouchableOpacity>
        </View>
<<<<<<< HEAD
=======
<<<<<<< HEAD

>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
        <View
          style={{
            borderWidth: 1,
            marginVertical: 15,
            borderRadius: 5,
<<<<<<< HEAD
          }}>
=======
=======
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
        <View
          style={{
            borderWidth: 1,
            margin: 10,
<<<<<<< HEAD
=======
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
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
<<<<<<< HEAD
        <View
          style={{
            flexDirection: 'row',
=======
<<<<<<< HEAD

        <View
          style={{
            flexDirection: 'row',
=======
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
<<<<<<< HEAD
=======
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
>>>>>>> 8cb5f2abe5f2fdc473043cbb9d5aac8d8516d42e
          }}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={onChangeDecs}
            value={desc}
          />
          <View style={{justifyContent: 'space-evenly'}}>
<<<<<<< HEAD
            <TouchableOpacity
              onPress={() => setIsListening(!isListening)}
              style={styles.voiceButton}>
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
            <Text style={{fontSize: 22, marginLeft: 10, color: '#000000'}}>
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
            <Text style={{fontSize: 22, margin: 10, color: '#000000'}}>%</Text>
          </View>
          <View style={{justifyContent: 'space-evenly', marginLeft: 10}}>
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
=======
            <TouchableOpacity style={{borderWidth: 1, padding: 3}}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/7175/7175253.png',
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
<<<<<<< HEAD

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
=======
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            borderWidth: 1,
          }}>
          <Text style={{fontSize: 22, marginLeft: 10, color: '#000000'}}>टंच :</Text>
          <View
            style={{
              borderWidth: 1,
              margin: 5,
              width: '40%',
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
          <Text style={{fontSize: 22, color: '#000000'}}>%</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
          <Text style={{fontSize: 22, color: '#000000'}}>Weigth :</Text>
          <TextInput
            style={styles.input1}
            placeholder="g"
            onChangeText={onChangeWidth}
            value={width}
          />
<<<<<<< HEAD
=======

>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
          <Text style={{fontSize: 22, color: '#000000'}}>Size :</Text>
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
<<<<<<< HEAD
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 22, color: '#000000'}}>Quantity :</Text>
          <TextInput
            style={styles.input1}
            placeholder=""
            onChangeText={onChangeQuantity}
            value={quantity}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            justifyContent: 'space-around',
          }}>
          <Text style={{fontSize: 22, color: '#000000'}}>
            Urgent Delivery :
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={isEnabled ? '#000000' : '#f4f3f4'}
=======
            margin: 10,
            justifyContent: 'space-around',
          }}>
          <Text style={{fontSize: 22, color: '#000000'}}>Urgent Delivery :</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
          />
        </View>
<<<<<<< HEAD

=======
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
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
<<<<<<< HEAD
    marginHorizontal: 10,
  },
  image: {
    height: 150,
    width: 150,
=======
  },
  image: {
    height: 200,
    width: 200,
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
  },
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
<<<<<<< HEAD
=======
    marginHorizontal: 10,
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
  },
  contain: {
    alignItems: 'center',
    margin: 10,
  },
  tinyLogo: {
<<<<<<< HEAD
    width: 40,
=======
    width: 30,
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
    height: 40,
    resizeMode: 'contain',
  },
  input: {
<<<<<<< HEAD
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
=======
    height: 50,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 285,
    fontSize: 22,
  },
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 70,
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
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
<<<<<<< HEAD
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
    marginHorizontal: 8,
    color: '#000000',
  },
=======
>>>>>>> eca87f322b93767119684e4ba0e1ba24f6c6b538
});
