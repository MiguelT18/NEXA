from flask import Blueprint, request, jsonify
from app.services.email_service import send_welcome_email
from app.utils.response_utils import create_response
from app.schemas.user_schema import UserSchema
from app.services.user_service import get_user_by_email, create_user, get_user_by_id
from app.utils.security import generate_token, token_required

user_bp = Blueprint("user", __name__, url_prefix="/api/users")

@user_bp.route('/welcome', methods=['POST'])
def welcome():
    """
    Endpoint para enviar un correo de bienvenida al usuario.
    """
    data = request.json
    to_email = data.get('email')
    name = data.get('name')

    try:
        message = send_welcome_email(to_email, name)
        return create_response(message=message, status=200)
    except Exception as e:
        return create_response(message="Error al enviar el correo", error=str(e), status=500)
    
@user_bp.route('/register', methods=['POST'])
def register():
    """
    Ruta para registrar un nuevo usuario.
    """
    data = request.json
    user_schema = UserSchema()
    try:
        user_data = user_schema.load(data)
        new_user = create_user(user_data)
        return jsonify({"message": "Usuario registrado con éxito", "user": user_schema.dump(new_user)}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400


@user_bp.route('/login', methods=['POST'])
def login():
    """
    Ruta para iniciar sesión y obtener un token.
    """
    data = request.json
    user = get_user_by_email(data.get("email"))
    if user and user.check_password(data.get("password")):
        token = generate_token(user.id)
        return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200
    return jsonify({"message": "Credenciales incorrectas"}), 401


@user_bp.route('/profile', methods=['GET'])
@token_required
def profile():
    """
    Ruta para obtener la información del perfil del usuario autenticado.
    """
    user_id = request.headers.get("user_id")  # Simulado; debe extraerse del token
    user = get_user_by_id(user_id)
    if user:
        user_schema = UserSchema()
        return jsonify({"user": user_schema.dump(user)}), 200
    return jsonify({"message": "Usuario no encontrado"}), 404