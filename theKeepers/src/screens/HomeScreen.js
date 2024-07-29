import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, FlatList } from 'react-native';
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TasksContext";
import TaskItem from '../components/TaskItem';
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";


/**
 * Calculates the reminder dates based on the deadline and reminder frequency.
 * 
 * @param {string} deadline - The deadline for the goal.
 * @param {string} reminderFrequency - The reminder frequency.
 * 
 * @returns {string[]} - An array of reminder dates.
 */


export default function HomeScreen({ navigation }) {
  const { loggedInUser } = useAuth();
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (loggedInUser?.email) {
      const today = new Date();
    const singaporeOffset = 8 * 60;
    const singaporeTime = new Date(today.getTime() + (singaporeOffset - today.getTimezoneOffset()) * 60000);
    console.log("Singapore Time Now:", singaporeTime);
    singaporeTime.setDate(singaporeTime.getDate() - 1);
    singaporeTime.setHours(8, 0, 0, 0);
    
    console.log("Final Singapore Time (Previous Day 08:00 AM):", singaporeTime);
    
    const tasksQuery = query(
        collection(db, "todo"),
        where("email", "==", loggedInUser?.email),
        where("deadline", "==", singaporeTime)
    );

      const unsubscribeUsername = onSnapshot(doc(db, 'Users', loggedInUser?.email), (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setUsername(userData?.username || 'Stargazer');
        } else {
          setUsername('Stargazer');
        }
      }, (error) => {
        console.error("Error fetching user document:", error);
        setUsername('Stargazer');
      });

      const unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tasksData.push({
            id: doc.id,
            title: data.title,
            deadline: data.deadline.toDate(),
            completed: data.completed || false,
            category: data.category || ''
          });
        });
        setTasks(tasksData);
        setLoading(false);
      });

      return () => { 
        unsubscribe();
        unsubscribeUsername();
      }
    }
  }, [loggedInUser]);

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
          <Text style={styles.welcomeText}>Welcome, {username}</Text>
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
            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : (
              <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.noTasksText}>No tasks due today</Text>}
              />
            )}
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
    padding: 15,
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
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noTasksText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

