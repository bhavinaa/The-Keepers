import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; 
import GuestStack from "./src/navigation/GuestStack";
import AppStack from "./src/navigation/AppStack";
import { TasksProvider } from './src/contexts/TasksContext';

const AppContent = () => {
  const { loggedInUser } = useAuth();
  return (
    <NavigationContainer>
      {loggedInUser ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ImageBackground source={require('./src/assets/the_background.png')} resizeMode="cover" style={styles.image}>
      <AuthProvider>
        <TasksProvider>
          <AppContent />
        </TasksProvider>
      </AuthProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' as needed
  },
});
