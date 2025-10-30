💳 Credit Jambo — Client App

The Credit Jambo Client Application is the user-facing side of the Savings Management System.
Users can deposit, withdraw, and manage their balances securely with verified devices.

🧩 Overview

Users can:

Register and log in

Add and verify devices

Deposit or withdraw money

Track balance and transaction history

⚙️ Tech Stack
Category	Technology
Frontend	React (Vite) + Tailwind CSS
Backend	Node.js + Express
Database	MySQL
Auth	JWT
Security	Helmet, CORS, Rate Limiter
🚀 Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/<your-username>/creditjambo_client.git
cd creditjambo_client

2️⃣ Backend Setup
cd backend
npm install


Create .env:

PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=creditjambo
JWT_SECRET=user_secret_key
JWT_EXP=8h


Run:

npm start


→ API runs on http://localhost:4000

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


→ Frontend runs on http://localhost:5173

🗄️ Database Setup

Use the same creditjambo.sql file from:

database/creditjambo.sql


Import it to your MySQL server before starting the apps.

🧱 Folder Structure
creditjambo_client/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── app.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── api/
    │   └── App.jsx
    └── index.html

🔐 Features

✅ User registration & login
✅ JWT auth with auto session restore
✅ Deposit & withdraw funds
✅ Device registration + verification
✅ Transaction history table
✅ Modern Tailwind UI

🧩 Future Enhancements

Add email/SMS notifications

Live balance updates

Improved transaction filters

Mobile PWA support

👨‍💻 Developer

Name: Confy Eagle
Role: Full Stack Developer
Project: Junior Software Developer Practical Test
Year: 2024 – 2025
