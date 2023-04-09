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

  return (
    <View style={styles.main_container}>
               <TextInput style={styles.textinput} placeholder='Rechecher'
                     onChangeText={handleSearchQueryChange}
                     value={searchQuery}
               />
               <Button style={styles.button} title='Rechercher' onPress={handleSearchSubmit}/>

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
    textinput: { 
        marginLeft: 5,
        marginRight: 5,
        height: 50, 
        borderColor: '#000', 
        borderRadius: 20,
        borderWidth: 2, 
        paddingLeft: 5
    },

    button: {
        borderRadius: 8,
        width: 9,

    }
})
