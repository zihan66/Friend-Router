from flask import Blueprint
from flask_restful import Api
from webargs.flaskparser import parser, abort

from .helloworld import HelloWorld
from .auth import Auth
from .user import UserResource
from .location import LocationResource
from .users import Users
from .friend import FriendResource
from .friendrequest import FriendRequestResource
from .activity import ActivityResource
from .expopushtoken import ExpoPushTokenResource


# https://github.com/marshmallow-code/webargs/blob/dev/examples/flaskrestful_example.py
# This error handler is necessary for usage with Flask-RESTful
@parser.error_handler
def handle_request_parsing_error(err, req, schema, *, error_status_code, error_headers):
    """webargs error handler that uses Flask-RESTful's abort function to return
    a JSON error response to the client.
    """

    abort(error_status_code, errors=err.messages)


api = Blueprint('api', __name__)

restful = Api(api)

restful.add_resource(HelloWorld, '/hello', '/hello/<string:name>')
restful.add_resource(Auth, '/authorize')
restful.add_resource(UserResource, '/user', '/user/<int:id>')
restful.add_resource(Users, '/users')
restful.add_resource(LocationResource, '/location')
restful.add_resource(FriendResource, '/friend', '/friends')
restful.add_resource(FriendRequestResource,
                     '/friend_request', '/friend_requests',
                     '/friendrequest', 'friendrequests')
restful.add_resource(ActivityResource,
                     '/activity', '/activities')
restful.add_resource(ExpoPushTokenResource,
                     '/expo_push_token', '/expopushtoken')
