import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { useGoal } from './GoalContext';

const CalendarContext = createContext();

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getCompletion } = useGoal();
    const { loggedInUser } = useAuth();

    useEffect(() => {
        if (loggedInUser?.email) {
            const taskQuery = query(collection(db, "calendar"), where("email", "==", loggedInUser?.email), where("type", "==", "Task"));
            const reminderQuery = query(collection(db, "calendar"), where("email", "==", loggedInUser?.email), where("type", "==", "Reminder"));

            const unsubscribeTask = onSnapshot(taskQuery, (querySnapshot) => {
                const tasks = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const task = data.taskId;
                    tasks.push({
                        id: doc.id,
                        title: data.title || '',
                        type: 'Task',
                        deadline: data.deadline ? new Date(data.deadline.seconds * 1000) : null,
                        completion: task.completed || false ,
                    });
                });
                setTodo((prevTodo) => {
                    const updatedTodo = prevTodo.filter(item => item.type !== 'Task');
                    return [...updatedTodo, ...tasks];
                });
            }, (error) => {
                console.error("Error fetching tasks in calendar: ", error);
            });

            const unsubscribeReminder = onSnapshot(reminderQuery, (querySnapshot) => {
                const reminders = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    reminders.push({
                        id: doc.id,
                        title: data.title || '',
                        type: 'Goal',
                        deadline: data.reminderDate ? new Date(data.reminderDate.seconds * 1000) : null,
                        completion: getCompletion(data.goalID, data.reminderDate),
                    });
                });
                setTodo((prevTodo) => {
                    const updatedTodo = prevTodo.filter(item => item.type !== 'Goal');
                    return [...updatedTodo, ...reminders];
                });
            }, (error) => {
                console.error("Error fetching reminders in calendar: ", error);
            });

            return () => {
                unsubscribeTask();
                unsubscribeReminder();
            };
        }
    }, [loggedInUser, getCompletion]);

    useEffect(() => {
        setLoading(false);
    }, [todo]);

    return (
        <CalendarContext.Provider value={{ todo, loading }}>
            {children}
        </CalendarContext.Provider>
    );
};

