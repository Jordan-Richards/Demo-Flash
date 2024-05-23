import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.title}>Welcome to</Text>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={loginUsername}
        onChangeText={setLoginUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={loginPassword}
        onChangeText={setLoginPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register a Free Account" onPress={openRegisterModal} />
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
              style={styles.input}
              placeholder="Username"
              value={registerUsername}
              onChangeText={setRegisterUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={registerEmail}
              onChangeText={setRegisterEmail}
            />
            <TextInput
              style={styles.input}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%', // Adjust width for better visibility
    margin: 20,
    backgroundColor: 'white',
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
});

export default LoginScreen;
