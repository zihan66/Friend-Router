from flask import Blueprint
from flask_restful import Api

api = Blueprint("api", __name__)

from .helloworld import HelloWorld
from .auth import Auth

restful = Api(api)

restful.add_resource(HelloWorld, '/hello', '/hello/<string:name>')
restful.add_resource(Auth, '/login')
