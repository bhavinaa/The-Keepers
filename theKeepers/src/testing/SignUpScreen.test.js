import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../screens/SignUpScreen';
import AuthContext, { AuthProvider } from '../contexts/AuthContext'; 
import { authentication } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection } from 'firebase/firestore';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  setDoc: jest.fn(),
  doc: jest.fn(() => ({ id: 'mockDocId' })),
  collection: jest.fn(),
}));

jest.mock('../firebase/config', () => ({
  authentication: {},
  db: {},
}));

describe('SignUpScreen', () => {
  const navigation = { navigate: jest.fn() };

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <SignUpScreen navigation={navigation} />
      </AuthProvider>
    );
  };

  it('saves the username during signup', async () => {
    const user = { user: { email: 'testuser@example.com' } };
    createUserWithEmailAndPassword.mockResolvedValueOnce(user);

    console.log('Rendering component');
    const { getByPlaceholderText, getByText } = renderComponent();
    console.log('Component rendered');

    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    console.log('Username entered');
    fireEvent.changeText(getByPlaceholderText('Email'), 'testuser@example.com');
    console.log('Email entered');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    console.log('Password entered');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    console.log('Confirm password entered');

    fireEvent.press(getByText('Sign Up'));
    console.log('Sign Up pressed');

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        authentication,
        'testuser@example.com',
        'password123'
      );
      expect(setDoc).toHaveBeenCalledWith(
        { id: 'mockDocId' }, // The document reference
        { username: 'testuser' }
      );
    });

    expect(navigation.navigate).toHaveBeenCalledWith('Home');
    console.log('Navigation to Home triggered');
  }, 10000); // Increase timeout to 10 seconds
});