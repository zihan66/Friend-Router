from flask_restful import marshal_with

from friend_router.models import User

from .user import user_fields
from .auth import AuthResource


class Users(AuthResource):
    @marshal_with(user_fields, envelope='users')
    def get(self):
        return User.query.all()
