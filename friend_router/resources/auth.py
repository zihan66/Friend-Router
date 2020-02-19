from flask_restful import reqparse, Resource, abort, fields, marshal_with
from flask_jwt_extended import jwt_required, create_access_token, current_user

from friend_router.models import User

parser = reqparse.RequestParser()
parser.add_argument('username', type=str.lower, required=True)

user_fields = {
    'username': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'id': fields.Integer
}

class Auth(Resource):
    @marshal_with(user_fields, envelope='user')
    @jwt_required
    def get(self):
        return current_user

    def post(self):
        args = parser.parse_args()
        username = args['username']

        user = User.verify_user(username)
        if user is None:
            abort(401)
        access_token = create_access_token(identity=user.id)
        return {'token': access_token}




