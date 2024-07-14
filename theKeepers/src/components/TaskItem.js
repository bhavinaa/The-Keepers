import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class TaskItem extends PureComponent {
  render() {
    const { item, toggleTaskCompletion, deleteTask } = this.props;
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
            <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
              {item.title}
            </Text>

            <View style={styles.row}>
              <Text style={styles.taskDeadline}>{item.deadline.toISOString().split('T')[0]}</Text>
              <Text style={styles.taskDeadline}>{item.category}</Text>
            </View>

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
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  taskCategory: {
    fontSize: 14,
    color: '#696969',
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#302298',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '75%',
    marginTop: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 20,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
});

export default TaskItem;

