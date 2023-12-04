import React, {useState} from 'react';
import {View, Image, TouchableOpacity, FlatList, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const takePicture = async () => {
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
        setImages([...images, imageData]);
      })
      .catch(error => {
        console.error('Failed to open camera:', error);
      });
  };

  const selectImage = index => {
    let newSelectedImages = [...selectedImages];
    if (newSelectedImages.includes(index)) {
      newSelectedImages = newSelectedImages.filter(i => i !== index);
    } else {
      newSelectedImages.push(index);
    }
    setSelectedImages(newSelectedImages);
  };

  return (
    <View>
      <TouchableOpacity onPress={takePicture}>
        <Text>Take picture</Text>
      </TouchableOpacity>
      <FlatList
        data={images}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => selectImage(index)}>
            <Image
              style={{
                width: 100,
                height: 100,
                opacity: selectedImages.includes(index) ? 0.5 : 1,
              }}
              source={{uri: item}}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CameraScreen;
