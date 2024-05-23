import 'react-native-gesture-handler'; // Ensure gesture handler is imported first
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import navigation container
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import the correct function for stack navigator
import axios from 'axios'; // Import axios for making HTTP requests
axios.defaults.baseURL = 'http://192.168.88.254:8081';

// Import your screens, ensure these are default exports in their respective files
import HomeScreen from './src/Screens/HomeScreen';
import FlashcardScreen from './src/Screens/FlashcardScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import LoginScreen from './src/Screens/LoginScreen';
import PreviousSessionsScreen from './src/Screens/PreviousSessionsScreen';

// Create navigators
const Stack = createNativeStackNavigator(); // Use createNativeStackNavigator for consistency with the import

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Flashcards" component={FlashcardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PreviousSessions" component={PreviousSessionsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
