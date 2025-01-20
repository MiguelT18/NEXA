from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    """
    Esquema para validar y serializar datos de usuario.
    """
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True, validate=validate.Length(min=6))