import { View, Text } from 'react-native'
import React from 'react'
import {
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
const Separator = () => <View style={styles.separator} />;

const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
  
    if (remainingTime === 0) {
      return <Text style={styles.timerText}>Too late...</Text>;
    }
  
    return (
      <View style={styles.timer}>
        <Text style={styles.value}>{`${minutes}:${
          seconds < 10 ? '0' : ''
        }${seconds}  `}</Text>
      </View>
    );
  };

export default function PomodaroScreen({ navigation })  {

    const [isPlaying, setIsPlaying] = React.useState(true);
    const [duration, setDuration] = React.useState(60);
  
  
    const startPMTimer = () => {
      Alert.alert('starting pm timer');
      setDuration(1500);
      setIsPlaying(true);
    };
  
   const startSBTimer = () => {
      Alert.alert('Starting Short Break timer');
      setIsPlaying(false)
      setDuration(300);
      setIsPlaying(true);
    };
  
     const startLBTimer = () => {
      Alert.alert('Starting Short Break timer');
      setIsPlaying(false)
      setDuration(900);
      setIsPlaying(true);
    };
  
  
    const stopPMTimer = () => {
      Alert.alert('Stopped Timer');
      setDuration(1500);
      setIsPlaying(false);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Button title="Pomodoro (25 min)" onPress={startPMTimer} />
        </View>
        <Separator />
        <View>
          <Button
            title="Short Break( 5 min)"
            color="#f194ff"
            onPress={startSBTimer}
          />
        </View>
        <Separator />
        <View>
          <Button
            title="Long Break (15 min)"
            onPress={startLBTimer}
          />
        </View>
        <Separator />
        <View style={styles.timer}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            strokeWidth={12}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            updateInterval={1}>
            {renderTime}
          </CountdownCircleTimer>
        </View>
        <Separator />
       
        <View>
          <Button title="Stop" onPress={stopPMTimer} />
        </View>
        <Separator />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    timer: {
      flexDirection: 'row',
      padding: 60,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    value: {
      fontSize: 20,
      fontWeight: 'bold', // Making the time bold
    },
  });
  