import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';

class GoalItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            popVisible: false,
        };
    }

    setPopVisibility = (visible) => {
        this.setState({ popVisible: visible });
    };

    formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    formatRem = (rem) => {
        const date = new Date(rem);
        const opt = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', opt);
    }

    render() {
        const { goal, deleteGoal, toggleReminder } = this.props;
        const { popVisible } = this.state;

        const formattedDeadline = this.formatDate(goal.deadline);

        // Get screen height
        const screenHeight = Dimensions.get('window').height;

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
                        <View style={[styles.modalView, { height: screenHeight * 0.7 }]}>
                            <Text style={styles.modalTitle}>{goal.title}</Text>
                            <Text style={styles.modalContent}>Description:</Text>
                            <Text style={styles.modalContent}>{goal.des}</Text>
                            <Text style={styles.modalContent}>Deadline: {formattedDeadline}</Text>
                            <Text style={styles.modalContent}>Reminder: {goal.reminder}</Text>
                            <ScrollView style={styles.reminderContainer}>
                                {goal.reminderDates.map((rem, index) => {
                                    const formattedDate = this.formatRem(rem.date);
                                    return (
                                        <View key={index} style={styles.reminderItem}>
                                            <TouchableOpacity onPress={() => toggleReminder(goal.id, rem)}>
                                                {rem.checked ? (
                                                    <Feather name="check-circle" size={26} color="#228b22" />
                                                ) : (
                                                    <Feather name="circle" size={26} color="white" />
                                                )}
                                            </TouchableOpacity>
                                            <Text style={styles.reminderText}>{formattedDate}</Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
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

