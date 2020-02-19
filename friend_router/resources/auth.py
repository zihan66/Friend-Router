from flask_restful import reqparse, Resource, abort
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

from friend_router.models import User

parser = reqparse.RequestParser()
parser.add_argument('username', type=str.lower, required=True)

class Auth(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        return {
            'id': user.id,
            'username': user.username
        }

    def post(self):
        args = parser.parse_args()
        username = args['username']

        user = User.verify_user(username)
        if user is None:
            abort(401)
        access_token = create_access_token(identity=user.id)
        return {'token': access_token}




