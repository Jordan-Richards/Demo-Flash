import React from 'react';
import { SafeAreaView, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useTheme, lightTheme, darkTheme } from '../Components/themeContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Feather name="arrow-left" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <Text style={[styles.text, { color: theme.textColor }]}>Dark Mode</Text>
      <Switch
        trackColor={{ false: theme.switchTrackColor, true: darkTheme.switchTrackColor }}
        thumbColor={isDarkMode ? darkTheme.switchThumbColor : lightTheme.switchThumbColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDarkMode}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
});

export default SettingsScreen;
