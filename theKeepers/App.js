import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; 
import GuestStack from "./src/navigation/GuestStack";
import AppStack from "./src/navigation/AppStack";
import { TasksProvider } from './src/contexts/TasksContext';
import { ToDoListProvider } from './src/contexts/ToDoListContext';
import { CatProvider } from './src/contexts/CatContext';

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
    <GestureHandlerRootView style={styles.flexContainer}>
      <ImageBackground source={require('./src/assets/the_background.png')} resizeMode="cover" style={styles.image}>
        
        <AuthProvider>

          <ToDoListProvider>

            <TasksProvider>
              
              <CatProvider>
                <AppContent />
              </CatProvider>

            </TasksProvider>

          </ToDoListProvider>

        </AuthProvider>


      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' as needed
  },
});
