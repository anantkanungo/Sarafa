import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import UploadImage from '../assets/UploadImage.png';
// https://www.npmjs.com/package/@react-native-picker/picker
import {Picker} from '@react-native-picker/picker';
// https://www.npmjs.com/package/react-native-document-picker
import DocumentPicker from 'react-native-document-picker'

const PlaceOrder = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [desc, onChangeDecs] = useState('');

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
      <View style={styles.contain}>
        <TouchableOpacity onPress={selectDoc}>
          <Image style={styles.image} source={UploadImage} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* <Picker
          selectedValue={selectedLanguage}
          style={{backgroundColor: 'teal', color: 'white', width: '50%'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue, itemIndex)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="React Js" value="React JS" />
          <Picker.Item label="Node JS" value="Node JS" />
           </Picker> */}
      </View>
      {/* <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          </Picker> */}
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={onChangeDecs}
          value={desc}
        />
        <View style={{justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/7175/7175253.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <Text style={{fontSize: 22}}>Weigth :</Text>
        <TextInput
          style={styles.input1}
          placeholder=""
          onChangeText={onChangeDecs}
          value={desc}
        />

        <Text style={{fontSize: 22}}>Size :</Text>
        <TextInput
          style={styles.input1}
          placeholder=""
          onChangeText={onChangeDecs}
          value={desc}
        />
      </View>
    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
    width: 200,
  },
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // marginHorizontal: 10,
  },
  contain: {
    alignItems: 'center',
    margin: 50,
  },
  tinyLogo: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 270,
  },
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 70,
  },
});
