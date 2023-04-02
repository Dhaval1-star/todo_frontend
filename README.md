## Link For The BackEnd Of Todo App : https://github.com/Dhaval1-star/MERN_TODO

# Todo App with Login System

This is a Todo app with a login system that allows users to create, view, edit, and delete tasks. Each user has their own set of tasks that they can manage independently of other users. The app also includes a login system that requires users to authenticate before accessing their tasks.

## Features
- User authentication system that requires users to sign up and login to access their tasks
- Secure password hashing using bcrypt
- Ability to create, view, edit, and delete tasks
- Mark tasks as complete or incomplete


## Installation
1. Clone this repository: `git clone https://github.com/Dhaval1-star/todo_frontend.git`
2. Navigate to the project directory: `cd Folder-Name`
3. Install dependencies: `npm install`

## Usage
1. Start the application: `npm start`
2. Open your web browser and go to http://localhost:3000
3. Click on "Sign Up" to create a new account or "Log In" to access an existing account.
4. Once logged in, you can create new tasks, view existing tasks, edit tasks, and mark tasks as complete or incomplete.
5. You can also sort and filter your tasks to help you organize your work.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- React
- Bootstrap
- Passport.js
- Bcrypt

## License
This project is licensed under the MIT license. See the LICENSE file for more information.

# Node Backend Project

This is a Node.js backend project that uses Express for handling HTTP requests and MongoDB for the database. The project includes user authentication and authorization using JSON Web Tokens (JWT), as well as routes for managing todos.

## Installation

1. Clone the repository and navigate to the project directory.
    ```
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies.
    ```
    npm install
    ```

3. Create a `.env` file in the project directory and add the required environment variables.
    ```
    PORT=<port-number>
    MONGODB_URI=<mongodb-uri>
    JWT_SECRET=<jwt-secret>
    ```

4. Start the server.
    ```
    npm start
    ```
## Endpoints

### Authentication

- POST `/api/v1/auth/register`
  - Description: Create a new user account with email and password.
  - Request body:
    ```
    {
        "email": <string>,
        "password": <string>
    }
    ```
  - Response body:
    ```
    {
        "user": {
            "_id": <string>,
            "email": <string>
        },
        "accessToken": <string>,
        "refreshToken": <string>
    }
    ```

- POST `/api/v1/auth/login`
  - Description: Login with email and password to get access and refresh tokens.
  - Request body:
    ```
    {
        "email": <string>,
        "password": <string>
    }
    ```
  - Response body:
    ```
    {
        "user": {
            "_id": <string>,
            "email": <string>
        },
        "accessToken": <string>,
        "refreshToken": <string>
    }
    ```

- POST `/api/v1/auth/refresh`
  - Description: Get a new access token with a valid refresh token.
  - Request body:
    ```
    {
        "refreshToken": <string>
    }
    ```
  - Response body:
    ```
    {
        "user": {
            "_id": <string>,
            "email": <string>
        },
        "accessToken": <string>
    }
    ```

### Todos

- GET `/api/v1/todos`
  - Description: Get all todos for the authenticated user.
  - Request headers:
    ```
    Authorization: Bearer <access-token>
    ```
  - Response body:
    ```
    [
        {
            "_id": <string>,
            "description": <string>,
            "completed": <boolean>
        },
        ...
    ]
    ```

- POST `/api/v1/todos`
  - Description: Create a new todo for the authenticated user.
  - Request headers:
    ```
    Authorization: Bearer <access-token>
    ```
  - Request body:
    ```
    {
        "description": <string>
    }
    ```
  - Response body:
    ```
    {
        "_id": <string>,
        "description": <string>,
        "completed": <boolean>
    }
    ```

- PATCH `/api/v1/todos/:id`
  - Description: Update a todo for the authenticated user.
  - Request headers:
    ```
    Authorization: Bearer <access-token>
    ```
  - Request parameters:
    ```
    id: <string>
    ```
  - Request body:
    ```
    {
        "description": <string>,
        "completed": <boolean>
    }
    ```
  - Response body:
    ```
    {
        "_id": <string>,
        "description": <string>,
        "completed": <boolean>
    }
    ```

- DELETE `/api/v1/todos/:id`
  - Description: Delete a todo for the authenticated user.
  - Request headers:
    ```
    Authorization: Bearer <access-token>
    ```
  - Request parameters:
    ```
    id: <string>
    ```
  - Response body:
    ```
    {
        "_id": <string>,
        "description": <string>,
        "completed": <boolean>
    }
    ```