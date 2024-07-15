import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class GoalItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            popVisible: false,
        };
    } // we need to manage state as such due to the render

    setPopVisibility = (visible) => {
        this.setState({ popVisible: visible });
    };

    render() {
        const { goal, deleteGoal } = this.props;
        const { popVisible } = this.state;

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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
});

export default GoalItem;