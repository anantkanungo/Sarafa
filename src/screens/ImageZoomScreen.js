import React from 'react';
import {View, StyleSheet} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageZoomScreen = ({route, navigation}) => {
  const {imageUrl} = route.params;

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={[{url: imageUrl}]}
        enableSwipeDown
        onSwipeDown={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImageZoomScreen;
