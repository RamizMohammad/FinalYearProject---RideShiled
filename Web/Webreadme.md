.evn Details
PORT->server port

# Authentication API Documentation

This API provides user authentication features including signup, login, and logout. All endpoints are prefixed with `/api/v1/auth`.

---

## 1. Signup

**Endpoint:**  
`POST /api/v1/auth/signup`

**Description:**  
Registers a new user with name, username, email, and password.

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Responses:**
- `200 OK`  
  ```json
  { "message": "User Registered Successfuly" }
  ```
- `400 Bad Request`  
  - Missing fields: `{ "message": "Please fill all fields" }`
  - Username exists: `{ "message": "username already exists" }`
  - Email exists: `{ "message": "email already exists" }`
  - Password too short: `{ "message": "Password length should be greater" }`
  - Internal error: `{ "message": "Internal server error" }`

---

## 2. Login

**Endpoint:**  
`POST /api/v1/auth/login`

**Description:**  
Authenticates a user using email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Responses:**
- `200 OK`  
  ```json
  { "message": "Logged in successfuly" }
  ```
  - Sets a `jwt-cookie` HTTP-only cookie for authentication.
- `400 Bad Request`  
  - Missing fields: `{ "message": "Internal server" }`
  - Email not found: `{ "message": "email doesnot exists" }`
  - Incorrect password: `{ "message": "incorrect password" }`
  - Internal error: `{ "message": "Internal Server error" }`

---

## 3. Logout

**Endpoint:**  
`POST /api/v1/auth/logout`

**Description:**  
Logs out the current user by clearing the authentication cookie.

**Responses:**
- `200 OK`  
  ```json
  { "message": "Logged out successfully" }
  ```

---

**Note:**  
- All responses are in JSON format.
- Authentication is managed via an HTTP-only cookie named `jwt-cookie`.