import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, FlatList, TextInput, StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from '../firebase/config'; 
import { useTasks } from '../contexts/TasksContext'; 
import { useAuth } from '../contexts/AuthContext';
import { useCat} from '../contexts/CatContext';
import { Modal } from 'react-native-paper';
import TaskItem from '../components/TaskItem';
import CatItem from '../components/CatItem';

export default function TaskScreen({ navigation }) {
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState("");
  const [popVisible, setPopVisibility] = React.useState(false);
  const [popCat, setCatVisibility] = React.useState(false);
  const [popAddCat, setAddCatVisibility] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectNewCat, setSelectedNewCat] = React.useState("");
  const { loggedInUser } = useAuth();
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();
  const {cat, deleteCat} = useCat();

  const handleAddTask = async () => {
    if (!validateDate(date)) {
      alert('Please enter the date in yyyy-mm-dd format');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "todo"), {
        email: loggedInUser?.email,
        title: task,
        completed: false, 
        deadline: Timestamp.fromDate(new Date(date)),
        category: selectedCategory
      });
      console.log("Document written with ID: ", docRef.id, selectedCategory);
      setTask("");
      setDate("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error adding document in taskscreen: ", error);
      alert('Failed to add task');
    }

    setPopVisibility(false);
  };

  const handleAddCategory = () => {
    setCatVisibility(false);
  };

  const validateDate = (date) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date);
  };

  const renderTaskItem = ({ item }) => (
    <TaskItem 
      item={item} 
      toggleTaskCompletion={toggleTaskCompletion} 
      deleteTask={deleteTask} 
    />
  );

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCatVisibility(false);
  };

  const renderCatItem = ({ item }) => (
    <CatItem 
    cat={item} 
    selectCategory={selectCategory} 
    deleteCat={deleteCat} 
    />
  );



  const addCat = async () => {
    if (selectNewCat == "") {
      alert('Please enter a category');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "category"), {
        email: loggedInUser?.email,
        cat: selectNewCat
      });
      console.log("Document written with ID: ", docRef.id, selectNewCat);
      setSelectedNewCat("");
    } catch (error) {
      console.error("Error adding category document in taskscreen: ", error);
      alert('Failed to add a new category');
    }

    setAddCatVisibility(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.taskListContainer}>
          <Text style= {styles.header}>Tasks</Text>
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
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
            <View style = {styles.row}>
              <Text>Category</Text>
              <TouchableOpacity onPress={() => setCatVisibility(true)} style={styles.buttonCat}>
                <Text style={styles.buttonCatText}>{selectedCategory || "Select Category >"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleAddTask} style={styles.button}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setPopVisibility(!popVisible)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType='slide'
          visible={popCat}
          onRequestClose={() => {
            setPopVisibility(!popCat);
          }}
        >
          <View style={styles.modalView}>
            <FlatList
              data = {cat}
              renderItem={renderCatItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.taskList}
            />
            
            <TouchableOpacity style={styles.button} onPress={() => setCatVisibility(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setAddCatVisibility(true)}>
              <Text style={styles.buttonText}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType='slide'
          visible={popAddCat}
          onRequestClose={() => {
            setAddCatVisibility(!popAddCat);
          }}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Category"
              placeholderTextColor="#696969"
              value={selectNewCat}
              onChangeText={(selectNewCat) => setSelectedNewCat(selectNewCat)}
            />

            <TouchableOpacity onPress={addCat} style={styles.button}>
              <Text style={styles.buttonText}>Add Category</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setAddCatVisibility(!popAddCat)}>
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
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCat: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "60%",
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
  buttonCatText: {
    fontSize: 16,
    color: 'black',
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
    paddingBottom:40
  },
  taskList: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
});