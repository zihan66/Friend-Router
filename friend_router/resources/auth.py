from flask_restful import reqparse, Resource, abort
from flask_jwt_extended import jwt_required, create_access_token

from friend_router.models import User

class Auth(Resource):
    def post(self):
        """Verify user credentials and generate authorization token."""
        args = parser.parse_args()
        username = args['username']

        # Check user credential
        user = User.verify_user(username)
        if user is None:
            abort(401)

        # Generate and return an access token
        access_token = create_access_token(identity=user.id)
        return {'token': access_token}




