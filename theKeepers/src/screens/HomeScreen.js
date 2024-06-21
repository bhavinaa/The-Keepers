import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useAuth } from "../contexts/AuthContext";
import { authentication } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const { loggedInUser, setLoggedInUser } = useAuth();

  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        setLoggedInUser(null);
      })
      .catch((err) => {
        // Handle error appropriately, perhaps by setting an error state
      });
  };

  // Placeholder data (replace with actual data later)
  const totalPomodoroTime = "2 hours 30 minutes";
  const totalUserPoints = 150;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          {/* Sign out button */}
          <TouchableOpacity onPress={signOutUser} style={styles.signOutButton}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>

          {/* User statistics section */}
          <View style={styles.userStatsContainer}>
            <Text style={styles.welcomeText}>Welcome {loggedInUser ? loggedInUser.name : ''}</Text>
            {/* Placeholder for user analytics */}
            <View style={styles.analyticsContainer}>
              <Text style={styles.analyticsText}>Total Pomodoro Study Time:</Text>
              <Text style={styles.analyticsValue}>{totalPomodoroTime}</Text>
              <Text style={styles.analyticsText}>Total User Points:</Text>
              <Text style={styles.analyticsValue}>{totalUserPoints}</Text>
            </View>
          </View>

          {/* Button to navigate to task screen */}
          <TouchableOpacity onPress={() => navigation.navigate('Task')} style={styles.taskButton}>
            <Text style={styles.buttonText}>Task</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Adds a semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userStatsContainer: {
    flex: 1, // Takes up the entire available space in the overlay
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginTop: 50, // Moves the user stats section towards the top half of the screen
    width: '80%', // Adjusts the width of the user stats container
  },
  analyticsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  analyticsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  analyticsValue: {
    color: 'white',
    fontSize: 14,
  },
  taskButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
