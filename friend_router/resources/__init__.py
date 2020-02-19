from flask_restful import Api

api = Api()

from .helloworld import HelloWorld
from .auth import Auth

api.add_resource(HelloWorld, '/hello', '/hello/<string:name>')
api.add_resource(Auth, '/login')
