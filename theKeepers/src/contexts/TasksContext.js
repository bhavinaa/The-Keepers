import React, { createContext, useState, useContext } from 'react';

// Create the context
const TasksContext = createContext();

// Custom hook to use the TasksContext
export const useTasks = () => {
  return useContext(TasksContext);
};

// Provider component to wrap around components that need access to tasks
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});

  // Function to add a new task to the state
  const addTask = (task) => {
    const date = task.deadline.toISOString().split('T')[0]; // Get the date in yyyy-mm-dd format
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: [...(prevTasks[date] || []), task], // Add the new task to the array for that date
    }));
  };

  return (
    // Provide the tasks state and addTask function to child components
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};
