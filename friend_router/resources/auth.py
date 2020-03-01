from flask_restful import reqparse, Resource, abort
from flask_jwt_extended import create_access_token, jwt_required

from friend_router.models import User

parser = reqparse.RequestParser()
parser.add_argument('username', required=True)
parser.add_argument('password')


class Auth(Resource):
    def post(self):
        """Verify user credentials and generate authorization token."""
        args = parser.parse_args()
        username = args.get('username')
        password = args.get('password')

        # Check user credential
        user = User.verify_user(username, password)
        if user is None:
            abort(401)

        # Generate and return an access token
        access_token = create_access_token(identity=user.id)
        return {'token': access_token}


class AuthResource(Resource):
    method_decorators = [jwt_required]
