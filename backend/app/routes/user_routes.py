from flask import Blueprint, request, jsonify, session
from app.services.email_service import send_welcome_email, send_user_credentials_email, send_new_password_email
from app.utils.response_utils import create_response
from app.schemas.user_schema import UserSchema
from app.services.user_service import get_user_by_email, create_user, get_user_by_username, get_user, delete_user_by_status, update_profile, list_users, remove_user_photo, change_user_password, reset_user_password, update_user_data
from app.utils.security import generate_token, token_required
from app.utils.user_utils import generate_random_password, generate_username
from app.services.sessions_service import create_session
from datetime import datetime, timedelta

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

        # Crear la sesión en la base de datos usando la función create_session
        expires_at = datetime.now() + timedelta(hours=2)  # Establecer la expiración a 2 horas
        create_session(user.id, token, expires_at)  # Guardar la sesión en la base de datos

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

@user_bp.route('/delete', methods=['PUT'])
def delete_user():
    """
    Ruta para eliminar lógicamente un usuario cambiando su estado a inactivo.
    El ID del usuario se obtiene del encabezado de la solicitud.

    Utiliza 'request.headers.get' para obtener el 'user_id' desde el encabezado.
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con un mensaje de éxito o error y el código de estado correspondiente.
    """
    user_id = request.headers.get('user_id')
    if not user_id:
        return create_response(message="No se proporcionó user_id", status=400)

    result = delete_user_by_status(int(user_id))
    if result:
        return create_response(message="Usuario eliminado exitosamente", status=200)
    else:
        return create_response(message="Usuario no encontrado", status=404)
    
@user_bp.route('/update_profile', methods=['PUT'])
def update_user_profile():
    """
    Ruta para actualizar el perfil de un usuario.
    El ID del usuario se obtiene del encabezado de la solicitud.

    Utiliza 'request.headers.get' para obtener el 'user_id' desde el encabezado.
    Los datos del perfil se obtienen del cuerpo de la solicitud en formato JSON.
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con un mensaje de éxito o error y el código de estado correspondiente.
    """
    user_id = request.headers.get('user_id')
    if not user_id:
        return create_response(message="No se proporcionó user_id", status=400)

    data = request.form  # Cambia a request.form para manejar datos de formulario
    name = data.get('name')
    last_name = data.get('last_name')
    username = data.get('username')
    email = data.get('email')
    phone_number = data.get('phone_number')
    city = data.get('city')
    address = data.get('address')
    birthdate = data.get('birthdate')

    # Manejar la foto
    photo = request.files.get('photo')  # Obtener el archivo de la foto
    if photo:
        photo_data = photo.read()  # Leer el contenido del archivo como BLOB
    else:
        photo_data = None  # O manejar el caso donde no se sube una foto

    # Llamar al servicio de actualización del perfil
    result = update_profile(
        user_id=int(user_id),
        username=username,
        email=email,
        photo=photo_data,  # La foto se maneja como BLOB
        name=name,
        last_name=last_name,
        phone_number=phone_number,
        city=city,
        address=address,
        birthdate=birthdate
    )

    if result:
        return create_response(message="Perfil actualizado exitosamente", status=200)
    else:
        return create_response(message="Error al actualizar el perfil", status=400)

@user_bp.route('/list_users', methods=['GET'])
def list_all_users():
    """
    Ruta para listar todos los usuarios.

    Esta ruta permite obtener una lista de usuarios en función de su estado.
    Por defecto, se devuelven solo los usuarios activos (status = 1).
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con la lista de usuarios y el código de estado correspondiente.
    """
    users = list_users()  # Llama al servicio para listar usuarios, por defecto solo activos
    return create_response(message="Usuarios listados exitosamente", data=users, status=200)

@user_bp.route('/get_user', methods=['GET'])
def get_user_by_id():
    """
    Ruta para obtener un usuario por su ID.

    El ID del usuario se obtiene del encabezado de la solicitud.
    Utiliza el servicio 'get_user' para recuperar la información del usuario.
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con los datos del usuario si se encuentra, o un mensaje de error si no se encuentra.
    """
    user_id = request.headers.get('user_id')
    if not user_id:
        return create_response(message="No se proporcionó user_id", status=400)

    user = get_user(int(user_id))  # Llamar al servicio para obtener el usuario
    if user:
        return create_response(message="Usuario encontrado", data=user, status=200)
    else:
        return create_response(message="Usuario no encontrado", status=404)

