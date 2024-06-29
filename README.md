# The Keepers - Boost Your Productivity, Ignite Your Motivation, Sharpen Your Focus

## Team Name: The Keepers
**Members:** Bhavina and Sahana  
**Proposed Level of Achievement:** Apollo 11

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Setup and Installation](#setup-and-installation)
5. [Appendix](#appendix)

---

## 1. Introduction

### Project Overview
Today's students face challenges in maintaining focus, managing tasks, and staying motivated in their studies. To tackle these issues, we propose developing a gamified productivity app.

### Purpose and Goals
The app aims to address common struggles among students, including:
- **Task Management**: Providing a visually appealing platform for organizing assignments, homework, and deadlines.
- **Focus and Concentration**: By incorporating gamification elements, the app will incentivize users to stay focused and improve concentration.
- **Motivation and Engagement**: Through goal-setting, progress tracking, and rewards systems, the app will keep students motivated and engaged in their academic pursuits.

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

## User Stories

1. **As a student overwhelmed by tasks**, I want to easily organize my assignments and deadlines within the app, so I can manage my workload efficiently and reduce stress.

2. **As a student struggling to stay focused while studying**, I want the app to provide interactive challenges and rewards to keep me motivated and engaged, helping me maintain concentration and productivity.

3. **As a student looking for motivation in my academic journey**, I want the app to track my progress, set achievable goals, and reward my accomplishments, so I feel a sense of achievement and stay committed to my studies.

---

### Audience
- **Developers**: For understanding the system architecture, setup, and maintenance.
- **Users**: For insights into how to use the app effectively.
- **Stakeholders**: For understanding the project’s value, scope, and progress.

---

## 2. System Architecture

### High-Level Architecture Diagram
  
                     +----------------------+
                     |                      |
                     |   Firebase Backend   |
                     |                      |
                     +----------------------+
                     |   Authentication     |
                     |   Firestore          |
                     |   Storage            |
                     +----------------------+
                               |
                               |
                      +----------------+
                      | React Native    |
                      | Frontend        |
                      +----------------+
                               |
           +-------------------+-------------------+
           |                   |                   |
+----------------+    +----------------+    +----------------+
|   Guest Stack  |    |    App Stack   |    |   Contexts     |
|                |    |                |    |                |
+----------------+    +----------------+    +----------------+
           |                                    |
           |                                    |
+----------+----------+            +------------+------------+
|  Login Screen       |            |  Stack Navigator        |
|  Sign Up Screen     |            |   +-------------------+ |
|  Forgot Password    |            |   |  Main Screen      | |
+---------------------+            |   |  EditProfile      | |
                                    |   +-------------------+ |
                                    |                        |
                                    +------------------------+
                                                |
                                                |
                                +---------------+---------------+
                                | Bottom Tab Navigator          |
                                +-------------------------------+
                                |  Pomodoro Screen              |
                                |  Home Screen                  |
                                |  Profile Screen               |
                                |  Task Screen                  |
                                +-------------------------------+

+---------------------+
|   Auth Context      |
|   (Authentication)  |
+---------------------+
+---------------------+
|   Task Context      |
|   (Task Management) |
+---------------------+

                               +----------------------+
                               |                      |
                               | Firestore Database   |
                               |                      |
                               +----------------------+
                               | Users Collection     |
                               |   - Email            |
                               |   - Tasks Subcollection|
                               +----------------------+


### Components Description

#### User Interface (UI)

##### Guest Stack
1. **Sign Up Screen**
   - **Purpose**: Allows new users to create an account.
   - **Functionality**: Users input their email, password, and other required information. This data is sent to Firebase Authentication to create a new user account.
   - **Interactions**: Communicates with Firebase Authentication to store user credentials and create a new user profile in the database.

2. **Login Screen**
   - **Purpose**: Enables existing users to log into their account.
   - **Functionality**: Users input their email and password, which are authenticated against Firebase Authentication.
   - **Interactions**: Validates user credentials with Firebase Authentication and retrieves user data from Firebase Realtime Database / Firestore.

3. **Forgot Password Screen**
   - **Purpose**: Provides users with a way to reset their password.
   - **Functionality**: Users enter their email address, and a password reset link is sent via Firebase Authentication.
   - **Interactions**: Sends a password reset email using Firebase Authentication.

##### Authenticated Stack
Core Features
- **Task Organization and Checklist**
  - **Description**: Users can organize tasks into categories and create checklists for each task.
  - **Functionality**:
    - Group tasks by categories (e.g., workout, study). [milestone 3]
    - Create and manage personalized checklists for each task.
  - **Technical Implementation**:
    - **Frontend**: Task and checklist creation UI, category filters.
    - **Backend**: Store tasks and checklists in Firestore, update tasks based on user interactions.

- **Pomodoro Timers**
  - **Description**: This feature helps users manage their study sessions using the Pomodoro technique.
  - **Functionality**:
    - Start, pause, and reset timers for study sessions.
    - Track completed Pomodoro sessions and breaks.
  - **Technical Implementation**:
    - **Frontend**: Timer UI components, session tracking.
    - **Backend**: Store session data in Firestore, update session history.

- **Calendar Integration**
  - **Purpose**: Helps users manage their schedule by integrating tasks with their calendar.
  - **Functionality**: Users can add tasks to their calendar, view upcoming tasks, and receive reminders.
  - **Interactions**: Syncs task data with a calendar service (e.g., Google Calendar) using Firebase Cloud Functions if needed for complex logic.

- **Profile Screen**
  - **Purpose**: Displays user information and allows users to update their profile.
  - **Functionality**: Users can view and edit their profile details such as name, email, and preferences.
  - **Interactions**: Retrieves and updates user profile data in Firebase Realtime Database / Firestore.

Extension Features
- **Reward System**
  - **Description**: Users earn rewards (coins or gems) upon completing tasks.
  - **Functionality**:
    - Track user task completion.
    - Award coins or gems as rewards.
  - **Technical Implementation**:
    - **Frontend**: Display rewards UI, update reward balance.
    - **Backend**: Store rewards data in Firestore, update rewards based on task completion.
   
- **Goal Setting and Tracking with STAR Technique**
  - **Description**: This feature enables users to set and track goals using the SMART (Specific, Measurable, Achievable, Relevant, Time-bound) technique.
  - **Functionality**: Users can set daily, weekly, and semester-wise goals. The app provides progress tracking to ensure users stay on track with their goals.
  - **Technical Implementation**:
    - **Frontend**: Form inputs for goal setting, progress tracking UI components.
    - **Backend**: Store goals and progress data in Firestore, update progress based on user input.

- **Study Group and Pomodoro Technique**
  - **Description**: Allows users to form study groups for collaborative tasks and extra points, integrating the Pomodoro technique.
  - **Functionality**:
    - Form study groups for collaboration.
    - Use the Pomodoro technique for group study sessions with customizable intervals.
  - **Technical Implementation**:
    - **Frontend**: Group creation and management UI, Pomodoro timer integration.
    - **Backend**: Store group data in Firestore, track group sessions.

### Firebase Services

1. **Firebase Authentication**
   - **Purpose**: Manages user authentication, including sign-up, login, and password reset.
   - **Functionality**: Provides APIs for user authentication and secure access to user data.
   - **Interactions**: Communicates with the User Interface to handle authentication requests and responses.

2. **Firebase Realtime Database / Firestore**
   - **Purpose**: Stores and manages all app data, including user profiles, tasks, and timer sessions.
   - **Functionality**: Provides real-time data synchronization and offline capabilities.
   - **Interactions**: Interfaces with the User Interface to read and write data, ensuring up-to-date information is available across all devices.

3. **Firebase Cloud Functions (Optional)**
   - **Purpose**: Executes server-side logic for complex operations and integrations.
   - **Functionality**: Handles tasks like syncing with external services (e.g., Google Calendar), processing data, and sending notifications.
   - **Interactions**: Triggered by Firebase events (e.g., database writes) and communicates with Firebase Realtime Database / Firestore and external APIs.

4. **Firebase Cloud Messaging (Optional)**
   - **Purpose**: Sends push notifications to users.
   - **Functionality**: Provides APIs to send notifications for reminders, task deadlines, and motivational messages.
   - **Interactions**: Integrates with the User Interface to deliver notifications based on user preferences and actions.

---

## 3. Technology Stack

### Frameworks: 

#### Frontend Development
- **JavaScript Framework**: React Native
  - Used for building the cross-platform mobile application.
- **Navigation**: React Navigation
  - Provides a comprehensive and customizable navigation solution for the app.
- **State Management**: React Context
  - Manages state and provides a way to share state across the app components.
- **Styling**: StyleSheet
  - For defining the styles and layout of the app components.

#### Backend Development
- **Serverless Backend**: Firebase
  - Provides a scalable and secure backend for the app without the need for managing servers.
- **Database**: Firestore
  - A NoSQL database that provides real-time data synchronization 
---

## Architecture and Design

Our app follows a client-server architecture, with the frontend developed using React Native and the backend hosted on Firebase. The app's architecture includes the following components:

- **Client-side:** Developed using React Native, the frontend comprises different screens for task management, goal setting, and tracking progress.
- **Server-side:** Hosted on Firebase, the backend includes services for authentication, data storage, and real-time updates using Firestore.

---

## 4. Setup and Installation

### Prerequisites
Required software, hardware, and environment setup.

### For Android Users Only 
<img src="https://github.com/bhavinaa/The-Keepers/assets/142370200/2f18c9c5-72dd-440b-b8df-4179d3ec713a" width="300">

For android users, you are able to scan this link and test out this app on your phone
or you can click this link to be direced to the download
https://expo.dev/accounts/thekeepers/projects/test02/builds/988fdff9-5c5b-46e0-bf84-e242d5ace36b

### IDE / Code Editor Setup
1. Clone the repository.
2. Install Node.js, if you haven't already.
3. Change directory (`cd`) into the project folder.
4. Run `npm install` to install all dependencies.
5. Run `npx expo start` to start the project in development mode.

### Test Account
- **Email:** abc1@gmail.com
- **Password:** 123456
- You can also sign up for a new account if needed.

### Troubleshooting Tips
If you encounter any errors while running the application, follow these troubleshooting steps:
- Run `npx expo start -c` in the terminal to clear the cache.
- Wipe data from the Android virtual debugger.

---
## 5. Appendix

### References
Links to external resources, libraries, and tools used.


### Version History
#### [v1.2.0] - 2024-06-19
- **Added**:
  - New Pomodoro timer feature with 25 minute intervals.
- **Changed**:
  - UI for better usability.
- **Fixed**:
  - Fixed timer bug which did not create a new component each time, and had resulted in the time not pausing each time
 
### AI assitance in

- Documentation Assistance
  - Purpose: it helped me format the content in google docs to the markdown format
  - Implementation: i prompted it to make it into a format to place it in the github read me
  - Feedback: it told me to break down the documentation into various sub categories 
---

## Posters and Video for Submission

Please update skylab with posters and video for submission.

## Revision History

- **Release 1.0:**
  - **Features:**
    1. Login
    2. Sign up
