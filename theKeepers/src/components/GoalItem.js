import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Feather from 'react-native-vector-icons/Feather';

class GoalItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            popVisible: false,
            reminders: props.goal.reminderDates,
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
                    <View style={styles.goalContainer}>
                        <Text style={styles.goalText}>{goal.title}</Text>
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={popVisible}
                    onRequestClose={() => this.setPopVisibility(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>{goal.title}</Text>
                            <Text style={styles.modalContent}>Description:</Text>
                            <Text style={styles.modalContent}>{goal.des}</Text>
                            <Text style={styles.modalContent}>Deadline: {goal.deadline}</Text>
                            <Text style={styles.modalContent}>Reminder: {goal.reminder}</Text>
                            <View style={styles.reminderContainer}>
                            {reminders.map((rem, index) => {
                                const formattedDate = new Date(rem.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                                return (
                                    <View key={index} style={styles.reminderItem}>
                                        <TouchableOpacity onPress={() => this.toggleReminder(rem)}>
                                            {rem.checked ? (
                                                <Feather name="check-circle" size={24} color="#228b22" />
                                                ) : (
                                                <Feather name="circle" size={24} color="white" />
                                            )}
                                        </TouchableOpacity>
                                        <Text style={styles.reminderText}>{formattedDate}</Text>
                                    </View>
                                );
                            })}
                            </View>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => this.setPopVisibility(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    goalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        width: "100%",
        height: 60
    },
    goalText: {
        fontSize: 18,
        flex: 1,
        color: "#000000",
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: '#444',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        borderColor: '#FFF',
        borderWidth: 1,
    },
    modalTitle: {
        fontSize: 22,
        marginBottom: 15,
        color: '#FFF',
        fontWeight: 'bold',
    },
    modalContent: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    reminderContainer: {
        width: '100%',
        marginTop: 20,
    },
    reminderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    reminderText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
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
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default GoalItem;