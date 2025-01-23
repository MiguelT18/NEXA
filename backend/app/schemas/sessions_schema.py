from marshmallow import Schema, fields

class UserSessionSchema(Schema):
    """
    Esquema de validación y serialización para las sesiones de usuario.

    Este esquema se utiliza para validar y serializar los datos de las sesiones de usuario,
    asegurando que los datos cumplan con los requisitos establecidos.

    Atributos:
    - user_id: ID del usuario asociado a la sesión (entero, obligatorio).
    - token: Token de sesión único (cadena, obligatorio).
    - ip_address: Dirección IP del usuario (cadena, opcional).
    - user_agent: Información del dispositivo o navegador del usuario (cadena, opcional).
    - expires_at: Fecha y hora de expiración de la sesión (DateTime, obligatorio).
    - is_active: Indica si la sesión está activa (booleano, opcional).
    """
    user_id = fields.Int(required=True)
    token = fields.Str(required=True)
    ip_address = fields.Str()
    user_agent = fields.Str()
    expires_at = fields.DateTime(required=True)
    is_active = fields.Bool()