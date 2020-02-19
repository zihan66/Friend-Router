from flask_restful import Resource, fields, marshal_with
from flask_jwt_extended import jwt_required, current_user

from friend_router.models import User

user_fields = {
    'username': fields.String,
    'username_full': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'id': fields.Integer,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime
}

class User(Resource):
    @marshal_with(user_fields, envelope='user')
    @jwt_required
    def get(self):
        return current_user
