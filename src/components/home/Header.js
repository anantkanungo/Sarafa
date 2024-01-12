import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import BackgroundImage from '../../assets/IMG_HEADER.jpg';
import {connect} from 'react-redux';
import {customerLogout} from '../../reduxThunk/action/authAction';

const Header = ({customerLogout, details}) => {
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
              marginBottom: 10,
              fontFamily: 'Gilroy-Regular',
            }}>
            Hello,
          </Text>
          <TouchableOpacity onPress={() => customerLogout()}>
            <Image
              src="https://img.icons8.com/material-outlined/exit.png"
              style={{width: 30, height: 30, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 24,
              color: 'white',
              fontFamily: 'Gilroy-Regular',
            }}>
            {details?.username}
          </Text>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

const mapDispatchToProps = {
  customerLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

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
    fontSize: 11,
    fontFamily: 'Gilroy-Regular',
  },
});
