import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d2c4',
  },
  // image: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: null,
  // },
  image: {
    top: '20%',
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    width: 150,
  },

  wrapper: {
    width: '85%',
  },
  input: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Cirka-Variable',
    // fontFamily: 'Gilroy-Regular',
    textAlign: 'center',
    color: '#000000',
  },
  bottomView: {
    // backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 34,
    // fontFamily: 'Gilroy-Regular',
    fontFamily: 'Cirka-Variable',
    // marginTop: 12,
    // marginBottom: 4,
    color: '#79443B',
    textAlign: 'center',
  },
  loginText1: {
    fontSize: 24,
    // fontFamily: 'Gilroy-Regular',
    fontFamily: 'Cirka-Variable',
    // marginTop: 12,
    marginBottom: 4,
    color: '#79443B',
    textAlign: 'center',
  },
  inputView: {
    // height: 50,
    padding: 0,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#C19A6B',
    paddingVertical: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
  },
});
