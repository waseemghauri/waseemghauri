import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GuessLogItem from '../components/game/GuessLogItem';
import Colors from '../constants/colors';

function generateRandomBetween(min: number, max: number, exclude: any) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;
function GameScreen(this: any, {userNumber, onGameOver}: any) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const {width, height} = useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  function nextGuessHandler(direction: any) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", 'You know this is wrong', [
        {text: 'Sorry', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
      const newRndNumber = generateRandomBetween(
        minBoundary,
        maxBoundary,
        currentGuess,
      );
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRound => [newRndNumber, ...prevGuessRound]);
  }
  const guessRoundListLenght = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      {/* <Card> */}
      <View style={styles.card}>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove-outline" size={20} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add-outline" size={20} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );
  if (width > 700) {
    content = (
      <InstructionText style={styles.instructionText}>
        Higher or Lower?
      </InstructionText>
    );
    <View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="remove-outline" size={20} color="white" />
        </PrimaryButton>
      </View>
      <NumberContainer>{currentGuess}</NumberContainer>;
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="add-outline" size={20} color="white" />
        </PrimaryButton>
      </View>
    </View>;
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      {/* </Card> */}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={guessRoundListLenght - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  );
}

export default GameScreen;
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddb52f',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#ddb52f',
    padding: 12,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 380 ? 18 : 36,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
  },
  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 12,
  },
});
