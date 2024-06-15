import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, TextInput, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from '../firebase/config'; 

export default function TaskScreen({navigation}) {
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState("");

  const addTask = () => {
    if (!validateDate(date)) {
      alert('Please enter the date in yyyy-mm-dd format');
      return;
    }

    addDoc(collection(db, "todo"), {
      title: task,
      deadline: Timestamp.fromDate(new Date(date))
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert('Task added successfully');
      setTask("");
      setDate(""); 
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert('Failed to add task');
    });
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
        <TouchableOpacity onPress={addTask} style={styles.button}>
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
    width: "80%", // Adjusted width for wider input boxes
    height: 40,
    borderColor: "gray",
    marginTop: 15,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    color: "#ffffff", // Adjusted text color to white
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "80%", // Adjusted width for the button to match input boxes
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
    textAlign: 'center', // Ensures text alignment in the text component itsel
  }
});
