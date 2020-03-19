from flask_marshmallow import Marshmallow

ma = Marshmallow()

from .helloschema import HelloSchema
from .userschema import UserSchema
from .locationschema import LocationSchema
