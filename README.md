# sweet-shop-management
Incubyte Assessment Project — Sweet Shop Management System built with FastAPI, React, JWT authentication, and role-based authorization
A full-stack Sweet Shop Management System built using FastAPI (Backend) and React + Vite (Frontend) with JWT-based authentication, role-based access (Admin/User), and a modern UI.

# Project Overview
This project demonstrates:
- Backend API design using **FastAPI**
- Authentication & Authorization using **JWT**
- Role-based access (**Admin / User**)
- Frontend integration using **React (Vite)**
- Clean architecture and RESTful APIs
- End-to-end functionality as required by the assessment

## Tech Stack

### Backend
- **Python 3.11**
- **FastAPI**
- **SQLAlchemy**
- **SQLite**
- **JWT Authentication**
### Frontend
- **React**
- **Vite**
- **Axios**
- **HTML / CSS**
### Tools
- Git & GitHub
- Swagger UI
- VS Code
## Features
### 👤 Authentication
- User Registration
<img width="1573" height="779" alt="Screenshot 2025-12-14 001049" src="https://github.com/user-attachments/assets/5b43dd18-f1c1-41f2-89e7-1881eed70cbc" />
<img width="1454" height="596" alt="Screenshot 2025-12-14 001059" src="https://github.com/user-attachments/assets/5d9dd146-2cc5-46c3-b856-4a1513ae8a79" />

- User Login
- JWT-based authentication
- Secure protected routes

### 🔐 Role-Based Access
**User**
  - View sweets
  - Purchase sweets
  - View total bill
<img width="1856" height="818" alt="Screenshot 2025-12-14 002335" src="https://github.com/user-attachments/assets/ecd8b562-47b9-4060-a2e3-6a4aa03b0882" />

**Admin**
  - Add new sweets
  - Update sweet details
  - Restock sweets
  - Delete sweets
<img width="1870" height="816" alt="Screenshot 2025-12-14 001246" src="https://github.com/user-attachments/assets/0818dc62-567b-46c6-8bde-b92afdaad6ee" />

 ### 🍭 Sweet Management
- Add sweets
- List sweets
- Search sweets (name, category, price range)
- Purchase sweets
- Restock inventory
- Real-time quantity updates
### 🧾 Billing
- Dynamic total bill calculation on purchase

## 🧩 Project Structure
```
sweet-shop-management/
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── auth.py
│   │   ├── security.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── sweets.py
│   │   └── main.py
│   │
│   └── venv/
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Sweets.jsx
│   │   │
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   └── App.jsx
│   │
│   └── index.html
│
└── README.md
```


## 🚀 How to Run the Project Locally
### Step-1 Clone the Repository
```bash
git clone https://github.com/eswaranumothu/sweet-shop-management.git
cd sweet-shop-management
```
Step-2 Backend Setup
```
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```
```
uvicorn app.main:app --reload
```
Backend runs at: 
```
http://127.0.0.1:8000
``` 
Swagger UI:
```
http://127.0.0.1:8000/docs
```
Step-3 Frontend SetUp:
```
cd frontend
npm install
npm run dev
```
Frontend runs at:
```
http://localhost:5173
```
### Api Endpoints
Auth:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Sweets:
- GET /api/sweets
- POST /api/sweets (Admin)
- PUT /api/sweets/{id} (Admin)
- DELETE /api/sweets/{id} (Admin)
- POST /api/sweets/{id}/purchase
- POST /api/sweets/{id}/restock (Admin)

### Testing
- APIs tested using Swagger UI
- Role-based access verified
- Edge cases handled (out of stock, invalid login, unauthorized access)

### AUTHOR 
ESWAR ANUMOTHU 22BIS70145 CHANDIGARH UNIVERSITY
https://github.com/eswaranumothu

### Ai Disclosure
I used ChatGpt,Gemini,Workik whenever i face any Major error and that requires debugging i mentioned the situations where i used chatgpt here:
- During backend development, AI was used to analyze and resolve non-obvious FastAPI runtime errors, including dependency injection failures, circular imports, and incorrect request validation behavior
- While implementing JWT-based authentication and role-based authorization, AI support was used to debug token decoding issues, incorrect header propagation (Authorization: Bearer), and authorization failures caused by mismatched claims and dependency ordering
- In database integration using SQLAlchemy, AI assistance helped diagnose ORM-related issues, such as session lifecycle problems, stale object updates, and unexpected query behavior during concurrent purchase and stock update operations.
- During frontend–backend integration, AI was used to debug CORS-related errors, Axios interceptor misconfigurations, token persistence issues in localStorage, and inconsistent authentication state across page reloads
- While implementing the purchase flow and total bill calculation, AI was consulted to reason about state synchronization problems in React, including incorrect re-renders, stale state updates, and UI inconsistencies after API responses
- AI tools were also used to assist in refactoring repetitive logic, improving error handling patterns, and enhancing UI styling without modifying application behavior.

- I tracked my ai uasge and situations are noted for transparancy.
