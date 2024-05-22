import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Button, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

// Main component for the Flashcard screen
const FlashcardScreen = () => {
  const navigation = useNavigation();
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const flashcards = [
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

  const handlePauseSession = () => {
    navigation.navigate('Home');
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const currentCard = flashcards[flashcardIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Company Logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Feather name="arrow-left" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Score counts for correct and incorrect answers */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Correct: {correctAnswers}</Text>
        <Text style={styles.scoreText}>Incorrect: {incorrectAnswers}</Text>
      </View>
      <Button title="Pause Session" onPress={handlePauseSession} />

      {/* Container for the flashcard itself */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={flipCard}>
          <Text style={styles.cardLabel}>{isFront ? 'Front' : 'Back'}</Text>
          <ScrollView contentContainerStyle={styles.cardTextContainer}>
            <Text style={styles.cardText}>
              {isFront ? currentCard.front : currentCard.back}
            </Text>
          </ScrollView>
        </TouchableOpacity>
      </View>

      {/* Container for navigation and Right/Wrong answer buttons in 2x2 layout */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.navButton} onPress={goToPreviousCard}>
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={goToNextCard}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.answerButton, styles.rightButton]}
            onPress={() => handleAnswer(true)}
          >
            <Text style={styles.answerButtonText}>Right</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.answerButton, styles.wrongButton]}
            onPress={() => handleAnswer(false)}
          >
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
    backgroundColor: '#f8f9fa',
    paddingBottom: 50,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
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
    color: '#007BFF',
  },
  progressBar: {
    width: '100%',
    marginTop: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  cardLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardTextContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'center',
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
    color: '#333',
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
    backgroundColor: '#007BFF',
  },
  navButtonText: {
    color: 'white',
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
