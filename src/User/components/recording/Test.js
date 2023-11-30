import React, {useState} from 'react';
import {View, Button} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import Permissions from 'react-native-permissions';

const RecorderPlayerComponent = () => {
  const [recorderPlayer, setRecorderPlayer] = useState(
    new AudioRecorderPlayer(),
  );
  const [audioPath, setAudioPath] = useState('');

  const startRecording = async () => {
    try {
      const result = await Permissions.requestMultiple([
        'microphone',
        'storage',
      ]);
      if (
        result.microphone === 'authorized' &&
        result.storage === 'authorized'
      ) {
        const path = RNFetchBlob.fs.dirs.DocumentDir + '/test.mp3';
        await recorderPlayer.startRecorder(path);
        setAudioPath(path);
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    const result = await recorderPlayer.stopRecorder();
    console.log(result);
  };

  const startPlayback = async () => {
    const result = await recorderPlayer.startPlayer(audioPath);
    console.log(result);
  };

  const stopPlayback = async () => {
    const result = await recorderPlayer.stopPlayer();
    console.log(result);
  };

  return (
    <View>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
      <Button title="Start Playback" onPress={startPlayback} />
      <Button title="Stop Playback" onPress={stopPlayback} />
    </View>
  );
};

export default RecorderPlayerComponent;
