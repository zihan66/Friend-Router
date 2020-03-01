# Friend Router

The backend of Friend Router using [Flask](https://flask.palletsprojects.com/en/1.1.x/) and [Flask-RESTFul](http://github.com/twilio/flask-restful).

## Installation

### Development

For development, it is recommended to use sqlite3 to reduce complexity. No additional setup is needed if the database is sqlite3.

```
$ pip install -r requirements.txt
$ export FLASK_APP=friend_router
$ export FLASK_ENV=development

$ flask initdb
$ flask run
```

## API Docs

### Authorization

Authorization is implemented with [Flask-JWT-Extended](https://github.com/vimalloc/flask-jwt-extended). The client needs to obtain an access token, and to access protected resources, include the `Authorization` header.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

#### POST /api/authorize

```
POST /api/authorize HTTP/1.1

{
    "username": "cat",
    "password": "mysecretpassword"
}
```

* username: The username for the user.
* password: The password for authentication.

```
HTTP/1.0 200 OK

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

* token: the bearer access token to authenticate requests following that.

### API Objects

#### User

```
{
    "created_at": "Sun, 01 Mar 2020 03:52:41 -0000",
    "first_name": "Dig",
    "id": 2,
    "is_active": true,
    "last_name": null,
    "location": {
        "accuracy": 1.0,
        "created_at": "Sun, 01 Mar 2020 14:53:20 -0000",
        "latitude": 10.0,
        "longitude": 6.0
    },
    "seconds_since_active": 0,
    "updated_at": "Sun, 01 Mar 2020 03:52:41 -0000",
    "username": "dig",
    "username_full": "dig"
}
```

* `id`: Unique user ID.
* `username`: Unique user name (always lowercase).
* `username_full`: Original user name set by the user, with capital letters.
* `location`: A Location object (`null` if the user has never sent any updates).
* `seconds_since_active`: Number of seconds since the server receive last update from the user.
* `is_active`: True if the user is active within the last N seconds. (Default 30 seconds)

#### Location

```
{
    "accuracy": 1.23456,
    "created_at": "Sun, 01 Mar 2020 19:10:42 -0000",
    "latitude": 2.34567,
    "longitude": 3.45678
}
```

* `created_at`: Time when the user posted the update.

### API Resources

#### GET /api/user

Return the user information of the authenticated user.

```
GET /api/user HTTP/1.1

{
    "user": { ... }
}
```

* `user`: an User object.

#### GET /api/user/\<id>

Query a specific user given user id.

```
GET /api/user/1 HTTP/1.1

{
    "user": { ... }
}
```

* `user`: an User object.

#### GET /api/users

Return all registered users.

```
GET /api/users HTTP/1.1

{
    "users": [
        ...
    ]
}
```

* `users`: a list of User objects.

#### POST /api/location

Send user location update to the server.

```
POST /api/location HTTP/1.1

{
    "accuracy": "1.23456",
    "latitude": "2.34567",
    "longitude": "3.45678"
}
```

```
HTTP/1.0 200 OK

{
    "location": { ... }
}
```

* `location`: A Location object.

#### GET /api/location

Return a list of location history for the authenticated user.

```
GET /api/location HTTP/1.1

{
    "locations": [
        ...
    ]
}
```

* `locations`: A List of Location object.

### API Errors

#### 401 Unauthorized

The authentication token is missing or invalid.

```
HTTP/1.0 401 UNAUTHORIZED

{
    "msg": "Missing Authorization Header"
}
```

Password is incorrect.

```
HTTP/1.0 401 UNAUTHORIZED

{
    "message": "The server could not verify that you are authorized to access the URL requested. You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required."
}
```

#### 405 Method Not Allowed

The HTTP method is not allowed on the endpoint. Try to use another method (`GET` vs. `POST`).

```
HTTP/1.0 405 METHOD NOT ALLOWED

{
    "message": "The method is not allowed for the requested URL."
}
```
