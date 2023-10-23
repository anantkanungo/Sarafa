import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
// import Modal from 'react-native-modal';

const Loading = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
      {/* <Text style={styles.title}>
        Sorry for the interruption
      </Text> */}
      <ActivityIndicator color={'black'} size={40} style={styles.loading} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

// const Loading = ({loading}) => {
//   return (
//     <Modal isVisible={loading} backdropOpacity={0.4} style={styles.modal}>
//       <View style={styles.loading_box}>
//         {/* <Image source={images.loading1} style={styles.loading_image} resizeMode='contain' /> */}
//         <ActivityIndicator color={'primary'} size={30} style={styles.loading} />
//       </View>
//     </Modal>
//   )
// }

// Loading.defaultProps = {
//   loading: false,
// }

export default Loading;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loading_box: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
  },

  loading_image: {
    width: 80,
    height: 80,
    // width: SIZES.width * .8,
    // height: SIZES.width * .8,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 30,
  },

  text: {
    fontWeight: 'regular',
    fontSize: 14,
    color: 'black',
  },

  loading: {
    marginBottom: 10,
  },
});

// import { Image,  StyleSheet, View } from 'react-native'
// import React from 'react'
// import {FONTS, SIZES, images } from '../../constants'

// const Loading = () => {
//     return (
//         <View style={styles.container}>
//             <Image source={images.loading1} style={styles.loadingImg} resizeMode='contain' />
//             {/* <ActivityIndicator color={'black'} size={40} style={{ marginBottom: 50 }} /> */}
//         </View>
//     )
// }

// export default Loading;

// const styles = StyleSheet.create({
//     container: {
//         width: SIZES.width,
//         height: SIZES.height,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: 'white'
//     },

//     loadingImg: {
//         // width: 150,
//         height: 50,
//         // marginBottom: 50,
//     },
// })
