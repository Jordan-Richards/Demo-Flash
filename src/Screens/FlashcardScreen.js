import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Image, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, lightTheme, darkTheme } from '../Components/themeContext';

const FlashcardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { category, cardCount, randomize, sessionIndex, resumeSession, flashcardState } = route.params || {}; // Get params from navigation
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardIndex, setFlashcardIndex] = useState(resumeSession && flashcardState ? flashcardState.currentIndex : 0);
  const [isFront, setIsFront] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(resumeSession && flashcardState ? flashcardState.rightCount : 0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(resumeSession && flashcardState ? flashcardState.wrongCount : 0);

  useEffect(() => {
    const initializeFlashcards = () => {
      const initialFlashcards = [
        { id: 1, front: 'Outcome', back: "The thing you get when you do the thing you're trying to do." },
        { id: 2, front: 'Purpose of Science (1)', back: '1. Control bitches. Control.' },
        { id: 3, front: 'Automatic punishment', back: 'Darwin awards.' },
        { id: 4, front: 'Behavior trap', back: 'If set up properly, it\'s like deja vu - "i swear i\'ve been here before.."' },
        { id: 5, front: 'Reinforcer survey', back: 'Observed window shopping.' },
        { id: 6, front: 'Contingent delay', back: 'The more you fuck up the longer it takes to get out of jail. Or as your dad might say, "If you find your self in a hole, stop digging."' },
        { id: 7, front: 'Natural setting', back: 'You are here.' },
        { id: 8, front: 'Applied behavior analysis', back: 'A science for control freaks.' },
        { id: 9, front: 'Generalization probe', back: 'Seeing if you can do things, before we teach you.' },
        { id: 10, front: 'Chaining', back: 'Getting your shit together.' },
        { id: 11, front: 'Accuracy of measurement', back: 'When someone calls you a dick, and you are.' },
        { id: 12, front: 'Antecedent control', back: 'The thing your mother in law has over you.' },
        { id: 13, front: 'Carry over effects', back: 'What you bring to your next relationship.' },
        { id: 14, front: 'Discriminated operant', back: 'Fun fact, dressing for a nudist colony visit is different than dressing for the library.' },
        { id: 15, front: 'Escape behavior', back: 'If you\'re using cards, put them down. If you\'re using a phone press the "home" button.' },
        { id: 16, front: 'Extinction', back: '(intentionally leave blank)' },
        { id: 17, front: 'Functional analysis', back: 'Pissing you off for your own benefit.' },
        { id: 18, front: 'Generalization across subjects', back: 'Orgies' },
        { id: 19, front: 'Incomplete stimulus control', back: 'When behaviors tend to start but they don\'t get' },
        { id: 20, front: 'Intermittent Reinforcement', back: 'Reasons she doesn\'t leave him.' },
        { id: 21, front: 'Latency', back: '___________________________________________________________________________________________ (get it?).' },
        { id: 22, front: 'Mixed schedule of reinforcement', back: 'I don\'t know what the fuck is going on.' },
        { id: 23, front: 'Motivation strategy', back: 'Giving a shit; a plan. Plowing a field of fucks.' },
        { id: 24, front: 'Outcome goal', back: 'The thing you want to get by doing the thing you want to do to get the thing you want.' },
        { id: 25, front: 'Overcorrection', back: 'Mischief managed.' },
        { id: 26, front: 'Prompt fading', back: 'Losing your wingman after your engagement.' },
        { id: 27, front: 'Relational frame theory', back: 'Derived stimulus relations are icky. This helps un ick them.' },
        { id: 28, front: 'Response Block', back: 'Cock block.' },
        { id: 29, front: 'Response generalization', back: 'Putting your fingers in a bowling ball: putting your fingers in an electrical outlet.' },
        { id: 30, front: 'Response priming', back: 'The opposite of response choking.' },
        { id: 31, front: 'Self-administered reinforcement', back: 'Going to the store to eat a candy bar. Get your mind out of the gutter.' },
        { id: 32, front: 'Short-circuiting the contingency', back: 'Drinking beer before you go to the gym.' },
        { id: 33, front: 'Tandem schedule of reinforcement', back: 'An expected but untold honey-do list.' },
        { id: 34, front: 'Voluntary behavior', back: 'LOL. right. It\'s called operant responding - and we only call it voluntary so you don\'t lose your world view and crumble into a nihilistic pile of human flesh.' }
      ];

      if (randomize) {
        shuffleArray(initialFlashcards);
      }

      setFlashcards(initialFlashcards);
    };

    initializeFlashcards();
  }, [randomize]);

  useEffect(() => {
    if (correctAnswers + incorrectAnswers >= cardCount) {
      handleEndSession();
    }
  }, [correctAnswers, incorrectAnswers]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const flipCard = () => {
    setIsFront(!isFront);
  };

  const goToNextCard = () => {
    if (flashcardIndex < flashcards.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
      setIsFront(true);
    }
  };

  const goToPreviousCard = () => {
    if (flashcardIndex > 0) {
      setFlashcardIndex(flashcardIndex - 1);
      setIsFront(true);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    goToNextCard();
  };

  const handlePauseSession = async () => {
    await saveSessionData();
    navigation.navigate('Home');
  };

  const handleExitSession = async () => {
    await clearSessionData();
    resetSessionState();
    navigation.navigate('Home');
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const handleEndSession = async () => {
    await saveCompletedSession();
    await clearSessionData();
    resetSessionState();
    navigation.navigate('Home');
  };

  const saveSessionData = async () => {
    try {
      const storedSessions = await AsyncStorage.getItem('sessions');
      const sessions = storedSessions ? JSON.parse(storedSessions) : [];
      const newSession = {
        category,
        cardCount,
        randomize,
        currentIndex: flashcardIndex,
        rightCount: correctAnswers,
        wrongCount: incorrectAnswers
      };
      if (sessions.length > 0) {
        sessions[0] = newSession; // Only allow one paused session
      } else {
        sessions.push(newSession);
      }
      await AsyncStorage.setItem('sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const saveCompletedSession = async () => {
    try {
      const storedCompletedSessions = await AsyncStorage.getItem('completedSessions');
      const completedSessions = storedCompletedSessions ? JSON.parse(storedCompletedSessions) : [];
      const newCompletedSession = {
        category,
        cardCount,
        randomize,
        rightCount: correctAnswers,
        wrongCount: incorrectAnswers,
        completedAt: new Date().toISOString(),
      };
      completedSessions.push(newCompletedSession);
      await AsyncStorage.setItem('completedSessions', JSON.stringify(completedSessions));
    } catch (error) {
      console.error('Failed to save completed session:', error);
    }
  };

  const clearSessionData = async () => {
    try {
      await AsyncStorage.removeItem('sessions');
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  const resetSessionState = () => {
    setFlashcardIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setIsFront(true);
  };

  const currentCard = flashcards[flashcardIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Feather name="arrow-left" size={24} color={theme.textColor} />
        <Text style={[styles.backButtonText, { color: theme.textColor }]}>Back</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/safemeds.png')} style={styles.logo} />
      </View>
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, { color: theme.textColor }]}>Correct: {correctAnswers}</Text>
        <Text style={[styles.scoreText, { color: theme.textColor }]}>Incorrect: {incorrectAnswers}</Text>
      </View>
      <Button title="Pause Session" onPress={handlePauseSession} color={isDarkMode ? 'white' : 'black'} />
      <Button title="Exit Session" onPress={handleExitSession} color="red" />
      <View style={styles.cardContainer}>
        {currentCard ? (
          <TouchableOpacity onPress={flipCard}>
            <ImageBackground source={require('../../assets/barbedwire img.jpeg')} style={[styles.card, { borderColor: theme.borderColor }]} imageStyle={styles.cardImage}>
              <Text style={[styles.cardLabel, { color: isDarkMode ? 'black' : 'grey' }]}>{isFront ? 'Front' : 'Back'}</Text>
              <View style={[styles.cardTextContainer, { backgroundColor: isDarkMode ? 'transparent' : 'rgba(255, 255, 255, 0.3)' }]}>
                <Text style={[styles.cardText, { color: isDarkMode ? 'black' : theme.textColor }]}>
                  {isFront ? currentCard.front : currentCard.back}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.noCardsText, { color: theme.textColor }]}>No cards available</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.navButton, { backgroundColor: isDarkMode ? 'darkgray' : 'lightgray' }]} onPress={goToPreviousCard}>
            <Text style={[styles.navButtonText, { color: isDarkMode ? 'white' : 'black' }]}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, { backgroundColor: isDarkMode ? 'darkgray' : 'lightgray' }]} onPress={goToNextCard}>
            <Text style={[styles.navButtonText, { color: isDarkMode ? 'white' : 'black' }]}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.answerButton, styles.rightButton]} onPress={() => handleAnswer(true)}>
            <Text style={styles.answerButtonText}>Right</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.answerButton, styles.wrongButton]} onPress={() => handleAnswer(false)}>
            <Text style={styles.answerButtonText}>Wrong</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logoContainer: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scoreText: {
    fontSize: 18,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 20,
  },
  cardImage: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  noCardsText: {
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navButton: {
    width: '45%',
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  answerButton: {
    width: '45%',
    padding: 10,
    borderRadius: 5,
  },
  rightButton: {
    backgroundColor: 'green',
  },
  wrongButton: {
    backgroundColor: 'red',
  },
  answerButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FlashcardScreen;
