import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalendarItem = ({ item }) => {
    return (
        <View style={styles.taskContainer}>
            <View style={styles.taskInfo}>
                <Text style={item.completion? styles.taskTitle: styles.completedTask}>
                    {item.title}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#87ceeb',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        width: "100%",
        height: 70
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 18,
        flex: 1,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        fontSize: 18,
        color: '#696969',
    },
});

export default CalendarItem;
