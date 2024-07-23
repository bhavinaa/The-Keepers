import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
  TextInput,
  Keyboard
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { getFocusTip } from "../firebase/openAI";

const Separator = () => <View style={styles.separator} />;

const CustomButton = ({ onPress, title, color, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: color }, style]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const renderTime = ({ remainingTime, focusTip }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  if (remainingTime === 0) {
    return <Text style={styles.timerText}>Timer Completed</Text>;
  }

  return (
    <View style={styles.timer}>
      <Text style={styles.value}>
        {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
      </Text>
      <Text style={styles.focusTip}>{focusTip}</Text>
    </View>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(60);
  const [key, setKey] = useState(0);
  const [focusTip, setFocusTip] = useState('');
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    const fetchFocusTip = async () => {
      const tip = await getFocusTip();
      setFocusTip(tip);
    };

    fetchFocusTip();
  }, [key]);

  const startPMTimer = () => {
    Alert.alert('Starting Pomodoro timer');
    setKey(prevKey => prevKey + 1);
    setDuration(customTime ? parseInt(customTime) * 60 : 1500);
    setIsPlaying(true);
    setIsPaused(false);
    Keyboard.dismiss(); // Close the keyboard
  };

  const startSBTimer = () => {
    Alert.alert('Starting Short Break timer');
    setKey(prevKey => prevKey + 1);
    setDuration(300);
    setIsPlaying(true);
    setIsPaused(false);
    Keyboard.dismiss(); // Close the keyboard
  };

  const startLBTimer = () => {
    Alert.alert('Starting Long Break timer');
    setKey(prevKey => prevKey + 1);
    setDuration(900);
    setIsPlaying(true);
    setIsPaused(false);
    Keyboard.dismiss(); // Close the keyboard
  };

  const pauseTimer = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setIsPaused(true);
      Alert.alert('Timer Paused');
    }
  };

  const resumeTimer = () => {
    if (isPaused) {
      setIsPlaying(true);
      setIsPaused(false);
      Alert.alert('Timer Resumed');
    }
  };

  const stopPMTimer = () => {
    Alert.alert('Stopping Timer');
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/the_background.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Pomodoro</Text>
          </View>
          <View style={styles.timerContainer}>
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={duration}
              strokeWidth={12}
              colors={["#778DA9", '#E0E1DD', '#24243E']}
              updateInterval={1}
              onComplete={() => {
                Alert.alert('Timer Finished');
              }}
            >
              {({ remainingTime }) => renderTime({ remainingTime })}
            </CountdownCircleTimer>

            <Separator />
            <Separator />
            <Text style={styles.focusTip}>{focusTip}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter custom time (min)"
              keyboardType="numeric"
              value={customTime}
              onChangeText={text => setCustomTime(text)}
            />
            <TouchableOpacity onPress={() => Keyboard.dismiss()} style={styles.closeKeyboardButton}>
              <Text style={styles.closeKeyboardButtonText}>Enter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <CustomButton
                title="Start Timer"
                color="#FF9F1C"
                onPress={startPMTimer}
              />
              <Separator />
              <CustomButton
                title="Short Break"
                color="#3B9AE1"
                onPress={startSBTimer}
              />
              <Separator />
              <CustomButton
                title="Long Break"
                color="#A8DADC"
                onPress={startLBTimer}
              />
            </View>
            <View style={styles.controlRow}>
              <CustomButton
                title={isPlaying ? (isPaused ? "Resume" : "Pause") : "Start"}
                color={isPaused ? "#A8DADC" : "#FFD166"}
                onPress={isPaused ? resumeTimer : pauseTimer}
                style={styles.pauseButton}
              />
              <Separator />
              <CustomButton
                title="Stop"
                color="#FFD166"
                onPress={stopPMTimer}
                style={styles.stopButton}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
    width: '30%',
    marginVertical: 10,
  },
  stopButton: {
    width: '48%',
  },
  pauseButton: {
    width: '48%',
    backgroundColor: '#FFD166',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  timer: {
    alignItems: 'center',
  },
  value: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  focusTip: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  separator: {
    height: 10,
    width: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  closeKeyboardButton: {
    padding: 10,
    backgroundColor: '#FFD166',
    borderRadius: 10,
  },
  closeKeyboardButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
