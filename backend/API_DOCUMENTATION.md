# API Documentation

Base URL: `http://localhost:3000`

## 🔐 Authentication

### 1. Register User
Create a new user account.

- **Endpoint**: `POST /auth/signup`
- **Public**: Yes
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `201 Created`

### 2. Login
Authenticate and receive a JWT token.

- **Endpoint**: `POST /auth/login`
- **Public**: Yes
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

---

## 🧠 Vector & Ingestion (Protected)

*Requires Header:* `Authorization: Bearer <token>`

### 3. Ingest Repository
Add a repository to the vector database for semantic search.

- **Endpoint**: `POST /vectors/ingest`
- **Body**:
  ```json
  {
    "id": "101",
    "name": "FastAPI",
    "description": "High performance web framework for building APIs.",
    "language": "Python",
    "url": "https://github.com/tiangolo/fastapi",
    "stars": 60000,
    "activityScore": 9.5,
    "communityScore": 9.0,
    "qualityScore": 9.0,
    "complexityScore": 2,
    "openIssues": 40,
    "goodFirstIssues": 15
  }
  ```
- **Response**: `200 OK`

### 4. Search Repositories (Ingestion Service)
Search for repositories using the ingestion service (direct lookup).

- **Endpoint**: `GET /repos/search`
- **Query Params**:
  - `query`: Search term (e.g., "react")
- **Response**: `200 OK`

---

## 💡 Recommendations (Protected)

*Requires Header:* `Authorization: Bearer <token>`

### 5. Get Recommendations
Get personalized repository recommendations based on a keyword and filter type.

- **Endpoint**: `GET /api/recommend`
- **Query Params**:
  - `keyword`: (Required) Topic of interest (e.g., "web framework", "machine learning")
  - `type`: (Optional) Filter type. Options: `popular`, `beginner`. Default: `popular`.

- **Example Request**:
  `GET /api/recommend?keyword=web framework&type=beginner`

- **Response**: `200 OK`
  ```json
  {
    "type": "beginner",
    "count": 1,
    "repos": [
      {
        "name": "FastAPI",
        "url": "https://github.com/tiangolo/fastapi",
        "stars": 60000,
        "score": 0.98
      }
    ]
  }
  ```