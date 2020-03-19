from . import ma

from marshmallow import post_dump

from friend_router.models import User
from .locationschema import LocationSchema


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    username = ma.Str()
    username_full = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    id = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()
    location = ma.Nested(LocationSchema)
    seconds_since_active = ma.Int()
    is_active = ma.Bool()

    @post_dump(pass_many=True)
    def wrap_with_envelope(self, data, many, **kwargs):
        key = 'users' if many else 'user'
        return {key: data}
