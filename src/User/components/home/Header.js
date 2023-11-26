import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BackgroundImage from '../../../assets/IMG_HEADER.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {customerLogout} from '../../../reduxThunk/Action';

const Header = ({customerLogout}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={BackgroundImage}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Hello, UserName
          </Text>
          <TouchableOpacity onPress={() => customerLogout()}>
            <FontAwesome5 name="sign-out-alt" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
            Jeweler's name
          </Text>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapDispatchToProps = {
  customerLogout,
};

export default connect(null, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: 22,
    backgroundColor: '#7788',
    opacity: 0.8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
