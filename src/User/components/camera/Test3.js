import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import ImageEditor from 'react-native-image-editor';
import {Camera, getAvailableCameraDevices} from 'react-native-vision-camera';
import {request, PERMISSIONS} from 'react-native-permissions';

const Test3 = () => {
  const [photos, setPhotos] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Request camera permission
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        if (result === 'granted') {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    };

    requestCameraPermission();
  }, []);

  // Check available camera devices
  const checkCameraDevices = async () => {
    try {
      const devices = await getAvailableCameraDevices();
      console.log('Available camera devices:', devices);
    } catch (error) {
      console.error('Error getting available camera devices:', error);
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePhoto({
        quality: 0.5,
        base64: true,
      });

      setPhotos([...photos, {uri: `data:image/jpeg;base64,${photo.base64}`}]);
      closeCamera();
    }
  };

  const pickImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // ImagePicker.showImagePicker(options, response => {
    //   if (!response.didCancel) {
    //     const {uri} = response;
    //     setPhotos([...photos, {uri}]);
    //   }
    // });
  };

  // const editPhoto = async uri => {
  //   // Example of cropping the image
  //   const editedPhoto = await ImageEditor.cropImage(uri, {
  //     offset: {x: 0, y: 0},
  //     size: {width: 200, height: 200},
  //   });

  //   setPhotos([...photos, {uri: `file://${editedPhoto}`}]);
  // };

  const renderPhotoItem = ({item}) => (
    <TouchableOpacity>
      <Image source={{uri: item.uri}} style={{width: 100, height: 100}} />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPhotoItem}
        horizontal
      />

      <Button title="Open Camera" onPress={openCamera} />

      {isCameraOpen && (
        <Camera
          style={{flex: 1, width: '100%'}}
          ref={ref => {
            cameraRef = ref;
          }}>
          <View
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            <Button title="Take Photo" onPress={takePhoto} />
            <Button title="Close Camera" onPress={closeCamera} />
          </View>
        </Camera>
      )}

      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Check Camera Devices" onPress={checkCameraDevices} />
    </View>
  );
};

export default Test3;
