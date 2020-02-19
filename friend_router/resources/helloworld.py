from flask_restful import Resource, reqparse, fields, marshal_with


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


hello_fields = {
    'hello': fields.String(attribute='name'),
    'modern': fields.String(),
    'traditional': fields.String(),
    'original': fields.String()
}

parser = reqparse.RequestParser()
parser.add_argument('greeting', default='hello')


class HelloWorld(Resource):
    @marshal_with(hello_fields)
    def get(self, name='world'):
        args = parser.parse_args()
        return Hello(name, args['greeting'])
