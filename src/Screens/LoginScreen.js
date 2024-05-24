import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, Alert, Image, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import home10 from '../../assets/home10.jpeg';

const LoginScreen = () => {
  const navigation = useNavigation();

  // State for registration modal
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // State for login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Functions to handle modal visibility
  const openRegisterModal = () => setRegisterModalVisible(true);
  const closeRegisterModal = () => setRegisterModalVisible(false);

  // Mock login function to bypass API call
  const handleLogin = () => {
    if (!loginUsername.trim() || !loginPassword.trim()) {
      Alert.alert('Login Error', 'Username and password are required.');
      return;
    }

    // Directly navigate to the home screen
    navigation.replace('Home');
  };

  // Mock registration function to bypass API call
  const handleRegister = () => {
    if (!registerUsername.trim() || !registerEmail.trim() || !registerPassword.trim()) {
      Alert.alert('Registration Error', 'All fields are required for registration.');
      return;
    }

    // Mock successful registration
    console.log('User registered successfully');
    Alert.alert('Registration Success', 'User registered successfully');

    // Close the modal and navigate to the home screen
    closeRegisterModal();
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={home10} style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to</Text>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#ffffff"
              value={loginUsername}
              onChangeText={setLoginUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry
              value={loginPassword}
              onChangeText={setLoginPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Log In" color="#1E90FF" onPress={handleLogin} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Register a Free Account" color="#1E90FF" onPress={openRegisterModal} />
          </View>
        </View>

        {/* Modal for Registration */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isRegisterModalVisible}
          onRequestClose={closeRegisterModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.modalInput}
                placeholder="Username"
                value={registerUsername}
                onChangeText={setRegisterUsername}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Email"
                value={registerEmail}
                onChangeText={setRegisterEmail}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Password"
                secureTextEntry
                value={registerPassword}
                onChangeText={setRegisterPassword}
              />
              <View style={styles.buttonContainer}>
                <Button title="Register" onPress={handleRegister} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Close" onPress={closeRegisterModal} />
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Translucent box
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Light translucent background
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  input: {
    width: '80%',
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    fontSize: 16,
    color: '#ffffff',
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  modalView: {
    width: '90%', // Adjust width for better visibility
    margin: 20,
    backgroundColor: 'white',
    borderColor: '#1E90FF',
    borderRadius: 20,
    padding: 35,
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
  modalInput: {
    width: '80%',
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000', // Black border for modal input fields
    borderRadius: 5,
    fontSize: 16,
    color: '#000000', // Black text color for modal input fields
  },
});

export default LoginScreen;
