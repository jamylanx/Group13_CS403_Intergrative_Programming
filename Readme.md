Player Management API

A RESTful API for managing players with CRUD operations, database integration, authentication, validation, error handling, and Swagger API documentation.

Features

User authentication

Player CRUD operations

Database integration

Request validation

Error handling

JWT authentication

Swagger API documentation

Protected API routes

Technologies Used

Node.js

Express.js

MySQL

JWT

Swagger / Swagger UI

dotenv

bcrypt

Project Structure
project/
├── controllers/
├── middleware/
├── routes/
├── models/
├── config/
├── swagger.js
├── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md

Installation
1. Clone the repository
git clone <your-github-repository-url>
cd <project-folder>

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file based on .env.example.

Example:

PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=player_db

JWT_SECRET=your_secret_key


Do not commit your .env file to GitHub.

4. Set up the database

Create the required database and tables before starting the application.

Example:

CREATE DATABASE player_db;


Run the project's database/schema setup if one is provided.

5. Start the server

For development:

npm run dev


Or:

npm start


The API will run at:

http://localhost:3000

API Documentation

Swagger UI is available at:

http://localhost:3000/api-docs


Swagger provides interactive documentation for all available API endpoints.

Authentication

Protected endpoints require a JWT access token.

Include the token in the request header:

Authorization: Bearer <your_token>

Authentication Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive an access token
Player Endpoints
Method	Endpoint	Description
GET	/api/players	Get all players
GET	/api/players/:id	Get a player by ID
POST	/api/players	Create a player
PUT	/api/players/:id	Replace/update a player
PATCH	/api/players/:id	Partially update a player
DELETE	/api/players/:id	Delete a player
Example Request
Create Player
POST /api/players


Request body:

{
  "name": "John",
  "hero": "Warrior"
}


Example response:

{
  "message": "Player successfully created",
  "player": {
    "id": 1,
    "name": "John",
    "hero": "Warrior"
  }
}

Error Handling

The API returns appropriate HTTP status codes for errors.

Status Code	Meaning
200	Request successful
201	Resource created
400	Invalid request/validation error
401	Authentication required or invalid
404	Resource not found
500	Internal server error
Environment Variables

The following environment variables are required:

Variable	Description
PORT	Port used by the server
DB_HOST	Database host
DB_USER	Database username
DB_PASSWORD	Database password
DB_NAME	Database name
JWT_SECRET	Secret key used for JWT authentication
Git and Environment Files

The .env file contains sensitive information and should not be committed to GitHub.

The repository includes:

.gitignore — excludes node_modules and .env

.env.example — shows the required environment variables without exposing sensitive values

Developer

James Vasquez

License

This project was created as part of a school project.
