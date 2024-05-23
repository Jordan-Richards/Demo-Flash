import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreviousSessionsScreen = () => {
  const navigation = useNavigation();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const storedSessions = await AsyncStorage.getItem('sessions');
        const parsedSessions = storedSessions ? JSON.parse(storedSessions) : [];
        setSessions(parsedSessions);
      } catch (error) {
        console.error('Error loading sessions:', error);
      }
    };

    loadSessions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.sessionItem}>
      <Text style={styles.sessionText}>Category: {item.category}</Text>
      <Text style={styles.sessionText}>Card Count: {item.cardCount}</Text>
      <Text style={styles.sessionText}>Randomize: {item.randomize ? 'Yes' : 'No'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Previous Sessions</Text>
      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sessionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sessionText: {
    fontSize: 18,
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PreviousSessionsScreen;
