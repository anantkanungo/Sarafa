import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {connect} from 'react-redux';

const OrderPage = ({details, route, navigation}) => {
  const [audioPlayer, setAudioPlayer] = useState();
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const {selectedTask} = route.params;

  // const taskComplete = () => {
  //   Alert.alert('Your task is complete');
  // };

  const taskComplete = async () => {
    try {
      const token = details?.token;

      // Update the statusIs field to "completed"
      const updatedTask = {...selectedTask, statusIs: 'completed'};

      // Make the API call to update the task
      const response = await axios.put(
        'http://139.59.58.151:8000/update/task',
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Check the response status
      if (response.status === 200) {
        Alert.alert('Your task is complete');
        // You may want to update your local state or Redux store with the updated task information here
      } else {
        Alert.alert('Failed to update task. Please try again.');
      }
    } catch (error) {
      console.error('Error updating task:', error.message);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

  // Audio Player
  const startAudio = async () => {
    let url = audioURL;

    if (Array.isArray(url)) {
      console.error('url is an array:', url);
      url = url[0];
    }

    // console.log('Audio URL:', url);
    const result = await audioPlayer.startPlayer(url);
    setIsPlaying(true);
    console.log(result);
  };

  const stopAudio = async () => {
    const result = await audioPlayer.stopPlayer();
    setIsPlaying(false);
    console.log(result);
  };

  useEffect(() => {
    setAudioPlayer(new AudioRecorderPlayer());

    const fetchAudioURL = async () => {
      // Assuming the audio data is stored in the selectedTask object
      const audioData = selectedTask.audio;

      if (Array.isArray(audioData) && audioData.length > 0) {
        // If there are multiple audio files, you can choose the first one
        const firstAudioURL = audioData[0];
        setAudioURL(firstAudioURL);
      }
    };

    fetchAudioURL();

    return () => {
      stopAudio();
      if (audioPlayer) {
        audioPlayer.destroy();
      }
    };
  }, [selectedTask]);

  return (
    <View style={styles.container}>
      {/* Header */}
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
      <ScrollView>
        <FlatList
          data={selectedTask?.image} // Assuming selectedTask.images is an array of image URIs
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ImageZoom', {
                  imageUrl: item,
                })
              }>
              <Image style={styles.image} source={{uri: item}} />
            </TouchableOpacity>
          )}
          horizontal
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.title}>{selectedTask.category}</Text>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={styles.description}>Audio: </Text>
            {Array.isArray(audioURL) && audioURL.length > 0 ? (
              <TouchableOpacity
                onPress={isPlaying ? stopAudio : startAudio}
                style={styles.voiceButton}>
                {isPlaying ? (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/709/709714.png',
                    }}
                    style={styles.tinyLogo}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/109/109197.png',
                    }}
                    style={styles.tinyLogo}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <Text style={styles.description}>No Audio Available</Text>
            )}
          </View>
          <Text style={styles.description}>Size: {selectedTask.size}</Text>
          <Text style={styles.description}>
            Quantity: {selectedTask.quantity}
          </Text>
          <Text style={styles.description}>Tunch: {selectedTask.tunch}</Text>
          <Text style={styles.description}>Weight: {selectedTask.weight}</Text>
          <Text style={styles.description}>
            Status: {selectedTask.statusIs}
          </Text>
          <Text style={styles.description}>
            Urgent: {`${selectedTask.urgent}`}
          </Text>
          <Text style={styles.description}>
            description: {selectedTask.description}
          </Text>
          <Text style={styles.description}>
            Kariger: {selectedTask.kariger}
          </Text>
          <Text style={styles.description}>
            Workshop: {selectedTask.workshop}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.sbContainer}>
        <TouchableOpacity onPress={taskComplete}>
          <Text style={styles.SubmitButtonText}>Task Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

export default connect(mapStateToProps)(OrderPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: '#DBD7D2',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 30,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Gilroy-Regular',
    color: 'black',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 19,
    color: 'black',
    fontFamily: 'Gilroy-Regular',
  },
  sbContainer: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  SubmitButtonText: {
    color: 'white',
    backgroundColor: 'black',
    alignSelf: 'center',
    fontSize: 18,
    padding: 10,
    fontFamily: 'Gilroy-Regular',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    fontFamily: 'Gilroy-Regular',
    borderWidth: 1,
    padding: 3.5,
    color: '#000000',
  },
});
