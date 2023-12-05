import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 6,
  },
  tinyLogo: {
    width: 25,
    height: 40,
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 22,
    color: '#000000',
  },
  // header
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
    // borderRadius: 5,
    color: '#000000',
  },
  // Description & voiceButton
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    fontSize: 22,
    borderRadius: 5,
    color: '#000000',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    borderWidth: 1,
    padding: 3.5,
    borderRadius: 5,
    color: '#000000',
  },
  voiceButtonText: {
    fontSize: 24,
    margin: 5,
    color: '#000000',
    marginHorizontal: 8,
  },
  // Tunch
  tunchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    flex: 1,
    marginTop: 15,
    borderRadius: 5,
    color: '#000000',
  },
  tunchView1: {
    fontSize: 28,
    marginHorizontal: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  tunchView2: {
    borderWidth: 1,
    margin: 5,
    width: 137,
    height: 36,
    alignContent: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
  tunchView4: {
    marginLeft: 10,
  },
  tunchView5: {
    marginTop: 16,
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
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
    borderRadius: 5,
    color: '#000000',
    borderColor: '#000',
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
    backgroundColor: '#454545',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 130,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
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
    borderRadius: 20,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#F194',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },
});
