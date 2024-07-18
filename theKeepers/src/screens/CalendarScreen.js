import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useCalendar } from '../contexts/CalendarContext';
import CalendarItem from '../components/CalendarItem';
import { format } from 'date-fns';

export default function CalendarScreen() {
    const { todo, loading } = useCalendar();

    const renderEmptyData = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No tasks for this day</Text>
        </View>
    );

    const renderItem = (item) => (
        <CalendarItem item={item} />
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const formattedTasks = todo.reduce((acc, task) => {
        const date = new Date(task.deadline);
        if (isNaN(date)) {
            console.error(`Invalid date for task ${task.title}: ${task.deadline}`);
            return acc;
        }
        const formattedDate = format(date, 'yyyy-MM-dd');
        if (!acc[formattedDate]) {
            acc[formattedDate] = [];
        }
        acc[formattedDate].push(task);
        return acc;
    }, {});

    return (
        <SafeAreaView style={styles.container}>
            <Agenda
                items={formattedTasks}
                showOnlySelectedDayItems={true}
                renderEmptyData={renderEmptyData}
                renderItem={(item, isFirst) => renderItem(item)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
