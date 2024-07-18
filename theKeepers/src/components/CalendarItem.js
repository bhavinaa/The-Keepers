import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalendarItem = ({ item }) => {
    return (
        <View style={styles.taskContainer}>
            <View style={styles.taskInfo}>
                <Text style={item.completion? styles.taskTitle: styles.completedTask}>
                    {item.title}
                </Text>
                {item.deadline && (
                    <Text style={styles.taskDeadline}>{new Date(item.deadline).toISOString().split('T')[0]}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        width: "100%",
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 18,
        flex: 1,
    },
    taskDeadline: {
        fontSize: 14,
        color: '#696969',
        marginTop: 4,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#87ceeb',
    },
});

export default CalendarItem;
