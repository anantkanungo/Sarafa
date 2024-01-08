import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d2c4'
  },
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
    height: 60,
    flex: 1,
    fontSize: 32,
    textAlign: 'center',
    marginLeft: -25,
    fontFamily: 'Cirka-Variable',
    color: '',
  },
  bottomView: {
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 38,
    marginTop: 12,
    // marginBottom: 4,
    color: '#79443B',
    textAlign: 'center',
    fontFamily: 'Cirka-Variable',
  },
  loginText1: {
    fontSize: 28,
    // marginTop: 12,
    marginBottom: 15,
    color: '#79443B',
    textAlign: 'center',
    fontFamily: 'Cirka-Variable',
  },
  inputView: {
    height: 50,
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
    fontSize: 30,
    fontFamily: 'Gilroy-Regular',
  },
});
