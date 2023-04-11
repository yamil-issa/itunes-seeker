import {React, useState, useEffect} from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'




export default Search = ({navigation, route}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
      }

    const handleSearchSubmit = () => {
    fetch(`https://itunes.apple.com/search?term=${searchQuery}`)
        .then(response => response.json())
        .then(data => setSearchResults(data.results))
        .catch(error => console.error(error));
    }

    const handleItemPress = (item) => {
        navigation.navigate('MusicDetails', { item });
      };

    const handleButtonPress = () => {
        navigation.navigate('MusicSaved');
    }

  return (
    <View style={styles.main_container}>
               <TouchableOpacity style={styles.navigateButton} onPress={handleButtonPress}><Text style={{color: '#fff'}}>Ma bibliothèque</Text></TouchableOpacity>
               <TextInput style={styles.textinput} placeholder='Rechecher'
                     onChangeText={handleSearchQueryChange}
                     value={searchQuery}
               />
               <TouchableOpacity style={styles.button} onPress={handleSearchSubmit}><Text style={styles.buttonText}>Rechercher</Text></TouchableOpacity>

               <FlatList
                 data={searchResults}
                 keyExtractor={(item) => item.trackId}  
                 renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleItemPress(item)}>
                   <View style={styles.musicItem}>
                     <Image
                       source={{ uri: item.artworkUrl100 }}
                       style={{ width: 100, height: 100 }}
                     />
                     <Text style={{color: '#000', width: 220}}>{item.artistName} - {item.trackName}</Text>
                   </View>
                   </TouchableOpacity>
                 )}
             />
             
           </View>
  )
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 10
       
    },

    navigateButton: {
        marginBottom: 20,
        marginLeft: 250,
        width: 150,
        textAlign: 'center',
        backgroundColor: '#1E6DF7',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textinput: { 
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    musicItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginBottom: 10,
        alignItems: 'center'

    },

    button: {
        height: 30,
        borderRadius: 7,
        width: 250,
        marginBottom: 20,
        marginLeft: '20%',
        marginTop: 5,
        backgroundColor: '#5990F0',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: '#000',
        fontSize: 15,
        textAlign: 'center',

    }
})
