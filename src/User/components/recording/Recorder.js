import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {DocumentDirectoryPath} from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  }, []);

  const startRecording = async () => {
    try {
      const path = `${DocumentDirectoryPath}/audio.mp4`;
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      setAudioPath(path);
      console.log(result);
      console.log(path);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setIsRecording(false);
    console.log(result);
  };

  return (
    <View>
      <Text>{isRecording ? 'Recording...' : 'Not recording'}</Text>
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Recorder;
