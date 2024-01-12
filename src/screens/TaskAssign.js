import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import axios from 'axios';

const TaskAssign = ({ route, details, navigation }) => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [karigars, setKarigars] = useState([]);
  const { id } = route.params || {};
  const [karigerId, setKarigerId] = useState('');

  const fetchOrders = async () => {
    try {
      const token = details?.token;
      const response = await axios.get(
        'http://139.59.58.151:8000/workshop/task',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userData = response.data.data[0];
      setOrders(userData.task || []); // Assuming 'task' contains the array of orders
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // console.log(orders);
  }, [orders]);

  const fetchKarigar = async () => {
    // const id = '659a6b88c3cafd83cfd41cf2';
    try {
      const token = details?.token;
      const response = await axios.get(
        `http://139.59.58.151:8000/workshop/kariger/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userData = response.data.data[0];
      setKarigars(userData.kariger || []); // Assuming contains the array of orders
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKarigar();
    // console.log(karigars);
    // console.log(id);
  }, [karigars]);

  const assignTask = async () => {
    try {
      const token = details?.token;
      const orderID = orderId;
      console.log(orderID);
      const karigerID = karigerId;
      console.log(karigerID);

      const updatedTask = {
        order: orderID,
        kariger: karigerID,
      };
      // Make the API call to update the task
      const response = await axios.put(
        'http://139.59.58.151:8000/assign/task',
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Check the response status
      if (response.status === 200) {
        Alert.alert('Your task has been assigned');
        navigation.goBack();
      } else {
        Alert.alert('Failed to update task. Please try again.');
      }
    } catch (error) {
      console.error('Error updating task:', error.message);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

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
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerText}>Workshop_ID_Task_Assign</Text>
        </View>
        <View>
          {/* Orders Picker */}
          <View style={styles.jewelryPicker}>
            <Picker
              selectedValue={orderId} // Set selectedValue to orderId
              onValueChange={(itemValue, itemIndex) => setOrderId(itemValue)}>
              {/* Display dynamically generated Picker.Items based on orders */}
              <Picker.Item
                style={{
                  color: '#000',
                }}
                key="default"
                label="Select Order Id"
                value=""
              />
              {orders.map(order => (
                <Picker.Item
                  style={{
                    color: '#000',
                  }}
                  key={order._id}
                  label={order.orderId}
                  value={order._id}
                />
              ))}
            </Picker>
          </View>
          {/* Kariger Picker */}
          <View style={styles.jewelryPicker}>
            <Picker
              selectedValue={karigerId}
              onValueChange={(itemValue, itemIndex) => setKarigerId(itemValue)}>
              <Picker.Item
                style={{ color: '#000' }}
                key="default"
                label="Select Kariger"
                value=""
              />
              {karigars.map(kariger => (
                <Picker.Item
                  style={{ color: '#000' }}
                  key={kariger._id}
                  label={kariger.name}
                  value={kariger._id}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {/* Submit button */}
      <View style={styles.sbContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={assignTask}>
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

export default connect(mapStateToProps)(TaskAssign);
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
