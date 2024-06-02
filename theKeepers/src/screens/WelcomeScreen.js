import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/WelcomePage.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.contentContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.copyright}>
          Copyright 2024, NUS CS Bhavina and Sahana, v1.0, All rights reserved. orbital
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 84, // Adjust this value to move content down from the top
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // value to move buttons up or down
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    marginBottom: 30,
    textAlign: 'center', // Ensures text alignment in the text component itself
    color: '#fff', // Change 
    //fontFamily? not rlly sure yet 
  },
  copyright: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center', // Ensures text alignment in the text component itself
    color: '#fff' // Change 
    //fontFamily? not rlly sure yet 
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  buttonsContainer: {
    marginTop: 400, // Adjust this value to move the buttons up or down
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#302298",
    width: 300, // Set the width to 268
    height: 41, // Set the height to 41
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    borderRadius: 20,
    marginBottom: 30, // Adjust the spacing between the logo and the buttons
    alignSelf: 'center', // Center the logo horizontally
  },
  button: {
    backgroundColor: "#302298",
    width: "90%",
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  copyright: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 20,
  },
});

    justifyContent: 'center',
    alignItems: 'center', // Ensure content is centered horizontally
    width: '100%',
    height: '100%',
  },
});
