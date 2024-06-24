import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
// import Sound from 'react-native-sound';

const Separator = () => <View style={styles.separator} />;

const CustomButton = ({ onPress, title, color }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: color }]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const renderTime = ({ remainingTime }) => {
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
    </View>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [duration, setDuration] = React.useState(60);
  const [key, setKey] = React.useState(0);
  const [noOfPMTimes, setNoOfPMTimes] = React.useState(0);
  const [customTime, setCustomTime] = React.useState('');

  const startPMTimer = () => {
    Alert.alert('Starting Pomodoro timer');
    setKey(prevKey => prevKey + 1);
    setDuration(1500);
    setIsPlaying(true);
  };

  const startSBTimer = () => {
    Alert.alert('Starting Short Break timer');
    setKey(prevKey => prevKey + 1);
    setDuration(300);
    setIsPlaying(true);
  };

  const startLBTimer = () => {
    Alert.alert('Starting Long Break timer');
    setKey(prevKey => prevKey + 1);
    setDuration(900);
    setIsPlaying(true);
  };

  const stopPMTimer = () => {
    Alert.alert('Stopping Timer');
    setIsPlaying(false);
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/the_background.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}> Pomodoro </Text>
          </View>
          <View style={styles.timerContainer}>
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={duration}
              strokeWidth={12}
              colors={["#778DA9", '#E0E1DD', '#24243E']}
              //colors={['#0F0C29', '#302B63', '#24243E']}
              updateInterval={1}
              onComplete={() => {
                Alert.alert('Timer Finished');
                // TO DO: Increase the respective timer status in the Firebase database
              }}
            >
              {renderTime}
            </CountdownCircleTimer>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Pomodoro (25 min)"
              color="#FF9F1C"
              onPress={startPMTimer}
            />
            <Separator />
            <CustomButton
              title="Short Break (5 min)"
              color="#3B9AE1"
              //color="#AFEEEE"
              onPress={startSBTimer}
            />
            <Separator />
            <CustomButton
              title="Long Break (15 min)"
              color = "#A8DADC"
              onPress={startLBTimer}
            />
            <Separator />
            <CustomButton
              title="Stop"
              color = "#FFD166"
              //color="#FFE4E1"
              onPress={stopPMTimer}
            />
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
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    elevation: 3,
    width: '70%',
    marginVertical: 10,
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
  separator: {
    height: 10,
  },
});
