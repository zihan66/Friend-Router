from flask_restful import fields, marshal_with, abort
from flask_jwt_extended import current_user

from friend_router.models import User

from .location import location_fields
from .auth import AuthResource

user_fields = {
    'username': fields.String,
    'username_full': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'id': fields.Integer,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime,
    'location': fields.Nested(location_fields, allow_null=True)
}


class UserResource(AuthResource):
    @marshal_with(user_fields, envelope='user')
    def get(self, id=None):
        # If no argument, return the current user
        if id is None:
            return current_user

        # Otherwise, return the user with given id.
        user = User.query.get(id)
        if user is None:
            abort(404, message='User does not exist.')
        return user
