import React from 'react';
import {View, StyleSheet} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ScreenZoom = ({route, navigation}) => {
  const {imageUrl} = route.params;

  const imageUrls = imageUrl ? [{url: imageUrl}] : [];

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={imageUrls}
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

export default ScreenZoom;
