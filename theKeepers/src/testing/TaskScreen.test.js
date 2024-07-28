import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ToDoListScreen from '../screens/ToDoListScreen';
import { useToDoList } from '../contexts/ToDoListContext';

jest.mock('../contexts/ToDoListContext');

describe('ToDoListScreen', () => {
  beforeEach(() => {
    useToDoList.mockReturnValue({
      toDoList: [],
      loading: true,
      addToDoList: jest.fn(),
      deleteToDoListItem: jest.fn(),
    });
  });

  test('displays loading state while fetching or updating toDoList', async () => {
    const { getByTestId } = render(<ToDoListScreen />);

    // Check if loading indicator is displayed
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();

    // Wait for loading state to be false
    await waitFor(() => {
      expect(useToDoList().loading).toBe(false);
    });

    // Check if loading indicator is no longer displayed
    expect(getByTestId('loading-indicator')).toBeFalsy();
  });

  test('displays toDoList items after fetching', async () => {
    useToDoList.mockReturnValue({
      toDoList: [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
      ],
      loading: false,
      addToDoList: jest.fn(),
      deleteToDoListItem: jest.fn(),
    });

    const { getByText } = render(<ToDoListScreen />);

    // Wait for toDoList items to be rendered
    await waitFor(() => {
      expect(getByText('Task 1')).toBeTruthy();
      expect(getByText('Task 2')).toBeTruthy();
    });
  });

  test('handles adding a new task', async () => {
    const addToDoListMock = jest.fn();
    useToDoList.mockReturnValue({
      toDoList: [],
      loading: false,
      addToDoList: addToDoListMock,
      deleteToDoListItem: jest.fn(),
    });

    const { getByPlaceholderText, getByTestId } = render(<ToDoListScreen />);

    // Fill in the input field and submit
    const input = getByPlaceholderText('Add New Task');
    fireEvent.changeText(input, 'New Task');
    fireEvent.press(getByTestId('submit-button'));

    // Wait for addToDoList to be called with the new task
    await waitFor(() => {
      expect(addToDoListMock).toHaveBeenCalledWith('New Task');
    });
  });

  test('handles deleting a task', async () => {
    const deleteToDoListItemMock = jest.fn();
    useToDoList.mockReturnValue({
      toDoList: [
        { id: '1', title: 'Task 1' },
      ],
      loading: false,
      addToDoList: jest.fn(),
      deleteToDoListItem: deleteToDoListItemMock,
    });

    const { getByText } = render(<ToDoListScreen />);

    // Press the delete button for the task
    fireEvent.press(getByText('delete'));

    // Wait for deleteToDoListItem to be called with the task's id
    await waitFor(() => {
      expect(deleteToDoListItemMock).toHaveBeenCalledWith('1');
    });
  });

  test('handles deleting all tasks', async () => {
    const deleteToDoListItemMock = jest.fn();
    useToDoList.mockReturnValue({
      toDoList: [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
      ],
      loading: false,
      addToDoList: jest.fn(),
      deleteToDoListItem: deleteToDoListItemMock,
    });

    const { getByTestId } = render(<ToDoListScreen />);

    // Press the delete all button
    fireEvent.press(getByTestId('delete-all-button'));

    // Wait for deleteToDoListItem to be called with each task's id
    await waitFor(() => {
      expect(deleteToDoListItemMock).toHaveBeenCalledTimes(2);
      expect(deleteToDoListItemMock).toHaveBeenCalledWith('1');
      expect(deleteToDoListItemMock).toHaveBeenCalledWith('2');
    });
  });
});