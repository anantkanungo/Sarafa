import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [cameraPhotos, setCameraPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const choosePhotoFromLibrary = async () => {
    try {
      const images = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        compressImageQuality: 0.5,
        multiple: true,
        includeBase64: true,
        includeExif: true,
      });
      setPhotos(images);
      console.log('Gallery: ', images);
      if (Array.isArray(images) && images.length > 0) {
        setSelectedImages(images.map(img => ({uri: img.path})));
      }
    } catch (error) {
      console.error('Failed to open gallery:', error);
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.5,
    })
      .then(image => {
        console.log(image);
        const imageData = `data:${image.mime};base64,${image.data}`;
        setCameraPhotos(prevPhotos => [...prevPhotos, imageData]);
      })
      .catch(error => {
        console.error('Failed to open camera:', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={takePhotoFromCamera}>
        <Text>Take picture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={choosePhotoFromLibrary}>
        <Text>Gallery</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true}>
        {selectedImages.map((img, index) => (
          <Image key={index} source={img} style={{width: 100, height: 100}} />
        ))}
        {cameraPhotos.map((photo, index) => (
          <Image
            key={index}
            source={{uri: photo}}
            style={{width: 100, height: 100}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CameraScreen;
