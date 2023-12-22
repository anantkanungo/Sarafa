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
    // marginRight: 23,
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Cirka-Variable',
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
    backgroundColor: '#454545',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  button2: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#454545',
    position: 'absolute',
    top: '50%',
    right: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button3: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#454545',
    position: 'absolute',
    top: '40%',
    right: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
  },
  item: {
    backgroundColor: '#ffffff',
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
    borderRadius: 7,
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
    backgroundColor: '#20b2aa',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtClose: {
    color: 'white',
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
    // backgroundColor: '#35A7FF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderRadius: 5,
  },
  tick: {
    // fontSize: 20,
    // color: '#fff',
    width: 30,
    height: 30,
  },
  btn: {
    margin: 10,
    position: 'absolute',
    top: '75%',
    borderWidth: 1,
    borderColor: '#454545',
    padding: 5,
    borderRadius: 5,
  },
  category: {
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    color: '#000',
    fontSize: 22,
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
    borderRadius: 5,
    color: '#000000',
    borderColor: '#000',
  },
});
