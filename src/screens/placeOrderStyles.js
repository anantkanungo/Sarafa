import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e1d2c4'
  },
  tinyLogo: {
    width: 25,
    height: 40,
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: '#000000',
  },
  // header
  header_container: {
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
  },
  // UploadImage
  contain: {
    alignItems: 'center',
    margin: 10,
  },
  // jewelryPicker
  jewelryPicker: {
    borderWidth: 1,
    marginBottom: 15,
    color: '#000000',
    marginHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
    fontFamily: 'Gilroy-Regular',
  },
  // Description & voiceButton
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    color: '#000000',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    fontFamily: 'Gilroy-Regular',
    borderWidth: 1,
    padding: 3.5,
    color: '#000000',
  },
  voiceButtonText: {
    fontSize: 24,
    margin: 5,
    color: '#000000',
    marginHorizontal: 8,
    fontFamily: 'Gilroy-Regular',
  },
  // Tunch
  tunchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    flex: 1,
    marginTop: 15,
    color: '#000000',
  },
  tunchView1: {
    fontSize: 22,
    marginHorizontal: 5,
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
  },
  tunchView2: {
    borderWidth: 1,
    margin: 5,
    width: 137,
    height: 36,
    alignContent: 'center',
    justifyContent: 'center',
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
  },
  tunchView4: {
    marginLeft: 10,
  },
  tunchView5: {
    marginTop: 16,
    borderWidth: 1,
    padding: 3,
    color: '#000000',
  },
  // weight & Size
  wsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input1: {
    height: 45,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    width: 75,
    fontSize: 18,
    color: '#000000',
    borderColor: '#000',
    fontFamily: 'Gilroy-Regular',
  },
  // Switch
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-around',
  },
  // Submit button
  sbContainer: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    marginTop: 10,
    width: 130,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: '#000',
    fontFamily: 'Gilroy-Regular',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    fontSize: 22,
    color: '#000',
  },
  pikerLabel: {
    color: '#000',
    backgroundColor: '#fff',
    fontFamily: 'Gilroy-Regular',
  },
});
