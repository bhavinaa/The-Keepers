import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, TextInput, Alert, StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from '../firebase/config'; 
import { useTasks } from '../contexts/TasksContext'; 
import { useAuth } from '../contexts/AuthContext';

export default function ToDoListScreen({ navigation }) {
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState("");
  const { loggedInUser } = useAuth();

  const handleAddTask = async () => {
    if (!validateDate(date)) {
      alert('Please enter the date in yyyy-mm-dd format'); // check format
      return;
    }
    
  /*
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    alert('Invalid date. Please enter a valid date.'); dont use it, can take input s.a 1672
    return;
  }
    */

    try {
      const docRef = await addDoc(collection(db, "todo"), { //update to general id
        email: loggedInUser?.email,
        title: task,
        deadline: Timestamp.fromDate(new Date(date))
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate('Calendar');
      setTask("");
      setDate("");
    } catch (error) {
      console.error("Error adding document in taskscreen: ", error);
      alert('Failed to add task');
    }
  };

  const validateDate = (date) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <TextInput
          style={styles.input}
          placeholder="Task"
          placeholderTextColor="#ffffff"
          value={task}
          onChangeText={(task) => setTask(task)}
        />

        <TextInput
          style={styles.input}
          placeholder="yyyy-mm-dd"
          placeholderTextColor="#ffffff"
          value={date}
          onChangeText={(date) => setDate(date)}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.button}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    margin: 0,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    marginTop: 15,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    color: "#ffffff",
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#fffff0',
    textAlign: 'center',
  }
});

