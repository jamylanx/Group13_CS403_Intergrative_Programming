# Group 13 REST API repository

A RESTful API for managing player data with CRUD operations, PostgreSQL database integration, authentication, validation, error handling, and Swagger API documentation.

## Features

- User registration and login
- JWT authentication
- Player CRUD operations
- PostgreSQL database integration
- Request validation
- Error handling
- Protected API endpoints
- Swagger API documentation

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt
- Swagger / OpenAPI
- Swagger UI
- swagger-jsdoc
- swagger-ui-express
- dotenv

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.

Use `.env.example` as a reference.

Example:

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

PORT=
JWT_SECRET=
JWT_REFRESH_SECRET=
```

### 4. Set Up the Database

Create the database in PostgreSQL:

```sql
CREATE DATABASE db_group13;
```

Make sure the database credentials in the `.env` file match your PostgreSQL configuration.

If your project includes SQL files for creating tables, run those files after creating the database.

### 5. Start the Server

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

## API Documentation

This project uses Swagger/OpenAPI for API documentation.

After starting the server, open:

```text
http://localhost:3000/api-docs/
```

Swagger provides interactive documentation for the available API endpoints.

## Authentication

The API uses JWT (JSON Web Token) authentication.

### Register

**POST** `/api/auth/register`

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

**POST** `/api/auth/login`

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

A successful login returns an authentication token.

For protected endpoints, include the token in the request header:

```http
Authorization: Bearer <YOUR_TOKEN>
```

In Swagger UI, you can enter the JWT using the **Authorize** button.

## Player API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all players |
| GET | `/api/players/:id` | Get a player by ID |
| POST | `/api/players` | Create a new player |
| PUT | `/api/players/:id` | Update a player |
| PATCH | `/api/players/:id` | Partially update a player |
| DELETE | `/api/players/:id` | Delete a player |

> **Note:** All player endpoints require authentication. So make sure to enter Access token in the Authorize button in Swagger UI

## Example Requests

### Get All Players

**GET** `/api/players`

Example response:

```json
[
  {
    "id": 1,
    "name": "John",
    "hero": "Warrior"
  }
]
```

### Get Player by ID

**GET** `/api/players/1`

Example response:

```json
{
  "id": 1,
  "name": "John",
  "hero": "Warrior"
}
```

### Create Player

**POST** `/api/players`

Request body:

```json
{
  "name": "John",
  "hero": "Warrior"
}
```

### Update Player

**PUT** `/api/players/1`

Request body:

```json
{
  "name": "John Smith",
  "hero": "Mage"
}
```

### Partially Update Player

**PATCH** `/api/players/1`

Request body:

```json
{
  "hero": "Archer"
}
```

### Delete Player

**DELETE** `/api/players/1`

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Bad request or validation error |
| 401 | Authentication required or invalid |
| 404 | Resource not found |
| 500 | Internal server error |

## Validation and Error Handling

The API validates incoming requests and returns appropriate HTTP status codes when invalid data or errors occur.

Examples include:

- Missing required fields
- Invalid player ID
- Invalid authentication token
- Player not found
- Database errors
- Server errors
- Global error handler

## Environment Variables

The application uses environment variables for configuration and sensitive information.

| Variable | Description |
|----------|-------------|
| `PORT` | Port used by the application |
| `DB_HOST` | PostgreSQL database host |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_NAME` | PostgreSQL database name |
| `JWT_SECRET` | Secret key used for JWT authentication |

## Git and Environment Files

The project includes:

- `.gitignore` to exclude `node_modules` and `.env`
- `.env.example` containing the required environment variable names
- `README.md` containing project setup and API information

## Project Structure

```text
Group13_CS403_Integrative_Programming/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── player_controller.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── player_route.js
│   └── services/
│       └── player_service.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Dev

James Vasquez

## License

This project was created as part of our school activity and project.
