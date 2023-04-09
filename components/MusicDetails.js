import {React, useState, useEffect} from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'



export default MusicDetails = ({ route, navigation }) => {
    const { item } = route.params;
    // Display more details about the item
    return (
      <View>
        <Text>{item.artistName} - {item.trackName}</Text>
        <Image
          source={{ uri: item.artworkUrl100 }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{item.collectionName}</Text>
        <Text>{item.primaryGenreName}</Text>
        {/* Add more details here */}
      </View>
    );
  };
