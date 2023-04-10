import {React, useState, useEffect} from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default MusicDetails = ({ route, navigation }) => {
    const [isAdded, setIsAdded] = useState(false); // state pour indiquer si l'élément a été ajouté à la base de données

    const { item } = route.params;

    const [rating, setRating] = useState(0);

    const handleRatingPress = async (value) => {
      // Store the rating in AsyncStorage
      try {
        await AsyncStorage.setItem(`rating_${item.trackId}`, value.toString());
      } catch (error) {
        console.log(error);
      }
      // Update the rating state variable
      setRating(value);
    };

    const getStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <TouchableOpacity key={i} onPress={() => handleRatingPress(i)}>
              <Image
                source={
                  rating >= i
                    ? require('../assets/filled-star.png')
                    : require('../assets/empty-star.png')
                }
                style={styles.star}
              />
            </TouchableOpacity>
          );
        }
        return stars;
      };

    const handleAddItem = async () => {
        try {
          const existingData = await AsyncStorage.getItem('myMusicList'); // récupère les données existantes
          let newData = [];
    
          if (existingData !== null) {
            newData = JSON.parse(existingData); // parse les données existantes en JSON
          }
    
          // Vérifie si l'élément est déjà présent dans la base de données
          const isItemAlreadyAdded = newData.find((data) => data.trackId === item.trackId);
    
          if (!isItemAlreadyAdded) {
            newData.push(item);
            await AsyncStorage.setItem('myMusicList', JSON.stringify(newData)); // stocke les données mises à jour
            setIsAdded(true); // met à jour le state pour indiquer que l'élément a été ajouté
          } else {
            setIsAdded(true); // met à jour le state même si l'élément est déjà présent dans la base de données pour donner un feedback à l'utilisateur
          }
        } catch (error) {
          console.log(error);
        }
      };
   
    return (
      <View style={styles.container}>
        <Text>{item.artistName} - {item.trackName}</Text>
        <Image
          source={{ uri: item.artworkUrl100 }}
          style={styles.image}
        />
        <Text style={styles.text}>{item.collectionName}</Text>
        <Text style={styles.text}>{item.primaryGenreName}</Text>
        <Text style={styles.label}>Note:</Text>
        <View style={styles.stars}>{getStars()}</View>
        {!isAdded ? (
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.addedText}>Cet élément a été ajouté à votre liste de musique.</Text>
      )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 20,
    },
    text: {
      fontSize: 16,
      marginVertical: 10,
    },
    button: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    addedText: {
      color: '#5990F0',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
      },
    stars: {
        flexDirection: 'row',
        marginTop: 10,
      },
      star: {
        width: 30,
        height: 30,
        marginRight: 5,
      },
  });
  
