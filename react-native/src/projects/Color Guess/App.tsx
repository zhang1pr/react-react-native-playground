import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

import { getRandomHex, shuffle } from './utils';

export default function ColorGuessApp() {
  const [streak, setStreak] = useState(0);
  const [prevHex, setPrevHex] = useState('');
  const [guess, setGuess] = useState('');
  const [hex, setHex] = useState(getRandomHex);

  const optionSet = new Set([hex]);
  while (optionSet.size !== 3) {
    optionSet.add(getRandomHex());
  }

  const options = shuffle([...optionSet]);

  const handleClick = (selected: string) => {
    if (selected === hex) {
      setStreak((value) => value + 1);
    } else {
      setStreak(0);
    }

    setGuess(selected);
    setPrevHex(hex);
    setHex(getRandomHex());
  };

  const isCorrectGuess = guess === prevHex;
  const verdictText1 = `Answer ${guess} is ${isCorrectGuess ? 'correct!' : 'wrong.'}`;
  const verdictText2 = isCorrectGuess ? '' : `Correct answer is ${hex}.`;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.colorBlock, { backgroundColor: hex }]} />

        <View style={styles.optionsRow}>
          {options.map((item) => (
            <Pressable key={item} style={styles.optionButton} onPress={() => handleClick(item)}>
              <ThemedText type="code">{item}</ThemedText>
            </Pressable>
          ))}
        </View>

        <ThemedText style={styles.streakText}>Streak: {streak}</ThemedText>

        {guess !== '' && (
          <ThemedText style={isCorrectGuess ? styles.correctText : styles.wrongText}>
            {verdictText1}
          </ThemedText>
        )}

        {guess !== '' && !isCorrectGuess && (
          <View style={styles.verdictRow}>
            <View style={[styles.swatch, { backgroundColor: prevHex }]} />
            <ThemedText style={styles.wrongText}>{verdictText2}</ThemedText>
            <View style={[styles.swatch, { backgroundColor: guess }]} />
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  colorBlock: {
    width: 280,
    height: 280,
    marginVertical: Spacing.three,
    borderRadius: Spacing.two,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  optionButton: {
    minWidth: 100,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.one,
    borderWidth: 1,
    borderColor: '#E5E4E7',
    alignItems: 'center',
  },
  streakText: {
    marginBottom: Spacing.two,
  },
  correctText: {
    color: 'darkgreen',
    textAlign: 'center',
  },
  wrongText: {
    color: 'darkred',
    textAlign: 'center',
  },
  verdictRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
