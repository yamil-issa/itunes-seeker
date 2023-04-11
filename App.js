import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './components/Search';
import MusicDetails from './components/MusicDetails';
import MusicSaved from './components/MusicSaved';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: 'Home' }}
          />
        <Stack.Screen
          name="MusicDetails"
          component={MusicDetails}
          options={{ title: 'Details' }}
          />
         <Stack.Screen
          name="MusicSaved"
          component={MusicSaved}
          options={{ title: 'Ma bibliothèque' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

