import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, FlatList, TextInput, StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Modal } from 'react-native-paper'; // prefer this as importing from React Native covers the whole screen
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { useGoal } from '../contexts/GoalContext';
import GoalItem from '../components/GoalItem';

export default function GoalScreen({ navigation }) {
    const [popVisible, setPopVisibility] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [selectedReminder, setSelectedReminder] = React.useState("");
    const [date, setDate] = React.useState("");
    const [reVisible, setReVisibilitty] = React.useState(false);
    const { loggedInUser } = useAuth();
    const { goal, deleteGoal, toggleReminder } = useGoal();
    
    const handleAddGoal = async () => {
        if (!validateDate(date)) {
            alert('Please enter the date in yyyy-mm-dd format, and ensure it is after today');
            return;
        }
        if (selectedReminder === "") {
            setSelectedReminder("Never");
        }
    
        const reminderDates = calculateReminderDates(date, selectedReminder);
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
                deadline: Timestamp.fromDate(new Date(date)),
                reminder: selectedReminder,
                reminderDates: datesList,
                reminderCount: reminderCount,
            });
            setPopVisibility(false);
    
            alert("Goal added successfully!");
    
            console.log("Goal document written with ID: ", goalDocRef.id);
    
            for (const reminderDate of reminderDates) {
                await addDoc(collection(db, "calendar"), {
                    email: loggedInUser?.email,
                    title: title,
                    type: "Reminder",
                    goalId: goalDocRef.id,
                    reminderDate: Timestamp.fromDate(new Date(reminderDate)),
                    deadline: Timestamp.fromDate(new Date(date)),
                });
                console.log("added goal in calendar")
            }
            setTitle("");
            setDescription("");
            setSelectedReminder("");
            setDate("");
    
        } catch (error) {
            console.error("Error adding goal: ", error);
            alert("Failed to add goal");
        }
    };
    
    

    const handleAddReminder = async(re) => {
        setSelectedReminder(re);
        setReVisibilitty(false);
    };

    const renderGoalItem = ({ item }) => (
        <GoalItem 
        goal={item} 
        deleteGoal={deleteGoal} 
        toggleReminder={toggleReminder}
        />
    );

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

    const calculateReminderDates = (deadline, reminderFrequency) => {
        const reminderDates = [];
        const endDate = new Date(deadline);
        let currentDate = new Date();
    
        switch (reminderFrequency) {
            case 'Every Day':
                while (currentDate <= endDate) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                break;
            case 'Every Week':
                while (currentDate <= endDate) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setDate(currentDate.getDate() + 7);
                }
                break;
            case 'Every Month':
                while (currentDate <= endDate) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
                break;
            case 'Every Year':
                while (currentDate <= endDate) {
                    reminderDates.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                }
                break;
            default:
                break;
        }
        return reminderDates;
    };


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/the_background.png')} resizeMode='cover' style={styles.image}>
            <View style={styles.goalListContainer}>
                <Text style= {styles.header}>Goal</Text>
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
                    onRequestClose={() => {
                        setPopVisibility(!popVisible);
                    }}
                >   
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor="#696969"
                            value={title}
                            onChangeText={(title) => setTitle(title)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            placeholderTextColor="#696969"
                            value={description}
                            onChangeText={(description) => setDescription(description)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Deadline"
                            placeholderTextColor="#696969"
                            value={date}
                            onChangeText={(date) => setDate(date)}
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
                    onRequestClose={() => {
                        setReVisibilitty(!reVisible);
                    }}
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
                <TouchableOpacity onPress={() => setPopVisibility(true)} style={styles.addButton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Task")} style={styles.backButton}>
                    <Text style={styles.buttonText}>back</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent:"flex-start"
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    goalListContainer: {
        height: '100%',
        width: '100%',
        paddingBottom:40
    },
    header:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical:"top",
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
        paddingTop:5,
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
        paddingTop:5,
    }
});
