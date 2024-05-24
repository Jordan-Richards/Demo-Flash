import 'react-native-gesture-handler'; // Ensure gesture handler is imported first
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  Modal,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Switch,
  Alert, // Import Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import home1 from '../../assets/home1.jpeg'; // Correct import for the image
import home12 from '../../assets/home12.jpeg'; // Correct import for the image

const HomeScreen = () => {
  const [sessionModalVisible, setSessionModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [category, setCategory] = useState('Demo Deck');
  const [cardCount, setCardCount] = useState(5);
  const [randomize, setRandomize] = useState(false);
  const [pausedSession, setPausedSession] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getPausedSession = async () => {
      const storedPausedSession = await AsyncStorage.getItem('pausedSession');
      if (storedPausedSession) {
        setPausedSession(JSON.parse(storedPausedSession));
      }
    };
    getPausedSession();
  }, []);

  const startSession = () => {
    setSessionModalVisible(!sessionModalVisible);
    navigation.navigate('Flashcards', { category, cardCount, randomize });
  };

  const resumeLastSession = () => {
    if (pausedSession) {
      navigation.navigate('Flashcards', { ...pausedSession, resumeSession: true });
    } else {
      Alert.alert('No session in progress', 'There is no paused session to resume.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={home12} style={styles.backgroundImage}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome back!</Text>
            <TouchableOpacity style={styles.accountButton} onPress={() => setLogoutModalVisible(true)}>
              <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Let's start learning!</Text>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Join us for a fun learning experience!</Text>
              <Text style={styles.cardSubtitle}>Enjoy our NotSoSafe Flashcards! Customize your learning sessions and evaluate your progress.</Text>
              <Feather name="activity" size={45} color="black" />
            </View>
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Test your knowledge!</Text>
            <TouchableOpacity
              style={styles.start}
              onPress={() => navigation.navigate('Flashcards', { category: 'Demo Deck', cardCount: 5 })}
            >
              <Text style={styles.buttonStart}>Jump Right In!</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('PreviousSessions')}>
              <Feather style={styles.feather} name="clock" size={45} color="black" />
              <Text style={styles.buttonText}>View previous sessions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCard} onPress={resumeLastSession}>
              <Feather style={styles.feather} name="play-circle" size={45} color="black" />
              <Text style={styles.buttonText}>Resume session</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Settings')}>
              <Feather name="settings" size={45} color="black" />
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCard} onPress={() => setSessionModalVisible(true)}>
              <Feather style={styles.feather} name="book-open" size={45} color="black" />
              <Text style={styles.buttonText}>Set session details</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={sessionModalVisible}
            onRequestClose={() => setSessionModalVisible(!sessionModalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSessionModalVisible(!sessionModalVisible)}>
                  <Feather name="x" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Set Session Details</Text>
                <Text style={styles.modalText}>Category:</Text>
                <Picker
                  selectedValue={category}
                  style={styles.picker}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  {['Main', 'Coming Soon!'].map((item) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>

                <Text style={styles.modalText}>Number of Cards:</Text>
                <Picker
                  selectedValue={cardCount}
                  style={styles.picker}
                  onValueChange={(itemValue) => setCardCount(itemValue)}
                >
                  {[5, 10, 15, 20].map((number) => (
                    <Picker.Item key={number} label={`${number} cards`} value={number} />
                  ))}
                </Picker>

                <View style={styles.switchContainer}>
                  <Text style={styles.modalText}>Randomize Cards:</Text>
                  <Switch
                    style={styles.switch}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={randomize ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setRandomize}
                    value={randomize}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.button, styles.start]}
                  onPress={startSession}
                >
                  <Text style={styles.textStyle}>Start Session</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setSessionModalVisible(!sessionModalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={logoutModalVisible}
            onRequestClose={() => setLogoutModalVisible(!logoutModalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonLogout]}
                  onPress={() => {
                    setLogoutModalVisible(!logoutModalVisible);
                    navigation.navigate('Login');
                  }}
                >
                  <Text style={styles.textStyle}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setLogoutModalVisible(!logoutModalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitleContainer: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  start: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonStart: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  optionCard: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  feather: {
    padding: 10,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  accountButton: {
    padding: 10,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: '80%',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
  },
  buttonLogout: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 150,
    padding: 10,
    justifyContent: 'center',
  },
  switch: {
    marginRight: 40,
  },
});

export default HomeScreen;
