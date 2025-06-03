# Skipli Project

Skipli is a web-based employee management system built with React.js (client) and Node.js/Express (server), using Firebase Admin SDK for authentication and user handling.

## 🗂 Project Structure

skipli/
├── client/ # Frontend - React.js
├── server/ # Backend - Express.js + Firebase Admin
├── README.md # Project documentation

---

## 🚀 Getting Started


### 1. Clone the repository

```bash
git clone https://github.com/trananh2305/skipli.git
cd skipli
2. Set up the backend
bash
Copy
Edit
cd server
npm install
🔐 Firebase Configuration
Create a file named serviceAccountKey.json inside the server/ folder.

Paste your Firebase service account credentials JSON into that file.

Your firebase-admin initialization in server/index.js should look like:

js
Copy
Edit
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "your-project-id",
});
▶️ Start the backend
bash
Copy
Edit
npm start
Default port: http://localhost:5000

3. Set up the frontend
bash
Copy
Edit
cd ../client
npm install
⚙️ Environment Variables
Create a .env file and add:

bash
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
▶️ Start the frontend
bash
Copy
Edit
npm start
Opens at: http://localhost:3000

✨ Features
Admin login

Create employee profiles

Role-based user management

Firebase integration for authentication and storage

🛠 Built With
React.js

Express.js

Firebase Admin SDK

TailwindCSS

JWT Authentication



