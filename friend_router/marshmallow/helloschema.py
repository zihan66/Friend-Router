from . import ma


class HelloSchema(ma.Schema):
    name = ma.Str(data_key='hello')
    modern = ma.Str()
    traditional = ma.Str()
    original = ma.Str()
