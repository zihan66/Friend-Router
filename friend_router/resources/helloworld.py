from flask_restful import Resource

class HelloWorld(Resource):
    def get(self, name='world'):
        return {
            'hello': name,
            'modern': 'Hello, {}!'.format(name.capitalize()),
            'traditional': 'hello, {}'.format(name.lower())
        }
