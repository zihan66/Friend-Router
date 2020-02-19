from flask import Flask
from flask_restful import reqparse, Api

from friend_router.resources import HelloWorld

app = Flask(__name__)
api = Api(app)

api.add_resource(HelloWorld, '/hello', '/hello/<string:name>')

