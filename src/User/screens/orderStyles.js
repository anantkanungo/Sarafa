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
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',
  },
  order: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    borderWidth: 1,
    padding: 3.5,
    borderRadius: 5,
    color: '#000000',
  },
  orderModal: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#000',
    // backgroundColor: '#555',
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
  sbContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
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
