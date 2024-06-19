# Movie Booking Application API Documentation

## Overview

This API allows users and theater owners to interact with a movie booking system. Users can register, log in, and book seats for movies, while theater owners can register, log in, create, and update movie information. JWT tokens are used for authorization.

## Authentication

JWT tokens are used for authentication. Each request to protected routes must include the JWT token in the `Authorization` header as follows:

```
Authorization: Bearer <JWT_TOKEN>
```

## API Endpoints

### Authentication Routes

#### Register User

- **URL:** `/api/auth/register/user`
- **Method:** `POST`
- **Authorization:** None
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User

- **URL:** `/api/auth/login/user`
- **Method:** `POST`
- **Authorization:** None
- **Description:** Log in a user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "token": "string"
  }
  ```

#### Register Owner

- **URL:** `/api/auth/register/owner`
- **Method:** `POST`
- **Authorization:** None
- **Description:** Register a new theater owner.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Owner registered successfully"
  }
  ```

#### Login Owner

- **URL:** `/api/auth/login/owner`
- **Method:** `POST`
- **Authorization:** None
- **Description:** Log in a theater owner.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  { "_id": "string", "name": "string", "email": "string", "token": "string" }
  ```

### Movie Routes

#### Create Movie

- **URL:** `/api/movies/create`
- **Method:** `POST`
- **Authorization:** Bearer token (Owner)
- **Description:** Create a new movie.
- **Request Body:**
  ```json
  {
    "name": "string",
    "startDate": "string (YYYY-MM-DD)",
    "endDate": "string (YYYY-MM-DD)",
    "seatsAvailable": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Movie created successfully",
    "movie": {
      "id": "string",
      "name": "string",
      "startDate": "string (YYYY-MM-DD)",
      "endDate": "string (YYYY-MM-DD)",
      "seatsAvailable": "integer"
    }
  }
  ```

#### Update Movie

- **URL:** `/api/movies/update/:id`
- **Method:** `PUT`
- **Authorization:** Bearer token (Owner)
- **Description:** Update an existing movie.
- **Request Body:**
  ```json
  {
    "name": "string",
    "startDate": "string (YYYY-MM-DD)",
    "endDate": "string (YYYY-MM-DD)",
    "seatsAvailable": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Movie updated successfully",
    "movie": {
      "id": "string",
      "name": "string",
      "startDate": "string (YYYY-MM-DD)",
      "endDate": "string (YYYY-MM-DD)",
      "seatsAvailable": "integer"
    }
  }
  ```

### Seat Booking Route

#### Book Seats

- **URL:** `/api/movies/book`
- **Method:** `POST`
- **Authorization:** Bearer token (User)
- **Description:** Book seats for a movie.
- **Request Body:**
  ```json
  {
    "movieId": "string",
    "Seats": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Seats booked successfully"
  }
  ```

### User Routes

#### Update User Profile

- **URL:** `/api/users/profile`
- **Method:** `PUT`
- **Authorization:** Bearer token (User)
- **Description:** Update user profile information.
- **Request Body:**
  ```json
  {
    "username": "string",
    "gender": "string",
    "dob": "string (YYYY-MM-DD)"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "gender": "string",
    "bookings": [
      {
        "movie": "string",
        "seatsBooked": "integer",
        "_id": "string"
      }
    ],
    "__v": 1,
    "dob": "2012-07-19T00:00:00.000Z"
  }
  ```

#### Get User Bookings

- **URL:** `api/users/:id/bookings`
- **Method:** `GET`
- **Authorization:** Bearer token (User)
- **Description:** Gets Users Movie Bookings.
- **Request Params:**
  req.params.id
- **Response:**

  ```json
  "bookings": [
    {
      "_id": "string",
      "movie": {
        "_id": "string",
        "name": "string",
         "other movie deatils"
              },
      "seatsBooked": "integer",
      "other booking details"
    },
    {
      "_id": "string",
      "movie": {
        "_id": "string",
        "title": "string",

        "other movie details"
      },
      "seatsBooked": "integer",
       "other booking details"
    },
     "more bookings as needed"
  ]



  ```

### Owner Routes

#### Update Owner Profile

- **URL:** `/api/owners/profile`
- **Method:** `PUT`
- **Authorization:** Bearer token (Owners)
- **Description:** Update user profile information.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Get Owner And Their Movies

- **URL:** `/api/owners/:id/bookings`
- **Method:** `GET`
- **Authorization:** Bearer token (Owner)
- **Description:** Gets Owner And Their Movies.
- **Request Params:**
  req.params.id
- **Response:**

```json

 "owner": {
   "_id": "string",
   "name": "string",
   "email": "string"

 },
 "movies": [
   {
     "_id": "movie1",
     "title": "Movie 1",
     "other movie fields"
   },
   {
     "_id": "movie2",
     "title": "Movie 2",
     "other movie fields"
   },

 ]

```

## Main Routes Configuration

The main routes are configured in the application as follows:

```javascript
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
```

## Error Handling

All error responses will have the following structure:

```json
{
  "error": "string",
  "message": "string"
}
```

## Conclusion

This documentation covers the main endpoints required for user and owner interactions with the movie booking system. Each endpoint specifies the necessary authorization, request parameters, and response structure. Ensure JWT tokens are correctly implemented and passed in the headers for protected routes.

```

```
