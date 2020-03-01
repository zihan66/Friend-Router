from flask import Blueprint
from flask_restful import Api

from .helloworld import HelloWorld
from .auth import Auth
from .user import UserResource
from .location import LocationResource
from .users import Users

api = Blueprint('api', __name__)

restful = Api(api)

restful.add_resource(HelloWorld, '/hello', '/hello/<string:name>')
restful.add_resource(Auth, '/authorize')
restful.add_resource(UserResource, '/user')
restful.add_resource(Users, '/users')
restful.add_resource(LocationResource, '/location')
