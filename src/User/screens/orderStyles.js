import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    // alignContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
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
    borderRadius: 5,
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
    // marginBottom: 5,
  },
  button1: {
    backgroundColor: '#454545',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    // margin: 10,
    width: 200,
  },
  buttonText1: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
  },
  /************ modals ************/
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 20,
  },
  popup: {
    backgroundColor: 'white',
    // marginTop: 0,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupContent: {
    //alignItems: 'center',
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
    borderRadius: 5,
    color: '#000000',
  },
  orderModal: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Gilroy-Regular',
    color: '#000',
    // backgroundColor: '#555',
  },
  input: {
    borderWidth: 1,
    margin: 5,
    width: 137,
    height: 36,
    alignContent: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
  sbContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#454545',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  color: {
    width: 20,
    height: 20,
    marginRight: 2,
    borderRadius: 10,
  },
});
