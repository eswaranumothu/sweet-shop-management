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
- **Python 3.11**– Core programming language used for backend development
- **FastAPI**– High-performance web framework for building REST APIs
- **SQLAlchemy**-ORM for database modeling and interaction
- **SQLite**-Lightweight relational database for persistent storage
- **JWT Authentication**– Secure token-based authentication and authorization
## Testing
The backend follows a test-first approach for critical authentication logic.
Automated tests are written using **Pytest** to validate API behavior and ensure reliability.
### Test Execution
```
pytest
```
<img width="1272" height="516" alt="Screenshot 2025-12-13 140355" src="https://github.com/user-attachments/assets/66a37025-a37b-450a-9fe5-950ad332c45c" />


### Frontend
- **React**– Component-based library for building the user interface
- **Vite**– Fast build tool and development server for React
- **Axios**– HTTP client for communicating with backend APIs
- **HTML / CSS**– Structure and styling of the user interface
### Tools
- Git & GitHub– Version control and source code management
- Swagger UI– API documentation and interactive testing
- VS Code – Development environment for coding and debugging
## Features
### 👤 Authentication
- User Registration

<img width="1639" height="858" alt="Screenshot 2025-12-14 132732" src="https://github.com/user-attachments/assets/6993ff28-8dec-4e62-bbb9-a548d347faef" />

- User Login
<img width="1330" height="788" alt="Screenshot 2025-12-14 134023" src="https://github.com/user-attachments/assets/df01bce5-5efb-4c82-8460-4475dbb67853" />

  
- JWT-based authentication
- Secure protected routes


### 🔐 Role-Based Access
**User**
  - View sweets
  - Purchase sweets
  - View total bill
<img width="1854" height="879" alt="Screenshot 2025-12-14 134128" src="https://github.com/user-attachments/assets/c2e55f35-7540-4774-b7cf-df0b5aec513b" />


**Admin**
  - Add new sweets
  - Update sweet details
  - Restock sweets
  - Delete sweets
<img width="1835" height="875" alt="Screenshot 2025-12-14 134250" src="https://github.com/user-attachments/assets/89001f02-5a5c-4843-ab8c-87e64500df56" />


 ### 🍭 Sweet Management
- Add sweets
<img width="1432" height="146" alt="Screenshot 2025-12-14 134418" src="https://github.com/user-attachments/assets/882db9bf-35dc-41c4-88cc-3668d2854fb5" />
<img width="1788" height="363" alt="Screenshot 2025-12-14 134432" src="https://github.com/user-attachments/assets/1efa834c-5c77-4f01-980c-e68ad4404048" />

- List sweets
- Search sweets (name, category, price range)
<img width="1841" height="845" alt="Screenshot 2025-12-14 134533" src="https://github.com/user-attachments/assets/7c6f55f5-537a-4166-9aff-969591245997" />
- delte Sweets
Deleting Kheer!
<img width="1827" height="882" alt="Screenshot 2025-12-14 134712" src="https://github.com/user-attachments/assets/da774b7d-07fb-4466-a94c-e64948d993ae" />
<img width="1850" height="873" alt="Screenshot 2025-12-14 134733" src="https://github.com/user-attachments/assets/0d1f72a2-adce-4a9d-99c5-f15f1bcb6761" />

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
