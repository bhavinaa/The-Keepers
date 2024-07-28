import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, increment, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksByCategory, setTasksByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser?.email) {
      const q = query(collection(db, "todo"), where("email", "==", loggedInUser?.email),orderBy("completed", "asc"), orderBy("deadline", "asc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
      }
    }
  }, [loggedInUser]);

  const toggleTaskCompletion = async (taskId, completed) => {
    const taskDoc = doc(db, "todo", taskId);
    const taskSnap = await getDoc(taskDoc);
    
    if (taskSnap.exists()) {
      await updateDoc(taskDoc, { completed: !completed });
      const check = !completed;
      console.log("task updated", check);
      const q = query(collection(db, 'calendar'), where("taskId", "==", taskId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("doc updated");
          const calendarDoc = querySnapshot.docs[0].ref; 
          await updateDoc(calendarDoc, {
            completion: check,
          });
          console.log("task updated in calendar");
      }

      const rewardDoc = doc(db, "rewards", loggedInUser?.email);
      const rewardSnap = await getDoc(rewardDoc);
      
      if(rewardSnap.exists()){
        let pointsChange = check ? 100 : -100;
        await updateDoc(rewardDoc, {
            points: increment(pointsChange)
        })
    }
    }

  };

  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, "todo", taskId);
    await deleteDoc(taskDoc);

    const q = query(collection(db, 'calendar'), where("taskId", "==", taskId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const calendarDoc = querySnapshot.docs[0].ref; 
        await deleteDoc(calendarDoc);
        console.log("deleted successfully")
    }
};

const getTasksByCategory = async (cat) => {
  if (loggedInUser?.email) {
    const q = query(collection(db, "todo"), where("email", "==", loggedInUser?.email), where("category", "==", cat));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
      setTasksByCategory(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }
}

  return (
    <TasksContext.Provider value={{ tasks, loading, toggleTaskCompletion, deleteTask, getTasksByCategory, tasksByCategory }}>
      {children}
    </TasksContext.Provider>
  );
};
