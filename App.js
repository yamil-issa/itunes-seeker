import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './components/Search';
import MusicDetails from './components/MusicDetails';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: 'iTunes Search' }}
        />
        <Stack.Screen
          name="MusicDetails"
          component={MusicDetails}
          options={{ title: 'Music Details' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

