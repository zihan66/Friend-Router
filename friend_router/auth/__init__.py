from flask_jwt_extended import JWTManager
from friend_router.models import User

jwt = JWTManager()


@jwt.user_loader_callback_loader
def user_loader(identity):
    user = User.query.get(identity)
    return user
