from flask import Blueprint, request, jsonify, session
from app.services.email_service import send_welcome_email, send_user_credentials_email
from app.utils.response_utils import create_response
from app.schemas.user_schema import UserSchema
from app.services.user_service import get_user_by_email, create_user, get_user_by_username, get_user
from app.utils.security import generate_token, token_required
from app.utils.user_utils import generate_random_password, generate_username

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

    Esta ruta valida los datos del usuario, crea una nueva instancia de usuario y persona,
    y envía un correo electrónico al usuario con su nombre de usuario y contraseña.

    :return: Un mensaje de éxito y los datos del usuario registrado.
    """
    data = request.json
    user_schema = UserSchema()
    try:
        user_data = user_schema.load(data)
        
        # Extraer los campos necesarios
        name = data.get('name')
        last_name = data.get('last_name')
        email = user_data.get('email')
        
        # Generar un nombre de usuario y una contraseña aleatoria
        username = generate_username(last_name)
        password = generate_random_password()  # Generar una contraseña aleatoria

        # Crear el nuevo usuario
        new_user = create_user(username, email, password, name, last_name)
        
        # Enviar un correo electrónico al usuario con sus credenciales
        send_user_credentials_email(email, name, username, password)

        return jsonify({"message": "Usuario registrado con éxito", "user": user_schema.dump(new_user)}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400


@user_bp.route('/login', methods=['POST'])
def login():
    """
    Ruta para iniciar sesión y obtener un token.

    Esta ruta permite a un usuario iniciar sesión utilizando su nombre de usuario y contraseña.
    Se verifica que el usuario exista y que su estado sea activo (status = 1).

    :return: Un mensaje de éxito y un token de acceso si las credenciales son válidas.
             Un mensaje de error si las credenciales son incorrectas o el usuario no está activo.
    """
    data = request.json
    username = data.get("username")  # Obtener el nombre de usuario del JSON
    password = data.get("password")  # Obtener la contraseña del JSON

    user = get_user_by_username(username)  # Cambiar a búsqueda por nombre de usuario
    if user and user.check_password(password):
        token = generate_token(user.id, user.username)

        # Guardar en la sesión
        session['token'] = token
        session['username'] = username
        session['name'] = user.name  # Asegúrate de que el atributo 'name' esté disponible
        session['user_id'] = user.id

        return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200

    return jsonify({"message": "Credenciales incorrectas"}), 401  # Credenciales incorrectas


@user_bp.route('/profile', methods=['GET'])
@token_required
def profile():
    """
    Ruta para obtener la información del perfil del usuario autenticado.

    Esta ruta extrae el ID del usuario del token y utiliza el servicio para obtener
    la información del usuario, incluyendo sus atributos y la información de la persona asociada.

    :return: Un mensaje de éxito y los datos del usuario si se encuentra,
             o un mensaje de error si el usuario no se encuentra.
    """
    user_id = request.headers.get("user_id")  # Extraer el ID del usuario del encabezado
    user = get_user(user_id)  # Llamar al servicio para obtener el usuario
    if user:
        return jsonify({"user": user}), 200  # Devolver la información del usuario
    return jsonify({"message": "Usuario no encontrado"}), 404  # Usuario no encontrado

@user_bp.route('/logout', methods=['POST'])
@token_required
def logout():
    """
    Ruta para cerrar la sesión del usuario autenticado.

    Esta ruta elimina la información del usuario de la sesión actual.

    :return: Un mensaje de éxito indicando que la sesión se ha cerrado.
    """
    # Limpiar la sesión
    session.clear()  # Eliminar toda la información de la sesión

    return jsonify({"message": "Sesión cerrada con éxito."}), 200