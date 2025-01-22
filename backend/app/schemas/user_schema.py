from marshmallow import (
    Schema,
    fields,
    # validate,
    ValidationError,
)


def validate_email_domain(email):
    """Valida que el correo electrónico termine en .com."""
    if not email.endswith(".com"):
        raise ValidationError("El correo electrónico debe terminar en '.com'.")


class UserSchema(Schema):
    """
    Esquema para validar y serializar datos de usuario.

    Atributos:
    - email: Correo electrónico único del usuario (cadena, obligatorio, debe terminar en .com).
    """

    name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.Email(
        required=True, validate=validate_email_domain
    )  # Validación de correo electrónico
