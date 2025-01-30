from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from app.services.sessions_service import create_session, get_user_sessions, deactivate_session, deactivate_all_sessions
from app.schemas.sessions_schema import UserSessionSchema
from app.utils.response_utils import create_response
from app.utils.security import token_required  # Importar el decorador

# Crear un Blueprint para manejar las rutas de sesiones con un prefijo de API
user_sessions_bp = Blueprint('user_sessions', __name__, url_prefix='/api/sessions')

# Instancia del esquema para serializar datos
session_schema = UserSessionSchema()
sessions_schema = UserSessionSchema(many=True)

@user_sessions_bp.route('/sessions', methods=['POST'])
@token_required  # Proteger la ruta con el decorador
def create_user_session():
    """
    Crea una nueva sesión para un usuario.

    :return: Un mensaje de éxito y la sesión creada si se realiza correctamente.
             Un mensaje de error si el user_id o el token no están presentes.
    """
    data = request.json
    user_id = data.get('user_id')  # Obtener user_id del cuerpo de la solicitud
    token = data.get('token')
    
    if not user_id or not token:
        return create_response(message="user_id y token son obligatorios", status=400)

    expires_at = datetime.now() + timedelta(hours=2)  # Expiración de 2 horas por defecto

    # Llamada al servicio para crear la sesión
    session = create_session(user_id, token, expires_at)  # Ahora solo pasamos user_id, token y expires_at
    return create_response(message="Sesión creada exitosamente", data=session_schema.dump(session), status=201)

@user_sessions_bp.route('/sessions', methods=['GET'])
@token_required  # Proteger la ruta con el decorador
def get_sessions_by_user():
    """
    Obtiene todas las sesiones activas de un usuario.

    :return: Una lista de sesiones activas del usuario.
             Un mensaje de error si el user_id no está proporcionado.
    """
    user_id = request.headers.get("user_id")  # Obtener user_id de los encabezados
    if not user_id:
        return create_response(message="user_id no proporcionado en los encabezados", status=400)

    sessions = get_user_sessions(user_id)  # Llamada al servicio para obtener sesiones activas
    return create_response(message="Sesiones obtenidas exitosamente", data=sessions_schema.dump(sessions), status=200)

@user_sessions_bp.route('/sessions/deactivate', methods=['POST'])
@token_required  # Proteger la ruta con el decorador
def deactivate_user_session():
    """
    Desactiva una sesión específica basada en su token.

    :return: Un mensaje de éxito si la sesión se desactiva correctamente.
             Un mensaje de error si la sesión no se encuentra.
    """
    token = request.json.get('token')
    if not token:
        return create_response(message="token es obligatorio", status=400)

    session = deactivate_session(token)  # Llamada al servicio para desactivar sesión
    if not session:
        return create_response(message="Sesión no encontrada", status=404)
    
    return create_response(message="Sesión desactivada exitosamente", status=200)

@user_sessions_bp.route('/sessions/deactivate_all', methods=['POST'])
@token_required  # Proteger la ruta con el decorador
def deactivate_all_user_sessions():
    """
    Desactiva todas las sesiones de un usuario.

    :return: Un mensaje de éxito si todas las sesiones se desactivan correctamente.
             Un mensaje de error si el user_id no está proporcionado.
    """
    user_id = request.headers.get("user_id")  # Obtener user_id de los encabezados
    if not user_id:
        return create_response(message="user_id no proporcionado en los encabezados", status=400)

    sessions = deactivate_all_sessions(user_id)  # Llamada al servicio para desactivar todas las sesiones
    return create_response(message=f"Todas las sesiones del usuario {user_id} han sido desactivadas.", data=sessions_schema.dump(sessions), status=200)