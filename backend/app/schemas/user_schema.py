from marshmallow import Schema, fields, validate, ValidationError
   
def validate_email_domain(email):
    """Valida que el correo electrónico termine en .com."""
    if not email.endswith('.com'):
        raise ValidationError("El correo electrónico debe terminar en '.com'.")

class UserSchema(Schema):
    """
    Esquema para validar y serializar datos de usuario.
    """

    name = fields.Str(required=True, validate=validate.Length(min=2, max=50))  # Agregar nombre
    last_name = fields.Str(required=True, validate=validate.Length(min=2, max=50))  # Agregar apellido
    email = fields.Email(required=True, validate=validate_email_domain)