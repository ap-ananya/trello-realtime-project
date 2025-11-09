
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
1. Go to https://trello.com/app-key
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
1.Start your backend server:
```bash
npm start
```
2.In another terminal, run:
```bash
ngrok http 5000
```
3.Copy the forwarding URL shown by ngrok
4.Use this URL to register your webhook:
Example CURL command:
```bash
curl -X POST "https://api.trello.com/1/webhooks/?key=YOUR_KEY&token=YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "description": "Realtime Sync Webhook",
  "callbackURL": "https://abcd1234.ngrok-free.app/trello-webhook",
  "idModel": "YOUR_BOARD_ID"
}'
```

##🧪 Running the App
BACKEND
```BASH
cd backend
npm start
```
FRONTEND
```bash
cd ../frontend
npm start
```
Now open two browser tabs pointing to the frontend app.
Any change in one tab should automatically reflect in the other — demonstrating real-time synchronization.
