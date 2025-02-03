import jwt
from functools import wraps
from flask import request, jsonify
from app.config import Config
from datetime import datetime, timedelta


def generate_token(user_id, username):
    """
    Genera un token JWT para el usuario con una expiración de 2 horas.

    :param user_id: ID del usuario para el que se genera el token.
    :param username: Nombre de usuario para incluir en el token.
    :return: Token JWT codificado.
    """
    expiration = datetime.now() + timedelta(hours=2)  # Establecer la expiración a 2 horas
    payload = {
        "user_id": user_id,
        "username": username,
        "exp": expiration  # Agregar el tiempo de expiración al payload
    }
    return jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")


def token_required(f):
    """
    Decorador para proteger rutas con autenticación mediante token.

    :param f: La función de vista que se va a proteger.
    :return: La función decorada que verifica la validez del token.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token no proporcionado"}), 401
        try:
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            request.headers["user_id"] = payload["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "El token ha expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Token inválido"}), 401
        return f(*args, **kwargs)
    return decorated

def refresh_token(token):
    """
    Renueva un token JWT si está a punto de expirar.

    :param token: Token JWT que se desea renovar.
    :return: Nuevo token JWT codificado con una nueva fecha de expiración.
    :raises ValueError: Si el token es inválido.
    """
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"], options={"verify_exp": False})
        expiration = datetime.now() + timedelta(hours=2)
        payload["exp"] = expiration
        return jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")
    except jwt.InvalidTokenError:
        raise ValueError("Token inválido")
    
def decode_token(token):
    """
    Decodifica un token JWT y devuelve su payload.

    :param token: Token JWT que se desea decodificar.
    :return: Payload del token decodificado.
    :raises ValueError: Si el token ha expirado o es inválido.
    """
    try:
        return jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("El token ha expirado")
    except jwt.InvalidTokenError:
        raise ValueError("Token inválido")
    
def role_required(allowed_roles):
    """
    Decorador para restringir el acceso basado en roles.

    :param allowed_roles: Lista de roles permitidos para acceder a la ruta.
    :return: La función decorada que verifica el rol del usuario.
    """
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            token = request.headers.get("Authorization")
            if not token:
                return jsonify({"message": "Token no proporcionado"}), 401
            try:
                payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
                user_role = payload.get("role")
                if user_role not in allowed_roles:
                    return jsonify({"message": "Acceso denegado: rol insuficiente"}), 403
            except jwt.InvalidTokenError:
                return jsonify({"message": "Token inválido"}), 401
            return f(*args, **kwargs)
        return wrapped
    return decorator

def get_user_id_from_request():
    """
    Obtiene el user_id del encabezado de la solicitud.

    :return: ID del usuario extraído del token.
    :raises ValueError: Si el token no está presente o es inválido.
    """
    token = request.headers.get("Authorization")
    if not token:
        raise ValueError("Token no proporcionado")
    payload = decode_token(token)
    return payload.get("user_id")

def time_until_expiration(expiration):
    """
    Calcula el tiempo restante hasta la expiración en segundos.

    :param expiration: Timestamp de expiración en segundos.
    :return: Tiempo restante hasta la expiración en segundos.
    """
    return (datetime.fromtimestamp(expiration) - datetime.now()).total_seconds()

def get_token_time_left(token):
    """
    Calcula el tiempo restante de validez del token en segundos.

    :param token: Token JWT del cual se desea obtener el tiempo restante.
    :return: Tiempo restante de validez del token en segundos.
    """
    payload = decode_token(token)  # Decodificar el token para obtener el payload
    expiration = payload.get("exp")  # Obtener el tiempo de expiración del payload
    return time_until_expiration(expiration)  # Llamar a la función para calcular el tiempo restante