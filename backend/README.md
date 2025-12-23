# 🚀 Git-Wrap

**Discover Open Source Projects You Can Actually Contribute To**

Git-Wrap is a backend-first microservices project that helps developers discover open-source repositories that are contribution-ready, based on their skills, interests, and activity signals.

Instead of endlessly searching GitHub, Git-Wrap curates and recommends repositories that are:

- Active
- Beginner / contributor friendly
- Maintained
- Relevant to the user’s skillset

## 🧠 Problem Statement

GitHub has millions of repositories, but:

- Many are inactive or abandoned
- Contribution guidelines are unclear
- Beginners don’t know where to start
- Maintainer activity is hard to judge

Git-Wrap solves this by analyzing repositories and recommending the right ones to the right users.

## 🏗️ Architecture Overview

This project follows a microservices architecture with a central API Gateway.

```
Client (Frontend / Bruno)
        ↓
     API Gateway
        ↓
-------------------------------------------------
| Auth Service | Repo Analysis | Recommendation |
| Vector / AI  | Repo Ingestion|                |
-------------------------------------------------
```

*   **API Gateway** → Single entry point
*   **Auth Service** → User authentication & JWT
*   **Internal Services** → Private, isolated, scalable

## 📦 Services Overview

### 1️⃣ API Gateway (Port 3000)

- Single public entry point
- Routes requests to internal services
- Handles authentication verification
- Hides internal services from clients

### 2️⃣ Auth User Service (Port 4000)

- User signup & login
- Password hashing (bcrypt)
- JWT generation
- Secure HttpOnly cookie-based authentication

### 3️⃣ Repo Ingestion Service (Planned)

- Fetches repositories from GitHub
- Stores metadata (stars, forks, issues, etc.)

### 4️⃣ Repo Analysis Service (Planned)

- Calculates:
  - Contribution readiness score
  - Maintainer activity
  - Issue freshness
  - Repo health

### 5️⃣ Vector Service (Planned)

- Stores embeddings using FAISS
- Enables semantic search & similarity matching

### 6️⃣ Recommendation Service (Planned)

- Matches users to repositories
- Uses skills, interests, and repo vectors
- Ranks and filters results

## 🔐 Authentication Flow

1.  User signs up / logs in via API Gateway
2.  Auth service generates a JWT
3.  JWT is stored in an HttpOnly cookie
4.  API Gateway validates JWT for protected routes
5.  Internal services trust the gateway

- ✅ **Secure**
- ✅ **Stateless**
- ✅ **Scalable**

## 📁 Project Structure

```
backend/
│
├── api-gateway/
│   ├── src/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
│
├── auth-user-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
│
├── repo-ingestion-service/
├── repo-analysis-service/
├── vector-service/
├── recommendation-service/
│
├── shared/
│   ├── db/
│   ├── constants/
│   ├── utils/
│   └── types/
│
├── docker-compose.yml
└── README.md
```

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MySQL
- JWT (Authentication)
- bcrypt (Password hashing)
- http-proxy-middleware (API Gateway)

### AI / Recommendation (Planned)

- FAISS (Vector DB)
- Embeddings (repo descriptions, README, issues)

### Dev & Infra

- Docker & Docker Compose (planned)
- Bruno (API testing)

## ▶️ How to Run (Development)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/git-wrap.git
    cd git-wrap/backend
    ```

2.  **Setup Auth User Service**
    ```bash
    cd auth-user-service
    npm install
    node src/server.js
    ```
    Runs on: `http://localhost:4000`

3.  **Setup API Gateway**
    ```bash
    cd ../api-gateway
    npm install
    node src/server.js
    ```
    Runs on: `http://localhost:3000`

## 🧪 Testing with Bruno

### Signup

`POST http://localhost:3000/auth/api/auth/signup`

```json
{
  "username": "buddy123",
  "fullName": "Buddy Tester",
  "email": "buddy@test.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login

`POST http://localhost:3000/auth/api/auth/login`

```json
{
  "identifier": "buddy123",
  "password": "password123"
}
```

JWT will be stored securely in an HttpOnly cookie.

## 🚧 Current Status

- ✅ API Gateway
- ✅ Auth Service
- ✅ JWT-based authentication
- 🚧 Repo ingestion
- 🚧 Repo analysis
- 🚧 Recommendation engine
- 🚧 Vector search

## 🎯 Future Improvements

- OAuth login (GitHub)
- Advanced filtering (language, difficulty)
- Contribution readiness scoring
- Dead / inactive repo detection
- Personalized recommendations
- Rate limiting & monitoring
- Full Dockerized setup
- Frontend dashboard

## 👤 Author

- **Karthikeyan R**
- Aspiring Full Stack Developer
- AI & Data Science Student

## 📌 Final Note

This project is intentionally backend-first, focusing on:

- Clean architecture
- Real-world microservices patterns
- Scalable authentication
- Production-style API design

Not a toy project. Not a tutorial clone.
A foundation for something real.