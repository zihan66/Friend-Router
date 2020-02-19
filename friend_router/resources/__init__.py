from flask_restful import Api

api = Api()

from .helloworld import HelloWorld

api.add_resource(HelloWorld, '/hello', '/hello/<string:name>')
