import {React, useState, useEffect} from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default MusicSaved = ({ navigation, route }) => {
  const [myMusic, setMyMusic] = useState([]);

  useEffect(() => {
    const loadMyMusic = async () => {
      try {
        const value = await AsyncStorage.getItem('myMusicList');
        if (value !== null) {
          setMyMusic(JSON.parse(value));
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadMyMusic();
  }, []);

  const handleRemoveItem = async (item) => {
    const newMyMusic = myMusic.filter(m => m.trackId !== item.trackId);
    try {
      await AsyncStorage.setItem('myMusicList', JSON.stringify(newMyMusic));
      setMyMusic(newMyMusic);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.main_container}>
      {myMusic.length > 0 ? (
        <FlatList
          data={myMusic}
          keyExtractor={(item) => item.trackId}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('MusicDetails', { item })}>
              <View style={styles.my_music_item}>
              <Image
                       source={{ uri: item.artworkUrl100 }}
                       style={{ width: 100, height: 100 }}
                     />
                <Text style={styles.musicInfo}>{item.artistName} - {item.trackName}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                  <Text style={styles.remove_button}>Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No music added yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 50,
  },

  musicInfo: {
    width: 220
  },
  
  my_music_item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  remove_button: {
    color: 'red',
  },
  
});
