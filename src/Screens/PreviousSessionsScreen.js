import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useTheme, lightTheme, darkTheme } from '../Components/themeContext';

const PreviousSessionsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const storedSessions = await AsyncStorage.getItem('completedSessions');
        const sessions = storedSessions ? JSON.parse(storedSessions) : [];
        setSessions(sessions.reverse()); // Reverse the array to show the most recent sessions at the top
      } catch (error) {
        console.error('Error loading sessions:', error);
      }
    };

    loadSessions();
  }, []);

  const clearAllSessions = async () => {
    try {
      await AsyncStorage.removeItem('completedSessions');
      setSessions([]);
      Alert.alert('Success', 'All sessions have been cleared.');
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  };

  const renderSessionItem = ({ item }) => (
    <View style={[styles.sessionItem, { borderColor: '#AB232B' }]}>
      <Text style={[styles.sessionText, { color: theme.textColor }]}>Category: {item.category}</Text>
      <Text style={[styles.sessionText, { color: theme.textColor }]}>Card Count: {item.cardCount}</Text>
      <Text style={[styles.sessionText, { color: theme.textColor }]}>Correct: {item.rightCount}</Text>
      <Text style={[styles.sessionText, { color: theme.textColor }]}>Incorrect: {item.wrongCount}</Text>
      <Text style={[styles.sessionText, { color: theme.textColor }]}>Completed At: {new Date(item.completedAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={theme.textColor} />
        <Text style={[styles.backButtonText, { color: theme.textColor }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.textColor }]}>Previous Sessions</Text>
      <TouchableOpacity style={[styles.clearAllButton, { backgroundColor: '#AB232B' }]} onPress={clearAllSessions}>
        <Text style={[styles.clearAllButtonText, { color: 'white' }]}>Clear All Sessions</Text>
      </TouchableOpacity>
      <FlatList
        data={sessions}
        renderItem={renderSessionItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  sessionItem: {
    padding: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  sessionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  clearAllButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  clearAllButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PreviousSessionsScreen;
