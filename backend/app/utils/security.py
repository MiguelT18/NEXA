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