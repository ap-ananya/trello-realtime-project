
# 🚀 Trello Real-Time Synchronization

This project demonstrates **real-time synchronization** between two browser windows using **Socket.IO**, **Node.js**, and the **Trello API**.  
When a board or list is updated in one window, changes automatically reflect in another — simulating live Trello updates.

---

## 📁 Project Structure
**frontend/** (React application code)
**backend/** (Node.js/Express/etc. server code)
README.md

---

## ⚙️ Setup Instructions
1.Clone the Repository
```bash 
git clone <your-repo-link>
cd <repo-folder>
```

---

2. Installing Dependencies
BACKEND
```bash
cd backend
npm install
```
FRONTEND
```bash
cd ../frontend
npm install
```
## 🔑 Trello API Setup
1. Go to [API] (https://trello.com/app-key)
2. Copy your API Key.
3. Click “Token” to generate your Access Token.
4. Create a .env file in the backend folder and add:
```bash
TRELLO_KEY=your_api_key
TRELLO_TOKEN=your_access_token
PORT=5000
```
## 🌐 Registering the Webhook
You need a publicly accessible URL for Trello to send webhook events.
### Using ngrok
