import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase/config'; 


export default function TaskScreen({navigation}) {
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState("");

  const updateTask = () => {
    addDoc(collection(db, "todo"), {
      title: task,
      deadline: date
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert('Task added successfully');
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert('Failed to add task');
    });
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
            placeholder="Deadline"
            placeholderTextColor="#ffffff"
            value={date}
            onChangeText={(date) => setDate(date)}
          />
          <TouchableOpacity onPress={updateTask} style={styles.button}>
            <Text style={styles.input}>Add Task</Text>
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
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#ffffff',
  }
});
