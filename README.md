# Friend Router

The backend of Friend Router using [Flask](https://flask.palletsprojects.com/en/1.1.x/) and [Flask-RESTFul](http://github.com/twilio/flask-restful).

## Introduction

The main purpose of Friend Router is to simplify group meetups on campus. It is a mobile application, installed on the smart phone of each student (either on an Android phone or iPhone). The system allows students to post their status updates (in class or free), and check their friends' status, so that they can know which friends are potentially available for a meetup. At the same time, they can browse others’ location and choose friends that are close or on the way to the destination. Once a user have selected a list of friends and started to plan the details of a meetup, the system allows the user to send invitations to his or her friends, and eventually provides navigation to the destination. The interface is similar to most instant messaging applications, providing users familiar experiences.

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

The API docs section are moved to the project wiki. Please refer to the project wiki for details.

## License

```
# Released under MIT License

Copyright (c) 2013 Mark Otto.

Copyright (c) 2017 Andrew Fong.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
