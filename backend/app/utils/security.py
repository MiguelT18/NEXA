import jwt
from functools import wraps
from flask import request, jsonify
from app.config import Config


def generate_token(user_id):
    """
    Genera un token JWT para el usuario.
    """
    payload = {"user_id": user_id}
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