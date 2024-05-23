import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const PreviousSessionsScreen = () => {
  const navigation = useNavigation();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const storedSessions = await AsyncStorage.getItem('sessions');
        const sessions = storedSessions ? JSON.parse(storedSessions) : [];
        setSessions(sessions);
      } catch (error) {
        console.error('Error loading sessions:', error);
      }
    };

    loadSessions();
  }, []);

  const clearAllSessions = async () => {
    try {
      await AsyncStorage.removeItem('sessions');
      setSessions([]);
      Alert.alert('Success', 'All sessions have been cleared.');
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  };

  const clearIndividualSession = async (index) => {
    try {
      const storedSessions = await AsyncStorage.getItem('sessions');
      const sessions = storedSessions ? JSON.parse(storedSessions) : [];
      sessions.splice(index, 1);
      await AsyncStorage.setItem('sessions', JSON.stringify(sessions));
      setSessions(sessions);
      Alert.alert('Success', 'Session has been cleared.');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  const renderSessionItem = ({ item, index }) => (
    <View style={styles.sessionItem}>
      <Text style={styles.sessionText}>Category: {item.category}</Text>
      <Text style={styles.sessionText}>Card Count: {item.cardCount}</Text>
      <Text style={styles.sessionText}>Randomize: {item.randomize ? 'Yes' : 'No'}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.resumeButton}
          onPress={() => navigation.navigate('Flashcards', { ...item, sessionIndex: index })}
        >
          <Text style={styles.resumeButtonText}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => clearIndividualSession(index)}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Previous Sessions</Text>
      <TouchableOpacity style={styles.clearAllButton} onPress={clearAllSessions}>
        <Text style={styles.clearAllButtonText}>Clear All Sessions</Text>
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
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#007BFF',
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
    backgroundColor: '#ffffff',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
  },
  sessionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resumeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginTop: 10,
  },
  resumeButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  clearButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  clearAllButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  clearAllButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PreviousSessionsScreen;
