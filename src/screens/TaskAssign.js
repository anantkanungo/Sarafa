import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const TaskAssign = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerText}>Workshop_ID_Task_Assign</Text>
        </View>
        <View>
          {/* OdersPicker */}
          <View style={styles.jewelryPicker}>
            <Picker
              // selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item
                style={{
                  color: '#000',
                }}
                label="Select Order"
                value="ring"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Order_ID"
                value="earring"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Order_ID_2"
                value="bangle"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Order_ID_3"
                value="chain"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Order_ID_4"
                value="necklace"
              />
            </Picker>
          </View>
          {/* WorkshopPicker */}
          <View style={styles.jewelryPicker}>
            <Picker
              // selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item
                style={{color: '#000'}}
                label="Workshop_ID_1"
                value="ring"
              />
              {/* <Picker.Item
                style={{ color: '#000' }}
                label="Workshop_ID_1"
                value="earring"
              /> */}
            </Picker>
          </View>
          {/* KarigarPicker */}
          <View style={styles.jewelryPicker}>
            <Picker
              // selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item
                style={{color: '#000'}}
                label="Select Karigar"
                value="ring"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Karigar_ID_1"
                value="earring"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Karigar_ID_2"
                value="bangle"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Karigar_ID_3"
                value="chain"
              />
              <Picker.Item
                style={{color: '#000'}}
                label="Karigar_ID_4"
                value="necklace"
              />
            </Picker>
          </View>
        </View>
      </View>

      {/* Submit button */}

      <View style={styles.sbContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Assign Karigar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

export default TaskAssign;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 6,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row',
    color: '#E5E4E2',
  },
  text: {
    fontSize: 22,
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
  },
  // header
  header_container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  // jewelryPicker
  jewelryPicker: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
    backgroundColor: '#E5E4E2',
    fontFamily: 'Gilroy-Regular',
  },

  // Assign button
  sbContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },

  loginButton: {
    backgroundColor: '#454545',
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 3,
    width: 180,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
  },
  headerText: {
    fontSize: 25,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Gilroy-Regular',
    marginRight: 15,
    padding: 5,
  },
});
