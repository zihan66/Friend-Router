from datetime import timedelta


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = 'super-secret'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

    PREDEFINED_LOCATIONS = {
        'zachry': (30.621374, -96.340157),
        'commons': (30.59089, -96.303342),
    }
