import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, FlatList, TextInput, StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Feather from 'react-native-vector-icons/Feather';
import { db } from '../firebase/config'; 
import { useTasks } from '../contexts/TasksContext'; 
import { useAuth } from '../contexts/AuthContext';
import { Modal } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function TaskScreen({ navigation }) {
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState("");
  const [popVisible, setPopVisibility] = React.useState(false);
  const { loggedInUser } = useAuth();
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();

  const handleAddTask = async () => {
    if (!validateDate(date)) {
      alert('Please enter the date in yyyy-mm-dd format'); // check format
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "todo"), {
        email: loggedInUser?.email,
        title: task,
        completed: false, 
        deadline: Timestamp.fromDate(new Date(date))
      });
      console.log("Document written with ID: ", docRef.id);
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

  const renderItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      >
        <View style={styles.taskContainer}>
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDeadline}>{item.deadline.toISOString().split('T')[0]}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleTaskCompletion(item.id, item.completed)}
          >
            {item.completed ? (
              <Feather name="check-circle" size={24} color="green" />
            ) : (
              <Feather name="circle" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.taskListContainer}>
          <Text style= {styles.header}>Tasks</Text>
          <FlatList
            data={Object.keys(tasks).map(key => ({ date: key, data: tasks[key] })).flatMap(item => item.data)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.taskList}
          />
        </View>

        <Modal
          animationType='slide'
          visible={popVisible}
          onRequestClose={() => {
            setPopVisibility(!popVisible);
          }}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Task"
              placeholderTextColor="#696969"
              value={task}
              onChangeText={(task) => setTask(task)}
            />

            <TextInput
              style={styles.input}
              placeholder="yyyy-mm-dd"
              placeholderTextColor="#696969"
              value={date}
              onChangeText={(date) => setDate(date)}
            />

            <TouchableOpacity onPress={handleAddTask} style={styles.button}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setPopVisibility(!popVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setPopVisibility(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
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
  header:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
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
    color: "#000000",
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
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fffff0',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: "#302298",
    width: 60,
    height: 60, 
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    right: 30,
    position: 'absolute',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#fffff0',
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  taskListContainer: {
    height: '100%',
    width: '100%',
  },
  taskList: {
    padding: 20,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: "100%",
  },
  taskInfo: {
    flex: 1,
    color: "#000000",
  },
  taskTitle: {
    fontSize: 18,
    flex: 1,
    color: "#000000",
  },
  taskDeadline:{
    fontSize: 14,
    color: '#696969',
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    color: 'black',
    fontSize: 17,
    marginLeft: 10,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
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
