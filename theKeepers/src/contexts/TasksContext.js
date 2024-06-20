import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser?.email) {
      const q = query(collection(db, "todo"), where("email", "==", loggedInUser.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const dateKey = data.deadline.toDate().toISOString().split('T')[0];
          if (!tasksData[dateKey]) {
            tasksData[dateKey] = [];
          }
          tasksData[dateKey].push({
            id: doc.id, // Unique identifier for each task document
            title: data.title,
            deadline: data.deadline.toDate()
          });
        });
        setTasks(tasksData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [loggedInUser]);

  return (
    <TasksContext.Provider value={{ tasks, loading }}>
      {children}
    </TasksContext.Provider>
  );
};
