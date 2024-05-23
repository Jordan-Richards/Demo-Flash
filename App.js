import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/Components/themeContext'; // Adjust the path as needed
import HomeScreen from './src/Screens/HomeScreen';
import FlashcardScreen from './src/Screens/FlashcardScreen';
import LoginScreen from './src/Screens/LoginScreen';
import PreviousSessionsScreen from './src/Screens/PreviousSessionsScreen';
import SettingsScreen from './src/Screens/SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
<Stack.Screen name="Flashcards" component={FlashcardScreen} options={{ headerShown: false }} />
<Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
<Stack.Screen name="PreviousSessions" component={PreviousSessionsScreen} options={{ headerShown: false }}/>
</Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
