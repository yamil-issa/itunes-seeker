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
                <TouchableOpacity style={styles.navigateButton} onPress={handleButtonPress}><Text style={{color: '#fff'}}>Mes Musiques</Text></TouchableOpacity>
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
                   <View>
                     <Text>{item.artistName} - {item.trackName}</Text>
                     <Image
                       source={{ uri: item.artworkUrl100 }}
                       style={{ width: 100, height: 100 }}
                     />
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
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
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
        color: 'white',
        fontSize: 15,
        textAlign: 'center',

    }
})
