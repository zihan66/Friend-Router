from datetime import timedelta


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = 'super-secret'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

    PREDEFINED_LOCATIONS = {
        'zachry': (30.6213739, -96.3401566),
        'zachary': (30.6213739, -96.3401566),
        'commons': (30.6154181, -96.3371051),
    }