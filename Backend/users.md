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
