import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';

// Mock the getFocusTip function from firebase/openAI
jest.mock('../firebase/openAI', () => ({
  getFocusTip: jest.fn().mockResolvedValue('Mock Focus Tip'),
}));

describe('Pomodoro Timer', () => {
  test('renders the timer and buttons correctly', () => {
    const { getByText } = render(<App />);

    // Check if the timer and buttons are rendered
    expect(getByText('Pomodoro')).toBeTruthy();
    expect(getByText('Start Timer')).toBeTruthy();
    expect(getByText('Short Break')).toBeTruthy();
    expect(getByText('Long Break')).toBeTruthy();
    expect(getByText('Pause')).toBeTruthy();
    expect(getByText('Stop')).toBeTruthy();
  });

  test('starts the timer when the "Start Timer" button is pressed', async () => {
    const { getByText } = render(<App />);

    fireEvent.press(getByText('Start Timer'));

    // Wait for the timer to update
    await waitFor(() => expect(getByText(/[0-5][0-9]:[0-5][0-9]/)).toBeTruthy());
  });

  test('notifies the user when the timer finishes', async () => {
    const { getByText } = render(<App />);

    fireEvent.press(getByText('Start Timer'));

    // Wait for the timer to finish
    await waitFor(() => expect(getByText('Timer Finished')).toBeTruthy());
  });

  test('pauses and resumes the timer', async () => {
    const { getByText } = render(<App />);

    fireEvent.press(getByText('Start Timer'));

    // Wait for the timer to update
    await waitFor(() => expect(getByText(/[0-5][0-5]:[0-5][0-9]/)).toBeTruthy());

    fireEvent.press(getByText('Pause'));
    expect(getByText('Resume')).toBeTruthy();

    fireEvent.press(getByText('Resume'));
    expect(getByText('Pause')).toBeTruthy();
  });

  test('stops the timer when the "Stop" button is pressed', async () => {
    const { getByText } = render(<App />);

    fireEvent.press(getByText('Start Timer'));

    // Wait for the timer to update
    await waitFor(() => expect(getByText(/[0-5][0-5]:[0-5][0-9]/)).toBeTruthy());

    fireEvent.press(getByText('Stop'));
    expect(getByText('Start')).toBeTruthy();
  });
});