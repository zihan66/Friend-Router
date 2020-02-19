from flask import Blueprint
from flask_restful import Api

from .helloworld import HelloWorld
from .auth import Auth
from .user import User

api = Blueprint('api', __name__)

restful = Api(api)

restful.add_resource(HelloWorld, '/hello', '/hello/<string:name>')
restful.add_resource(Auth, '/authorize')
restful.add_resource(User, '/user')
