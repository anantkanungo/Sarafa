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
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  input1: {
    // height: 35,
    margin: 1,
    borderWidth: 1,
    paddingHorizontal: 5,
    padding: 0,
    // width: 75,
    // fontSize: 1,
    // borderRadius: 5,
    color: '#000000',
    borderColor: '#000',
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
    // alignContent: 'center',
    borderWidth: 1,
    borderColor: '#8C92AC',
    padding: 10,
  },
  cardHeader: {
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  cardImage: {
    // flex: 1,
    height: 'auto',
    width: '40%',
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#000000',
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    color: '#000',
    textTransform: 'capitalize',
    fontFamily: 'Gilroy-Regular',
  },
  order: {
    fontSize: 13,
    marginTop: 5,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
  button1: {
    borderWidth: 1,
    borderColor: '#000',
    position: 'absolute',
    padding: 10,
    // marginBottom: 5,
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
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
  },
});
