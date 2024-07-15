import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

class GoalItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            popVisible: false,
            reminders: props.goal.reminderDates, // assuming reminderDates is an array of objects with 'date' and 'checked' properties
        };
    }

    setPopVisibility = (visible) => {
        this.setState({ popVisible: visible });
    };

    toggleReminder = async (reminder) => {
        const updatedReminders = this.state.reminders.map(r => {
            if (r.date === reminder.date) {
                return { ...r, checked: !r.checked };
            }
            return r;
        });

        this.setState({ reminders: updatedReminders });

        const goalDoc = doc(db, 'goal', this.props.goal.id);
        await updateDoc(goalDoc, {
            reminderDates: updatedReminders,
        });
    };

    render() {
        const { goal, deleteGoal } = this.props;
        const { popVisible, reminders } = this.state;

        return (
            <Swipeable
                renderRightActions={() => (
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteGoal(goal.id)}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                )}
            >
                <TouchableOpacity onPress={() => this.setPopVisibility(true)}>
                    <View style={styles.catContainer}>
                        <Text style={styles.categoryText}>{goal.title}</Text>
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={popVisible}
                    onRequestClose={() => this.setPopVisibility(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.categoryText}>{goal.title}</Text>
                        <Text style={styles.categoryText}>{goal.des}</Text>
                        <Text style={styles.categoryText}>{goal.deadline}</Text>
                        <Text style={styles.categoryText}>{goal.reminder}</Text>
                        {reminders.map((rem, index) => (
                            <TouchableOpacity key={index} onPress={() => this.toggleReminder(rem)}>
                                <Text style={styles.reminderText}>
                                    {rem.date} - {rem.checked ? "Completed" : "Pending"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => this.setPopVisibility(false)}
                        >
                            <Text style={styles.categoryText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    catContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    categoryText: {
        color: 'white',
        fontSize: 18,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        padding: 35,
    },
    closeButton: {
        backgroundColor: "#302298",
        borderRadius: 20,
        padding: 10,
        margin: 14,
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    reminderText: {
        color: 'white',
        fontSize: 16,
    }
});

export default GoalItem;

