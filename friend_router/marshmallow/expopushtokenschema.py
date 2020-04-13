from . import ma

from friend_router.models import ExpoPushToken


class ExpoPushTokenSchema(ma.SQLAlchemySchema):
    class Meta:
        model = ExpoPushToken

    id = ma.auto_field()
    created_at = ma.auto_field()
