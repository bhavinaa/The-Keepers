# The Keepers - Boost Your Productivity, Ignite Your Motivation, Sharpen Your Focus

## Team Name: The Keepers
**Members:** Bhavina and Sahana  
**Proposed Level of Achievement:** Apollo 11

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Setup and Installation](#setup-and-installation)
5. [Milestone Deliverables](#milestone-deliverables)
6. [Revision History](#revision-history)

---

## 1. Introduction

### Project Overview
Today's students face challenges in maintaining focus, managing tasks, and staying motivated in their studies. To tackle these issues, we propose developing a gamified productivity app.

### Purpose and Goals
The app aims to address common struggles among students, including:
- **Task Management:** Providing a visually appealing platform for organizing assignments, homework, and deadlines.
- **Focus and Concentration:** By incorporating gamification elements, the app will incentivize users to stay focused and improve concentration.
- **Motivation and Engagement:** Through goal-setting, progress tracking, and rewards systems, the app will keep students motivated and engaged in their academic pursuits.

### Scope
- Development of the gamified productivity app.
- Integration of task management features.
- Integration with Google Calendar.
- Development of a leaderboard feature for friendly competition.
- Interval notifications to keep users on track.

#### Limitations or Exclusions
- The app will not cover AI functionalities like task scheduling and recommendations.
- Limited to students and educational contexts.

---

## 2. System Architecture

### High-Level Architecture Diagram

### Components Description

#### User Interface (UI)

**Guest Stack**
1. **Sign Up Screen**
   - **Purpose:** Allows new users to create an account.
   - **Functionality:** Users input their email, password, and other required information. This data is sent to Firebase Authentication to create a new user account.
   - **Interactions:** Communicates with Firebase Authentication to store user credentials and create a new user profile in the database.

2. **Login Screen**
   - **Purpose:** Enables existing users to log into their account.
   - **Functionality:** Users input their email and password, which are authenticated against Firebase Authentication.
   - **Interactions:** Validates user credentials with Firebase Authentication and retrieves user data from Firebase Realtime Database / Firestore.

3. **Forgot Password Screen**
   - **Purpose:** Provides users with a way to reset their password.
   - **Functionality:** Users enter their email address, and a password reset link is sent via Firebase Authentication.
   - **Interactions:** Sends a password reset email using Firebase Authentication.

**Authenticated Stack**
- **Task Organization and Checklist**
  - **Description:** Users can organize tasks into categories and create checklists for each task.
  - **Functionality:**
    - Group tasks by categories (e.g., workout, study). [Milestone 3]
    - Create and manage personalized checklists for each task.
  - **Technical Implementation:**
    - **Frontend:** Task and checklist creation UI, category filters.
    - **Backend:** Store tasks and checklists in Firestore, update tasks based on user interactions.

- **Pomodoro Timers**
  - **Description:** This feature helps users manage their study sessions using the Pomodoro technique.
  - **Functionality:**
    - Start, pause, and reset timers for study sessions.
    - Track completed Pomodoro sessions and breaks.
  - **Technical Implementation:**
    - **Frontend:** Timer UI components, session tracking.
    - **Backend:** Store session data in Firestore, update session history.

- **Calendar Integration**
  - **Purpose:** Helps users manage their schedule by integrating tasks with their calendar.
  - **Functionality:** Users can add tasks to their calendar, view upcoming tasks, and receive reminders.
  - **Interactions:** Syncs task data with a calendar service (e.g., Google Calendar) using Firebase Cloud Functions if needed for complex logic.

- **Profile Screen**
  - **Purpose:** Displays user information and allows users to update their profile.
  - **Functionality:** Users can view and edit their profile details such as name, email, and preferences.
  - **Interactions:** Retrieves and updates user profile data in Firebase Realtime Database / Firestore.

**Extension Features**
- **Reward System**
  - **Description:** Users earn rewards (coins or gems) upon completing tasks.
  - **Functionality:**
    - Track user task completion.
    - Award coins or gems as rewards.
  - **Technical Implementation:**
    - **Frontend:** Display rewards UI, update reward balance.
    - **Backend:** Store rewards data in Firestore, update rewards based on task completion.
   
- **Goal Setting and Tracking with STAR Technique**
  - **Description:** This feature enables users to set and track goals using the SMART (Specific, Measurable, Achievable, Relevant, Time-bound) technique.
  - **Functionality:** Users can set daily, weekly, and semester-wise goals. The app provides progress tracking to ensure users stay on track with their goals.
  - **Technical Implementation:**
    - **Frontend:** Form inputs for goal setting, progress tracking UI components.
    - **Backend:** Store goals and progress data in Firestore, update progress based on user input.

- **Study Group and Pomodoro Technique**
  - **Description:** Allows users to form study groups for collaborative tasks and extra points, integrating the Pomodoro technique.
  - **Functionality:**
    - Form study groups for collaboration.
    - Use the Pomodoro technique for group study sessions with customizable intervals.
  - **Technical Implementation:**
    - **Frontend:** Group creation and management UI, Pomodoro timer integration.
    - **Backend:** Store group data in Firestore, track group sessions.

### Firebase Services

1. **Firebase Authentication**
   - **Purpose:** Manages user authentication, including sign-up, login, and password reset.
   - **Functionality:** Provides APIs for user authentication and secure access to user data.
   - **Interactions:** Communicates with the User Interface to handle authentication requests and responses.

2. **Firebase Realtime Database / Firestore**
   - **Purpose:** Stores and manages all app data, including user profiles, tasks, and timer sessions.
   - **Functionality:** Provides real-time data synchronization and offline capabilities.
   - **Interactions:** Interfaces with the User Interface to read and write data, ensuring up-to-date information is available across all devices.

3. **Firebase Cloud Functions (Optional)**
   - **Purpose:** Executes server-side logic for complex operations and integrations.
   - **Functionality:** Handles tasks like syncing with external services (e.g., Google Calendar), processing data, and sending notifications.
   - **Interactions:** Triggered by Firebase events (e.g., database writes) and communicates with Firebase Realtime Database / Firestore and external APIs.

4. **Firebase Cloud Messaging (Optional)**
   - **Purpose:** Sends push notifications to users.
   - **Functionality:** Provides APIs to send notifications for reminders, task deadlines, and motivational messages.
   - **Interactions:** Integrates with the User Interface to deliver notifications based on user preferences and actions.

---

## 3. Technology Stack

### Frameworks:

#### Frontend Development
- **JavaScript Framework:** React Native
  - Used for building the cross-platform mobile application.
- **Navigation:** React Navigation
  - Provides a comprehensive and customizable navigation solution for the app.
- **State Management:** React Context
  - Manages state and provides a way to share state across the app components.
- **Styling:** StyleSheet
  - For defining the styles and layout of the app components.

#### Backend Development
- **Serverless Backend:** Firebase
  - Provides a scalable and secure backend for the app without the need for managing servers.
- **Database:** Firestore
  - A NoSQL database that provides real-time data synchronization.

---

## 4. Setup and Installation

### Prerequisites
- Required software, hardware, and environment setup.
- Install the Expo Go app on your phone.

### For Android Users Only
![image]![image](https://github.com/user-attachments/assets/55b32c3c-5ca4-45a3-850d-024cc4cb7b63)


For Android users, you can scan this link or click the link below to open the app in the Expo Go app:

[Open in Expo Go]https://expo.dev/preview/update?message=Update%20README%20to%20include%20the%20latest%20details%20for%20milestone%203&updateRuntimeVersion=1.0.0&createdAt=2024-07-29T03%3A23%3A48.479Z&slug=exp&projectId=3d74d242-7c14-4313-befe-b90f0bba69fb&group=c62a12c7-6cd4-463b-b832-5bd681ec3ca5

### IDE / Code Editor Setup
1. Clone the repository.
2. Install Node.js, if you haven't already.
3. Change directory (`cd`) into the project folder.
4. Run `npm install --peer legacy deps` to install all dependencies.
5. Run `npx expo start` to start the project in development mode.

### Test Account
- **Email:** abc4@gmail.com
- **Password:** 123456
- You can also sign up for a new account if needed.

### Troubleshooting Tips
- Run `npx expo start -c` in the terminal to clear the cache.
- Wipe data from the Android virtual debugger if necessary.

---

## 5. Milestone Deliverables

### Submission Documents 
- Documentation
https://docs.google.com/document/d/1gXiRSdGI5auEnxjJfm7tzbP36poShN_hkn9LmrYUS0A/edit?usp=sharing

- time Log


- Poster

- Video 