@user_bp.route('/remove_photo', methods=['PUT'])
def remove_photo():
    """
    Ruta para eliminar la foto de un usuario.

    El ID del usuario se obtiene del encabezado de la solicitud.
    Utiliza el servicio 'remove_user_photo' para actualizar el campo photo a None.
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con un mensaje de éxito o error y el código de estado correspondiente.
    """
    user_id = request.headers.get('user_id')
    if not user_id:
        return create_response(message="No se proporcionó user_id", status=400)

    result = remove_user_photo(int(user_id))  # Llamar al servicio para eliminar la foto
    if result:
        return create_response(message="Foto eliminada exitosamente", status=200)
    else:
        return create_response(message="Usuario no encontrado", status=404)

@user_bp.route('/change_password', methods=['PUT'])
def change_password():
    """
    Ruta para cambiar la contraseña de un usuario.

    El ID del usuario se obtiene del encabezado de la solicitud.
    La nueva contraseña y la confirmación se obtienen del cuerpo de la solicitud en formato JSON.
    Utiliza el servicio 'change_user_password' para actualizar la contraseña.
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con un mensaje de éxito o error y el código de estado correspondiente.
    """
    user_id = request.headers.get('user_id')
    if not user_id:
        return create_response(message="No se proporcionó user_id", status=400)

    data = request.json
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    # Validar que se haya proporcionado una nueva contraseña
    if not new_password:
        return create_response(message="No se proporcionó nueva contraseña", status=400)

    # Validar que la nueva contraseña tenga al menos 6 caracteres
    if len(new_password) < 6:
        return create_response(message="La nueva contraseña debe tener al menos 6 caracteres", status=400)

    # Validar que la confirmación de la contraseña coincida
    if new_password != confirm_password:
        return create_response(message="Las contraseñas no coinciden", status=400)

    result = change_user_password(int(user_id), new_password)  # Llamar al servicio para cambiar la contraseña
    if result:
        return create_response(message="Contraseña cambiada exitosamente", status=200)
    else:
        return create_response(message="Usuario no encontrado", status=404)

@user_bp.route('/reset_password', methods=['PUT'])
def reset_password():
    """
    Ruta para restablecer la contraseña de un usuario.

    El correo electrónico del usuario se obtiene del cuerpo de la solicitud en formato JSON.
    Se genera una nueva contraseña y se actualiza en la base de datos.
    Utiliza el servicio 'reset_user_password' para actualizar la contraseña.
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con un mensaje de éxito o error y el código de estado correspondiente.
    """
    data = request.json
    email = data.get('email')

    # Validar que se haya proporcionado un correo electrónico
    if not email:
        return create_response(message="No se proporcionó correo electrónico", status=400)

    # Generar una nueva contraseña
    new_password = generate_random_password()

    # Llamar al servicio para restablecer la contraseña
    result = reset_user_password(email, new_password)
    if result is None:
        return create_response(message="Usuario no encontrado o inactivo", status=404)

    # Enviar la nueva contraseña por correo electrónico
    user_data = get_user_by_email(email)  # Obtener el usuario
    if user_data:
        send_new_password_email(email, user_data['person']['name'], new_password)  # Enviar el correo con la nueva contraseña

    return create_response(message="Contraseña restablecida exitosamente. Se ha enviado un correo con la nueva contraseña.", status=200)

@user_bp.route('/update_user_data', methods=['PUT'])
def update_user_data_route():
    """
    Ruta para actualizar los datos de un usuario.
    El ID del usuario se obtiene del encabezado de la solicitud.

    Utiliza 'request.headers.get' para obtener el 'user_id' desde el encabezado.
    Los datos del usuario se obtienen del cuerpo de la solicitud en formato de formulario.
    Utiliza 'create_response' de 'response_utils' para estandarizar las respuestas.

    :return: Respuesta JSON con un mensaje de éxito o error y el código de estado correspondiente.
    """
    user_id = request.headers.get('user_id')
    if not user_id:
        return create_response(message="No se proporcionó user_id", status=400)

    # Obtener datos en formato de formulario
    username = request.form.get('username')
    email = request.form.get('email')
    photo = request.files.get('photo')  # Obtener el archivo de la foto
    name = request.form.get('name')
    last_name = request.form.get('last_name')
    role = request.form.get('role')

    # Leer el contenido del archivo como BLOB
    photo_data = photo.read() if photo else None  # Manejar el caso donde no se sube una foto

    # Llamar al servicio de actualización de datos del usuario
    result = update_user_data(
        user_id=int(user_id),
        username=username,
        email=email,
        photo=photo_data,  # La foto se maneja como BLOB
        name=name,
        last_name=last_name,
        role=role
    )

    if result:
        return create_response(message="Datos del usuario actualizados exitosamente", status=200)
    else:
        return create_response(message="Error al actualizar los datos del usuario", status=400)