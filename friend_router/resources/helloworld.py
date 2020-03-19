from flask_restful import Resource, reqparse

from friend_router.marshmallow import HelloSchema


class Hello:
    def __init__(self, name, greeting):
        self.name = name
        self.greeting = greeting

    @property
    def modern(self):
        return '{}, {}!'.format(self.greeting.capitalize(),
                                self.name.capitalize())

    @property
    def traditional(self):
        return '{}, {}'.format(self.greeting.lower(), self.name.lower())

    @property
    def original(self):
        return '{}, {}'.format(self.greeting, self.name)


parser = reqparse.RequestParser()
parser.add_argument('greeting', default='hello')


class HelloWorld(Resource):
    def get(self, name='world'):
        args = parser.parse_args()
        hello = Hello(name, args['greeting'])
        schema = HelloSchema()
        return schema.dump(hello)
