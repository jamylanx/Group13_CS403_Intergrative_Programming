# Player Management API

A RESTful API for managing player data with CRUD operations, database integration, authentication, validation, error handling, and Swagger API documentation.

## Features

- User registration and login
- JWT authentication
- Player CRUD operations
- Database integration
- Request validation
- Error handling
- Protected API endpoints
- Swagger API documentation

## Technologies Used

- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)
- bcrypt
- Swagger / Swagger UI
- dotenv

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>

A successful login returns an authentication token.

For protected endpoints, include the token in the request header:

Authorization: Bearer <YOUR_TOKEN>

Player API Endpoints
Method	Endpoint	Description
GET	/api/players	Get all players
GET	/api/players/:id	Get a player by ID
POST	/api/players	Create a new player
PUT	/api/players/:id	Update a player
PATCH	/api/players/:id	Partially update a player
DELETE	/api/players/:id	Delete a player

All player endpoints require authentication.
