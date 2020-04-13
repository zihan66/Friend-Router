from . import ma

from marshmallow import post_dump

from friend_router.models import Activity
from . import UserSchema


class ActivitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Activity
    longitude = ma.auto_field()
    latitude = ma.auto_field()
    accuracy = ma.auto_field()

    id = ma.auto_field()
    destination = ma.auto_field()
    description = ma.auto_field()
    start_time = ma.auto_field()
    created_at = ma.auto_field()
    owner = ma.Nested(UserSchema)
    participants = ma.Nested(UserSchema(many=True))

    @post_dump(pass_many=True)
    def wrap_with_envelope(self, data, many, **kwargs):
        key = 'activities' if many else 'activity'
        return {key: data}
