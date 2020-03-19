from . import ma

from marshmallow import post_dump

from friend_router.models import Location


class LocationSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Location
    latitude = ma.auto_field()
    longitude = ma.auto_field()
    accuracy = ma.auto_field()
    created_at = ma.auto_field()

    @post_dump(pass_many=True)
    def wrap_with_envelope(self, data, many, **kwargs):
        key = 'locations' if many else 'location'
        return {key: data}
