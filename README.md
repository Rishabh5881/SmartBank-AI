# SmartBank AI - Backend

Backend API for **SmartBank AI**, an AI-powered digital banking platform built using Node.js, Express, Prisma ORM, and PostgreSQL.

## 🚀 Tech Stack

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* bcrypt

## 📁 Main Modules

* Authentication
* User Management
* Account Management
* Transactions
* Dashboard APIs
* Analytics APIs
* AI Insights APIs

## ⚙️ Setup

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

Server:

```
http://localhost:5000
```

## 🔐 Features

* JWT based authentication
* Password hashing
* Protected routes
* Prisma database management
* REST API architecture

## 👨‍💻 Author

Rishabh Sharma

GitHub: https://github.com/Rishabh5881
