import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#e1d2c4',
  },
  separator: {
    marginVertical: 5,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 4,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8C92AC',
    padding: 10,
  },
  cardHeader: {
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  cardImage: {
    flex: 1,
    height: 'auto',
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#000000',
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    fontFamily: 'Gilroy-Regular',
    color: '#000',
    textTransform: 'capitalize',
  },
  order: {
    fontSize: 13,
    marginTop: 5,
    fontFamily: 'Gilroy-Regular',
    color: '#000',
    // color: '#808080',
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
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
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Cirka-Variable',
  },
  /************ modals ************/
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 20,
  },
  popup: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  popupContent: {
    margin: 5,
    height: 'auto',
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleModal: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
    alignSelf: 'center',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    fontFamily: 'Gilroy-Regular',
    borderWidth: 1,
    padding: 3.5,
    color: '#000000',
  },
  orderModal: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Gilroy-Regular',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    margin: 5,
    flex: 1,
    // width: 137,
    // height: 36,
    alignContent: 'center',
    justifyContent: 'center',
    color: '#000000',
    // marginHorizontal: 10,
    fontFamily: 'Gilroy-Regular',
  },
  sbContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: 'Gilroy-Regular',
    color: '#fff',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  color: {
    width: 20,
    height: 20,
    marginRight: 2,
    borderRadius: 10,
  },
  pikerLabel: {
    color: '#000', 
    backgroundColor: '#fff',
    fontFamily: 'Gilroy-Regular',
  },
  button1: {
    borderWidth: 1,
    borderColor: '#000',
    position: 'absolute',
    padding: 10,
    bottom: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#000',
  },
  buttonText1: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Gilroy-Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    marginVertical: 20,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
