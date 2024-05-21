import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, StatusBar, useColorScheme, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const lightTheme = {
  backgroundColor: '#FFF', // White background for light mode
  textColor: '#000'        // Black text for light mode
};

const darkTheme = {
  backgroundColor: '#333', // Dark gray background for dark mode
  textColor: '#FFF'        // White text for dark mode
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemScheme === 'dark');
  }, [systemScheme]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.textColor }]}>Settings</Text>
      </View>
      <View style={styles.content}>
        <Text style={{ color: theme.textColor, fontSize: 16, paddingVertical: 10 }}>Dark Mode</Text>
        <Switch
          trackColor={{ false: lightTheme.backgroundColor, true: darkTheme.backgroundColor }}
          thumbColor={isDarkMode ? darkTheme.textColor : lightTheme.textColor}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsDarkMode(!isDarkMode)}
          value={isDarkMode}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
    backgroundColor: '#fff', // Default background color, can be changed
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SettingsScreen; // Export statement
