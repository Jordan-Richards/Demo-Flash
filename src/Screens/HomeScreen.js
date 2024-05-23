import 'react-native-gesture-handler'; // Ensure gesture handler is imported first
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  Modal,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Define the HomeScreen component
const HomeScreen = () => {
  // State for session modal visibility
  const [sessionModalVisible, setSessionModalVisible] = useState(false);
  // State for logout modal visibility
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  // State for category selection
  const [category, setCategory] = useState('Networking');
  // State for card count selection
  const [cardCount, setCardCount] = useState(5);
  // State for randomization setting
  const [randomize, setRandomize] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome back, user</Text>
          <TouchableOpacity style={styles.accountButton} onPress={() => setLogoutModalVisible(true)}>
            <Feather name="user" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Let's start learning!</Text>

        {/* Card Section */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Join us for a fun learning experience!</Text>
            <Text style={styles.cardSubtitle}>Choose a category and start a session.</Text>
            <Feather name="activity" size={45} color="black" />
          </View>
        </View>

        {/* Section Title */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Test your knowledge!</Text>
        </View>

        {/* Options Container */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('PreviousSessions')}>
            <Feather style={styles.feather} name="clock" size={45} color="black" />
            <Text style={styles.buttonText}>View previous sessions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={() => console.log('Resume session')}>
            <Feather style={styles.feather} name="play-circle" size={45} color="black" />
            <Text style={styles.buttonText}>Resume session</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Settings')}>
            <Feather name="settings" size={45} color="black" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={() => setSessionModalVisible(true)}>
            <Feather style={styles.feather} name="settings" size={45} color="black" />
            <Text style={styles.buttonText}>Set session details</Text>
          </TouchableOpacity>
        </View>

        {/* Session Modal */}
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
              {/* Category Dropdown */}
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

              {/* Number of Cards Dropdown */}
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

              {/* Randomize Cards Switch */}
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

              {/* Start Session Button */}
              <TouchableOpacity
                style={[styles.button, styles.buttonStart]}
                onPress={() => {
                  setSessionModalVisible(!sessionModalVisible);
                  navigation.navigate('Flashcards', { category, cardCount, randomize });
                }}
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

        {/* Logout Modal */}
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
                  navigation.replace('Login');
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
                      </ScrollView>
                    </SafeAreaView>
                  );
                };
  
  const styles = StyleSheet.create({
    // Container of the entire screen
    container: {
      flex: 1,
      backgroundColor: '#fff', // white background color
      paddingTop: Platform.OS === 'android' ? 25 : 0, // top padding for Android status bar
    },
    // Style for the ScrollView to add horizontal margin
    scrollView: {
      marginHorizontal: 20,
    },
    // Header style for the top section of the screen
    header: {
      flexDirection: 'row', // elements in a row
      justifyContent: 'space-between', // space between elements
      alignItems: 'center', // vertically centered
      marginTop: 10, // top margin
      marginBottom: 20, // bottom margin
    },
    // Text style for the header text
    headerText: {
      fontSize: 18, // text size
      fontWeight: 'bold', // font weight
    },
    // Style for the main title of the HomeScreen
    title: {
      fontSize: 22, // text size
      fontWeight: 'bold', // font weight
      textAlign: 'center', // centered text
      marginVertical: 10, // vertical margin
    },
    // Style for any cards in the HomeScreen
    card: {
      flex: 1, // take up all available space
      flexDirection: 'row', // elements in a row
      justifyContent: "center", // center content
      borderWidth: 1, // border width
      borderColor: 'black', // border color
      borderRadius: 5, // rounded corners
      padding: 20, // padding inside the card
      marginVertical: 10, // vertical margin for spacing between cards
    },
    // Content within the card
    cardContent: {
      flex: 1, // take up all available space
      justifyContent: 'center', // vertically centered
      alignItems: 'center', // horizontally centered
    },
    // Title within the card
    cardTitle: {
      fontSize: 18, // text size
      fontWeight: 'bold', // font weight
    },
    // Subtitle within the card
    cardSubtitle: {
      fontSize: 14, // text size
      textAlign: 'center', // center text
    },
    // Style for the section titles in the HomeScreen
    sectionTitleContainer: {
      paddingVertical: 20, // vertical padding
    },
    // Style for the section titles
    sectionTitle: {
      fontSize: 22, // text size
      fontWeight: 'bold', // font weight
      textAlign: 'center', // centered text
    },
    // Container for the options/buttons at the bottom of the HomeScreen
    optionsContainer: {
      flex: 1, // take up all available space
      flexDirection: 'row', // elements in a row
      justifyContent: 'space-around', // space around elements
      flexWrap: 'wrap', // wrap elements to the next line
      marginVertical: 10, // vertical margin for spacing
    },
    // Style for each option card/button
    optionCard: {
      width: '45%', // width relative to screen size
      borderWidth: 1, // border width
      borderColor: '#000', // border color
      borderRadius: 5, // rounded corners
      padding: 20, // padding inside the option card
      marginBottom: 20, // bottom margin
      alignItems: 'center', // horizontal alignment
      justifyContent: 'center', // vertical alignment
      backgroundColor: 'lightblue', // background color
    },
    feather: {
      padding: 10,
      borderRadius: 50,
      borderColor: 'black',
      borderWidth: 2,
    },
    // Style for text on buttons
    buttonText: {
      color: 'black', // text color
      fontWeight: 'bold', // font weight
      textAlign: 'center', // centered text
    },
    // Style for buttons that trigger an option
    OptionButtons: {
      minWidth: 120, // minimum width
      minHeight: 40, // minimum height
      justifyContent: 'center', // vertically centered
      alignItems: 'center', // horizontally centered
      backgroundColor: 'blue', // background color
      paddingHorizontal: 10, // horizontal padding
      paddingVertical: 5, // vertical padding
      borderRadius: 5, // rounded corners
    },
    // Style for the account button in the header
    accountButton: {
      padding: 10, // padding
      borderRadius: 50, // rounded corners for a circular shape
      borderColor: 'black', // border color
      borderWidth: 2, // border width
    },
    // Modal presentation styles
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: '80%', // adjust width as needed
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
    closeButton: {
      alignSelf: 'flex-end',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center', // center text
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginVertical: 5,
      width: '80%', // adjust width as needed
    },
    buttonStart: {
      backgroundColor: '#2196F3',
    },
    buttonCancel: {
      backgroundColor: '#f44336',
    },
    buttonLogout: {
      backgroundColor: '#2196F3',
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
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
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '80%', // Set width as needed
    },
    slider: {
      width: '100%', // Set width as needed
      height: 40,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    picker: {
      width: '100%', // Full width of the picker
      height: 150,
      padding: 10,
      justifyContent: 'center',
    },
    switch: {
      marginRight: 40,
    },
    // Add any other styles you need here
  });
  
  export default HomeScreen;
  
