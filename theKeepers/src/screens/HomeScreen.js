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

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Welcome, Stargazer</Text>
          <View style={styles.grid}>
          <TouchableOpacity onPress={signOutUser} style={styles.signOutButton}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Task')} style={styles.button}>
            <ImageBackground source = {require('../assets/tasks.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
              <Text style={styles.buttonText}>Task</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Pomodaro')} style={styles.button}>
          <ImageBackground source = {require('../assets/pomo.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
              <Text style={styles.buttonText}>Pomodaro</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.button}>
            <ImageBackground source = {require('../assets/cal.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
              <Text style={styles.buttonText}>Calendar</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
          <ImageBackground source = {require('../assets/prof.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
              <Text style={styles.buttonText}>Profile</Text>
            </ImageBackground>
          </TouchableOpacity>
          </View>
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
  grid: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    paddingTop: 10,
  },
  buttonImage: {
    borderColor: "#8a2be2",
    borderWidth: 2,
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    width: '48%',
    aspectRatio: 1,
    marginBottom: 15,
    overflow: 'hidden'
    
  },
  buttonText: {
    color: '#d8bfd8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#302298',
    width: 100,
    height: 50,
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -150,
    right: -8,
    position: 'absolute',
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
