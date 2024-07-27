import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, FlatList } from 'react-native';
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TasksContext";
import TaskItem from '../components/TaskItem';
import { authentication } from "../firebase/config";
import { signOut } from "firebase/auth";
import Feather from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function HomeScreen({ navigation }) {
  const { loggedInUser } = useAuth();
  const { toggleTaskCompletion, deleteTask, todayTasks } = useTasks();

  const renderTask = ({ item }) => (
    <TaskItem 
      item={item} 
      toggleTaskCompletion={toggleTaskCompletion} 
      deleteTask={deleteTask} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Welcome, Stargazer</Text>
          <View style={styles.gridContainer}>
            <View style={styles.grid}>
              <TouchableOpacity onPress={() => navigation.navigate('Task')} style={styles.button}>
                <ImageBackground source={require('../assets/tasks.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
                  <Text style={styles.buttonText}>Task</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Pomodoro')} style={styles.button}>
                <ImageBackground source={require('../assets/pomo.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
                  <Text style={styles.buttonText}>Pomodoro</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.button}>
                <ImageBackground source={require('../assets/cal.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
                  <Text style={styles.buttonText}>Calendar</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
                <ImageBackground source={require('../assets/prof.jpeg')} style={styles.buttonBackground} imageStyle={styles.buttonImage}>
                  <Text style={styles.buttonText}>Profile</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.taskListContainer}>
            <Text style={styles.taskListTitle}>Tasks Due Today</Text>
            <FlatList
              data={todayTasks}
              renderItem={renderTask}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text style={styles.noTasksText}>No tasks due today</Text>}
            />
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
  },
  overlay: {
    flex: 1,
    padding: 15
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gridContainer: {
    flex: 2,
    width: '100%',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'flex-start',
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
    width: '45%',
    aspectRatio: 1,
    marginBottom: 15,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#d8bfd8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskListContainer: {
    flex: 1.75,
    marginTop: 20,
    width: '100%',
  },
  taskListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  taskContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    color: 'black',
  },
  checkboxContainer: {
    padding: 5,
  },
  noTasksText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#302298',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '75%',
    marginTop: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
