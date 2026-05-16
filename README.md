# 📚 StudySync

> A student study-partner platform built with React & Firebase  
> **University of Eastern Finland (UEF) — Software Engineering I — Module 5 Mini Project**

---

## 👥 Team — Lazzy Bearzz

| Name | Role |
|------|------|
| Mehdi Saim | Project Manager / Planning |
| Ahsan Ahsan | Backend / Firebase Setup |
| Muneeb Ahmed Butt | Frontend Lead / All 7 Pages |
| Bilal Cheema | UI Design / Wireframing |
| Muhammad Ahmad Saeed | Testing / Quality Assurance |
| Abdul Manan | Documentation (1st Year) |
| Arslan Hyder | Backend Support / Testing |

---

## 📌 Project Overview

StudySync is a web application that helps university students — especially new and international ones — to:
- Find study partners by shared courses and interests
- Chat in real time with other students
- Create and discover campus events

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 |
| Routing | React Router v7 |
| Database | Firebase Firestore |
| Authentication | Firebase Auth (Email/Password) |
| Real-time Chat | Firebase onSnapshot listener |
| Dev Environment | VS Code, Node.js, npm |

---

## 📁 Project Structure

```
studysync/
├── src/
│   ├── firebase.js          # Firebase config & initialization
│   ├── App.js               # Main routing
│   ├── pages/
│   │   ├── Login.js         # Sign in page
│   │   ├── Signup.js        # Register page
│   │   ├── Profile.js       # Profile setup
│   │   ├── Dashboard.js     # Main dashboard
│   │   ├── Matches.js       # Find study partners
│   │   ├── Chat.js          # Real-time group chat
│   │   └── Events.js        # Campus events
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (LTS version) — [nodejs.org](https://nodejs.org)
- npm (comes with Node.js)

### Installation

```bash
# 1. Extract the project zip
# 2. Open terminal in the studysync folder

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at **http://localhost:3000**

---

## 🔥 Firebase Setup

The project uses Firebase (already configured). Firebase services used:

| Service | Purpose |
|---------|---------|
| Firebase Authentication | Email/Password sign-up and login |
| Firestore Database | Store users, messages, events |
| Firebase Realtime | onSnapshot for live chat updates |

### Firestore Collections

**users**
```
uid, name, email, courses, interests, goals
```

**messages**
```
text, sender (email), timestamp
```

**events**
```
title, description, date, location, createdBy
```

---

## 📱 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Login | `/` | Email/password sign-in |
| Sign Up | `/signup` | Create new account |
| Profile | `/profile` | Set up name, courses, interests, goals |
| Dashboard | `/dashboard` | Welcome screen with profile & quick links |
| Matches | `/matches` | Browse all other students |
| Chat | `/chat` | Real-time group messaging |
| Events | `/events` | Create & browse campus events |

---

## 🏗️ Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

---

## 📋 User Credentials (Demo)

All demo users have password: `StudySync2024!`  
See `StudySync_All_Users.xlsx` for full list of 33 users.

---

## ⚠️ Known Issues & Solutions

| Issue | Solution |
|-------|---------|
| `react-scripts not recognized` | Run `npm install` first |
| `reportWebVitals.js` error | Run: `Set-Content src/reportWebVitals.js 'const reportWebVitals = () => {}; export default reportWebVitals;'` |
| PowerShell execution policy | Run: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |

---

## 📄 License

This project was created for educational purposes at the University of Eastern Finland.  
Module 5: Mini Project — Software Engineering I — May 2026

---

*LLM was used in this work to assist with code generation and documentation.*
