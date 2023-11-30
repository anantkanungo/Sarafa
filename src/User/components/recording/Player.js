import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DocumentDirectoryPath} from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const Player = ({audioPath}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const startPlaying = async () => {
    try {
      const path = `${DocumentDirectoryPath}/${audioPath}`;
      const exists = await audioRecorderPlayer.fs.exists(path);

      if (exists) {
        await audioRecorderPlayer.startPlayer(path);
        setIsPlaying(true);
      } else {
        console.warn('File does not exist at path:', path);
      }
    } catch (error) {
      console.error('Error starting playback:', error);
    }
  };

  const stopPlaying = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error stopping playback:', error);
    }
  };

  return (
    <View>
      <Text>{isPlaying ? 'Playing...' : 'Not playing'}</Text>
      <TouchableOpacity onPress={isPlaying ? stopPlaying : startPlaying}>
        <Text>{isPlaying ? 'Stop Playing' : 'Start Playing'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Player;
