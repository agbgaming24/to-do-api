# Todo API

A RESTful API built with Node.js, Express, and MySQL that allows users to manage their todo items with JWT authentication.

## Tech Stack
- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcrypt
- express-validator

## Getting Started

### Prerequisites
- Node.js installed
- MySQL installed

### Installation
1. Clone the repo
   git clone https://github.com/yourusername/to-do-api.git

2. Install dependencies
   npm install

3. Create a .env file in the root directory
   JWT_SECRET=your_jwt_secret
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=todos

4. Create the database tables
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL
   );

   CREATE TABLE todos (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     user_id INT NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );

5. Run the server
   node app.js

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /signup | Register a new user | No |
| POST | /login | Login and get token | No |

### Todos
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /todos?page=1&limit=10 | Get all todos (paginated) | Yes |
| POST | /todos | Create a new todo | Yes |
| PUT | /todos/:id | Update a todo | Yes |
| DELETE | /todos/:id | Delete a todo | Yes |

## Request & Response Examples

### Signup
POST /signup
{
  "name": "Aryan",
  "email": "aryan@gmail.com",
  "password": "123456"
}

Response:
{
  "message": "User created successfully"
}

### Login
POST /login
{
  "email": "aryan@gmail.com",
  "password": "123456"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Aryan",
    "email": "aryan@gmail.com"
  }
}

### Create Todo
POST /todos
Headers: Authorization: Bearer <token>
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs and bread"
}

Response:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs and bread"
}

### Get Todos
GET /todos?page=1&limit=10
Headers: Authorization: Bearer <token>

Response:
{
  "data": [...],
  "page": 1,
  "limit": 10,
  "total": 2
}

### Update Todo
PUT /todos/1
Headers: Authorization: Bearer <token>
{
  "title": "Buy groceries updated",
  "description": "Buy milk, eggs, bread and cheese"
}

Response:
{
  "id": 1,
  "title": "Buy groceries updated",
  "description": "Buy milk, eggs, bread and cheese"
}

### Delete Todo
DELETE /todos/1
Headers: Authorization: Bearer <token>

Response: 204 No Content

## Authentication
This API uses JWT for authentication. After logging in, include the token in the Authorization header:
Authorization: Bearer <your_token>

## Live Demo
[https://your-api.onrender.com](https://to-do-api-cven.onrender.com)

## Extras (Please ignore)
[Roadmap.sh project]https://roadmap.sh/projects/todo-list-api
