import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, FlatList, TextInput, StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Modal } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { useGoal } from '../contexts/GoalContext';
import GoalItem from '../components/GoalItem';
import DatePicker from 'react-native-modern-datepicker';

/**
 * The main screen for managing goals.
 * 
 * @param {Object} navigation - The navigation object provided by React Navigation.
 * 
 * @returns {JSX.Element} - The JSX element for the GoalScreen.
 */


export default function GoalScreen({ navigation }) {
    const [popVisible, setPopVisibility] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [selectedReminder, setSelectedReminder] = React.useState("");
    const [date, setDate] = React.useState("");
    const [reVisible, setReVisibilitty] = React.useState(false);
    const { loggedInUser } = useAuth();
    const { goal, deleteGoal, toggleReminder } = useGoal();

/**
 * Handles the addition of a new goal.
 * 
 * @returns {Promise<void>} - A promise that resolves when the goal is added successfully.
 */

    const handleAddGoal = async () => {
        const formattedDate = date.replace(/\//g, '-');
        
        if (!validateDate(formattedDate)) {
            alert('Please select a valid date');
            return;
        }

        const reminder = selectedReminder || "Never";
        const reminderDates = calculateReminderDates(formattedDate, reminder);
        const datesList = reminderDates.map(r => ({
            date: r,
            checked: false
        }));
        const reminderCount = reminderDates.length;
    
        try {
            const goalDocRef = await addDoc(collection(db, 'goal'), {
                email: loggedInUser?.email,
                title: title,
                description: description,
                deadline: Timestamp.fromDate(new Date(formattedDate)),
                reminder: reminder,
                reminderDates: datesList,
                reminderCount: reminderCount,
            });

            for (const reminderDate of reminderDates) {
                await addDoc(collection(db, "calendar"), {
                    email: loggedInUser?.email,
                    title: title,
                    type: "Reminder",
                    goalId: goalDocRef.id,
                    reminderDate: Timestamp.fromDate(new Date(reminderDate)),
                    deadline: Timestamp.fromDate(new Date(formattedDate)),
                    completion: false,
                });
            }

            setPopVisibility(false);
            setTitle("");
            setDescription("");
            setSelectedReminder("");
            setDate("");
            alert("Goal added successfully!");
        } catch (error) {
            console.error("Error adding goal: ", error);
            alert("Failed to add goal");
        }
    };

/**
 * Handles the addition of a new reminder frequency.
 * 
 * @param {string} re - The reminder frequency to be added.
 * 
 * @returns {void}
 */


    const handleAddReminder = (re) => {
        setSelectedReminder(re);
        setReVisibilitty(false);
    };

/**
 * Renders a single goal item.
 * 
 * @param {Object} item - The goal item to be rendered.
 * 
 * @returns {JSX.Element} - The JSX element for the goal item.
 */

    const renderGoalItem = ({ item }) => (
        <GoalItem 
            goal={item} 
            deleteGoal={deleteGoal} 
            toggleReminder={toggleReminder}
        />
    );

/**
 * Validates the entered date.
 * 
 * @param {string} date - The date to be validated.
 * 
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
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

/**
 * Calculates the reminder dates based on the deadline and reminder frequency.
 * 
 * @param {string} deadline - The deadline for the goal.
 * @param {string} reminderFrequency - The reminder frequency.
 * 
 * @returns {string[]} - An array of reminder dates.
 */

    
    const calculateReminderDates = (deadline, reminderFrequency) => {
        const reminderDates = [];
        const today = new Date();
        let currentDate = new Date(deadline);
    
        switch (reminderFrequency) {
            case 'Every Day':
                while (currentDate >= today) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setDate(currentDate.getDate() - 1);
                }
                break;
            case 'Every Week':
                while (currentDate >= today) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setDate(currentDate.getDate() - 7);
                }
                break;
            case 'Every Month':
                while (currentDate >= today) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setMonth(currentDate.getMonth() - 1);
                }
                break;
            case 'Every Year':
                while (currentDate >= today) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setFullYear(currentDate.getFullYear() - 1);
                }
                break;
            default:
                break;
        }

        reminderDates.reverse();
        
        return reminderDates;
    };

    const renderButtons = () => {
        if (!popVisible && !reVisible) {
            return (
                <>
                    <TouchableOpacity onPress={() => setPopVisibility(true)} style={styles.addButton}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Task")} style={styles.backButton}>
                        <Text style={styles.buttonText}>back</Text>
                    </TouchableOpacity>
                </>
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/the_background.png')} resizeMode='cover' style={styles.image}>
                <View style={styles.goalListContainer}>
                    <Text style={styles.header}>Goal</Text>
                    <FlatList
                        data={goal}
                        renderItem={renderGoalItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.goalList}
                    />
                </View>
                <Modal
                    animationType='slide'
                    visible={popVisible}
                    onRequestClose={() => setPopVisibility(!popVisible)}
                >   
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor="#696969"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            placeholderTextColor="#696969"
                            value={description}
                            onChangeText={setDescription}
                        />

                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode="calendar"
                            textColor="#FFFFFF"
                            style={styles.datePicker}
                        />

                        <View style={styles.row}>
                            <Text style={styles.rem}>Reminder</Text>
                            <TouchableOpacity onPress={() => setReVisibilitty(true)} style={styles.buttonCat}>
                                <Text style={styles.selectRem}>{selectedReminder || "Never >"}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity onPress={handleAddGoal} style={styles.button}>
                            <Text style={styles.buttonText}>Add Goal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => setPopVisibility(!popVisible)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal
                    animationType='slide'
                    visible={reVisible}
                    onRequestClose={() => setReVisibilitty(!reVisible)}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Reminder</Text>
                        <TouchableOpacity onPress={() => handleAddReminder("Every Day")} style={styles.button}>
                            <Text style={styles.buttonText}>Every Day</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAddReminder("Every Week")} style={styles.button}>
                            <Text style={styles.buttonText}>Every Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAddReminder("Every Month")} style={styles.button}>
                            <Text style={styles.buttonText}>Every Month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAddReminder("Every Year")} style={styles.button}>
                            <Text style={styles.buttonText}>Every Year</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAddReminder("Never")} style={styles.button}>
                            <Text style={styles.buttonText}>Never</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setReVisibilitty(!reVisible)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {renderButtons()}
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "flex-start"
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    goalListContainer: {
        height: '100%',
        width: '100%',
        paddingBottom: 40
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: "top",
        marginTop: 40,
    },
    goalList: {
        padding: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#333333",
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
        elevation: 5
    },
    input: {
        height: "auto",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10, 
        borderColor: "white",
        width: "100%",
        color: "white"
    },
    datePicker: {
        width:"119%",
        marginVertical: 20,
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
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
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fffff0',
        textAlign: 'center',
    },
    buttonCat: {
        borderWidth: 1,
        borderRadius: 10, 
        borderColor: "white", 
        width: "auto"
    },
    selectRem: {
        color: "white", 
        fontSize: 20,
        paddingBottom: 5, 
        paddingTop: 5,
        paddingLeft: 10, 
        paddingRight: 10
    },
    addButton: {
        backgroundColor: "#302298",
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 30,
        right: 30,
    },
    backButton: {
        backgroundColor: "#302298",
        width: 70,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 30,
        left: 20,
    },
    title: {
        color: "white", 
        fontSize: 20,
        fontWeight: "bold",
    }, 
    rem: {
        color: "white", 
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 5, 
        paddingTop: 5,
    }
});
