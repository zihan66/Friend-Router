from flask_restful import Resource, fields, marshal_with
from flask_jwt_extended import jwt_required

from .user import user_fields
from friend_router.models import User


class Users(Resource):
    @marshal_with(user_fields, envelope='users')
    @jwt_required
    def get(self):
        return User.query.all()
