import React from 'react';
import { SafeAreaView, Text, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useTheme, lightTheme, darkTheme } from '../Components/themeContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={theme.textColor} />
          <Text style={[styles.backButtonText, { color: theme.textColor }]}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, { color: theme.textColor }]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: theme.switchTrackColor, true: darkTheme.switchTrackColor }}
          thumbColor={isDarkMode ? darkTheme.switchThumbColor : lightTheme.switchThumbColor}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SettingsScreen;
