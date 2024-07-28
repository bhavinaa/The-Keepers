// ProfileScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen'; // Adjust the path as needed
import { useAuth } from '../contexts/AuthContext';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    loggedInUser: { email: 'testuser@example.com' },
    setLoggedInUser: jest.fn(),
  }),
}));

// Mock the Firebase imports
jest.mock('../firebase/config', () => ({
  db: { doc: jest.fn() },
  authentication: { signOut: jest.fn() },
}));

// Mock expo-image-picker

describe('ProfileScreen', () => {
  test('renders profile information correctly', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);

    expect(getByText('Stargazer')).toBeTruthy();
    expect(getByText('testuser@example.com')).toBeTruthy();
  });

  test('triggers signOut when Sign Out button is pressed', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);

    const mockSignOut = jest.fn();
    require('../firebase/config').authentication.signOut = mockSignOut;

    fireEvent.press(getByText('Sign Out'));

    expect(mockSignOut).toHaveBeenCalled();
  });

  // If you need to test level up animations, you'll need to use more advanced testing strategies
  // or simulate the state changes as needed.
});
