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
            <FontAwesome5 name="sign-out-alt" size={30} color="#500" />
            {/* <Text style={styles.logoutButtonText}>Logout</Text> */}
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
          Jeweler's name
        </Text>
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: 32,
    backgroundColor: '#000',
    opacity: 100,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
