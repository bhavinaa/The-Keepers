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
import Sidebar from '../components/Sidebar';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';

export default function TaskScreen({ navigation }) {
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [popVisible, setPopVisibility] = React.useState(false);
  const [popCat, setCatVisibility] = React.useState(false);
  const [popAddCat, setAddCatVisibility] = React.useState(false);
  const [sidebarVisible, setSidebarVisibility] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectNewCat, setSelectedNewCat] = React.useState("");
  const { loggedInUser } = useAuth();
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();
  const {cat, deleteCat} = useCat();
  const [open, setOpen] = React.useState(false);

  const handleAddTask = async () => {
    const formattedDate = date.replace(/\//g, '-');
    setDate(formattedDate)

    if (!validateDate(formattedDate)) {
        alert('Please select a valid date');
        return;
    }

    try {
        const dateObject = new Date(formattedDate);

        const docRef = await addDoc(collection(db, "todo"), {
            email: loggedInUser?.email,
            title: task,
            completed: false,
            deadline: Timestamp.fromDate(dateObject),
            category: selectedCategory
        });
        const calDocRef = await addDoc(collection(db, "calendar"), {
            email: loggedInUser?.email,
            title: task,
            type: "Task",
            taskId: docRef.id,
            deadline: Timestamp.fromDate(dateObject),
            completion: false,
        });
        console.log("Document written with ID: ", docRef.id, selectedCategory);
        setPopVisibility(false);
        alert("Task added successfully!");
        setTask("");
        setDate(new Date());
        setSelectedCategory("");
    } catch (error) {
        console.error("Error adding document in taskscreen: ", error);
        alert('Failed to add task');
    }
};

  const validateDate = (date) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!regex.test(date)) {
        return false;
    }
    const enteredDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return enteredDate > today;
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

  const closeSidebar = () => {
    setSidebarVisibility(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/the_background.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={() => setSidebarVisibility(true)}>
            <AntDesign name="bars" size={38} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.header}>Tasks</Text>

          <TouchableOpacity
            style={styles.addButtonGoal}
            onPress={() => navigation.navigate('Goal')}
          >
            <Text style={styles.addButtonText}>G</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setPopVisibility(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.taskListContainer}>
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.taskList}
          />
        </View>

        {sidebarVisible && (
          <Sidebar
            animationType='slide' 
            categories={cat}
            closeSidebar={closeSidebar} 
          />
        )}

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
            
            <DatePicker
              date={date}
              onDateChange={(date) => setDate(date)}
              mode="calendar"
              textColor="#FFFFFF"
              style={styles.datePicker}
            />

            <View style={styles.row}>
              <Text style={styles.catText}> Category</Text>
              <TouchableOpacity onPress={() => setCatVisibility(true)} style={styles.buttonCat}>
                <Text style={styles.buttonCatText}>{selectedCategory || "None >"}</Text>
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
              contentContainerStyle={styles.catList}
            />

            <TouchableOpacity style={styles.button} onPress={() => setAddCatVisibility(true)}>
              <Text style={styles.buttonText}>Add Category</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setCatVisibility(false)}>
              <Text style={styles.buttonText}>Close</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 35,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'white',
    width: '100%',
    color: 'white',
  },
  datePicker: {
    width:"118%",
    marginVertical: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#302298',
    borderRadius: 20,
    margin: 14,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCat: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fffff0',
    textAlign: 'center',
  },
  buttonCatText: {
    color: 'white',
    fontSize: 20,
  },
  addButton: {
    backgroundColor: '#302298',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonGoal: {
    backgroundColor: '#302298',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fffff0',
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
  },
  taskListContainer: {
    height: '100%',
    width: '100%',
    paddingBottom: 40,
  },
  taskList: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  catText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 5,
  },
  catList: {
    height: 'auto',
    width: 'auto',
    paddingBottom: 20,
  },
});
