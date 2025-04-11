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

