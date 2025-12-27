# Git Wrap Backend

A microservices-based backend for the Git Wrap application, designed to ingest, analyze, and recommend GitHub repositories using vector similarity search.

## 🏗 Architecture

The system is composed of the following microservices:

| Service | Port | Description |
| :--- | :--- | :--- |
| **API Gateway** | `3000` | The single public entry point. Handles routing and authentication. |
| **Auth Service** | `4000` | Manages user registration and login (JWT-based). |
| **Repo Ingestion** | `5001` | Fetches repository metadata from GitHub. |
| **Repo Analysis** | `5003` | Analyzes repository quality and metrics. |
| **Vector Service** | `5005` | Stores embeddings and performs semantic search. |
| **Recommendation** | `5006` | Aggregates data to provide personalized recommendations. |
| **MySQL** | `3307` | Persistent storage for user data. |

## 🚀 Prerequisites

- **Docker** & **Docker Compose** (Must be running)
- **Node.js** (v18+ for local development)

## 🛠 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repo-url>
    cd backend
    ```

2.  **Environment Variables**
    The `docker-compose.yml` file handles most configuration. Ensure you have a `.env` file in `auth-user-service` if running locally outside Docker.

3.  **Start the Application**
    Run the following command to build and start all services:
    ```bash
    docker-compose up --build
    ```

    *Note: The first run may take a moment as MySQL initializes.*

## 🧪 Testing

All requests should be sent to the **API Gateway** at `http://localhost:3000`.

See API Documentation for detailed endpoints.

### Quick Start Flow
1.  **Signup**: `POST /auth/signup`
2.  **Login**: `POST /auth/login` (Copy the `token`)
3.  **Search Repos**: `GET /repos/search?query=react` (Find repos to analyze)
4.  **Ingest Repo**: `POST /vectors/ingest` (Store repo for analysis)
5.  **Get Recommendations**: `GET /api/recommend?keyword=react` (Get personalized suggestions)

## 📂 Directory Structure

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
│   ├── src/
│   │   ├── jobs/
│   │   ├── services/
│   │   ├── github/
│   │   ├── models/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
│
├── repo-analysis-service/
│   ├── src/
│   │   ├── scorers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
│
├── vector-service/
│   ├── src/
│   │   ├── embeddings/
│   │   ├── faiss/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
│
├── recommendation-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── rankers/
│   │   ├── filters/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
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