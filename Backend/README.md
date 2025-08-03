# API Documentation: /users/register

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It validates the input data and creates a new user in the database if the data is valid.

## Request Body
The request body should be in JSON format and include the following fields:

- `email` (string, required): Must be a valid email address.
- `fullname` (object, required):
  - `firstname` (string, required): Must be at least 3 characters long.
  - `lastname` (string, optional): Must be at least 3 characters long if provided.
- `password` (string, required): Must be at least 6 characters long.

### Example Request Body
```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

## Responses

### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com"
    }
  }
  ```

### Error Responses

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
    {
      "message": "An unexpected error occurred.",
      "error": {
        "code": "INTERNAL_SERVER_ERROR",
        "details": "The server encountered an unexpected condition that prevented it from fulfilling the request."
      }
    }
  ```

# API Documentation: /users/login

## Endpoint
`POST /users/login`

## Description
This endpoint is used to authenticate a user. It validates the input data and checks the provided credentials against the database. If the credentials are valid, it returns a JWT token.

## Request Body
The request body should be in JSON format and include the following fields:

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 6 characters long.

### Example Request Body
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

## Responses

### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com"
    }
  }
  ```

### Error Responses

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email and password"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "An unexpected error occurred.",
    "error": {
      "code": "INTERNAL_SERVER_ERROR",
      "details": "The server encountered an unexpected condition that prevented it from fulfilling the request."
    }
  }
  ```

# User Endpoints

## Get User Profile
Retrieves the profile information of the currently authenticated user.

### Request
```http
GET /users/profile
```

### Headers
```
Authorization: Bearer <jwt_token>
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string",
    "createdAt": "string"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Not authenticated"
}
```

## Logout User
Logs out the currently authenticated user by invalidating their token.

### Request
```http
POST /users/logout
```

### Headers
```
Authorization: Bearer <jwt_token>
```

### Response
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

### Example Response 
-'user'(object):
-'fullname'(object):
  -'firstname'(string):User's first name (min 3 characters).
  -'lastname'(string):User's last name (min 3 characters).
-'email'(string):User's email (min 3 characters).


## ' /users/logout' Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers.

###HTTP Method
'GET'

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

# API Documentation: /captain/register

## Endpoint
`POST /captain/register`

## Description
This endpoint is used to register a new captain. It validates the input data and creates a new captain profile in the database if the data is valid.

## Request Body
The request body should be in JSON format and include the following fields:

- `fullname` (object, required):
  - `firstname` (string, required): Must be at least 3 characters long
  - `lastname` (string, required): Must be at least 3 characters long
- `email` (string, required): Must be a valid email address
- `password` (string, required): Must be at least 6 characters long
- `vehicle` (object, required):
  - `color` (string, required): Must be at least 3 characters long
  - `plate` (string, required): Must be at least 3 characters long
  - `capacity` (number, required): Must be a valid number
  - `vehicleType` (string, required): Must be at least 3 characters long

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "Sedan"
  }
}
```

## Responses

### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "captain": {
      "_id": "<CAPTAIN_ID>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "Sedan"
      }
    },
    "token": "<JWT_TOKEN>"
  }
  ```

### Error Responses

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

#### Captain Already Exists
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain already exists"
  }
  ```
### Example Response 
- `captain` (object):

# API Documentation: /captains/logout

## Endpoint
`GET /captains/logout`

## Description
Logs out the currently authenticated captain by blacklisting their token. Requires a valid JWT token in the Authorization header or cookie.

## Response
```json
{
  "message": "Logout successful"
}
```

## Error Response
```json
{
  "message": "Logout failed",
  "error": "Error details"
}
```

---

## Validation Improvements

- **UserProtectedWrapper:**  
  Now validates the token and user profile more robustly, redirecting to login if invalid or expired.

- **CaptainProtectedWrapper:**  
  Now validates the token and captain profile more robustly, redirecting to captain login if invalid or expired.

Refer to the frontend wrappers for implementation details.
