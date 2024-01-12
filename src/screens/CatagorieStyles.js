import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  /* header */
  tinyLogo: {
    width: 25,
    height: 40,
    resizeMode: 'contain',
  },
  // header
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  headerText: {
    textTransform: 'capitalize',
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
  },
  button1: {
    backgroundColor: '#454545',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    width: 150,
  },
  sbContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
  },
  item: {
    backgroundColor: '#e1d2c4',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },

  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 40,
    marginHorizontal: 10,
    elevation: 5,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 20,
  },
  popupContent: {
    marginTop: 5,
    marginHorizontal: 5,
    height: 'auto',
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-evenly',
    margin: 5,
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    // flex: 1,
    width: '45%',
    height: 40,
    backgroundColor: '#000',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtClose: {
    color: 'white',
    fontFamily: 'Gilroy-Regular',
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
  },
  clearButton: {
    marginLeft: 10,
  },
  txt: {
    textAlign: 'center',
    padding: 2,
    fontFamily: 'Gilroy-Regular',
  },
  innerItem: {
    flex: 1,
    // backgroundColor: '#7e9e0b',
  },
  tickContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tick: {
    width: 30,
    height: 30,
  },
  btn: {
    margin: 10,
    position: 'absolute',
    top: '75%',
    borderWidth: 1,
    borderColor: '#454545',
    padding: 3,
    backgroundColor: '#000',
  },
  category: {
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    color: '#000',
    fontSize: 22,
    textTransform: 'capitalize'
  },
  textModal: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
    marginTop: 10,
    color: '#000',
  },
  input: {
    margin: 1,
    borderWidth: 1,
    paddingHorizontal: 5,
    padding: 0,
    color: '#000000',
    borderColor: '#000',
  },
  sliderContainer: {
    alignSelf: 'center',
  },
});
