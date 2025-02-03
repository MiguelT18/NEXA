from datetime import datetime
from flask import request

def get_client_ip():
    """
    Obtiene la dirección IP del cliente, considerando proxies.

    :return: La dirección IP del cliente como una cadena. Si no se puede obtener, devuelve None.
    """
    ip_address = request.headers.get("X-Forwarded-For", request.remote_addr)
    return ip_address.split(",")[0].strip() if ip_address else None

def is_session_expired(expires_at):
    """
    Verifica si una sesión ha expirado.

    :param expires_at: Fecha y hora de expiración de la sesión (datetime).
    :return: True si la sesión ha expirado, False de lo contrario.
    """
    return datetime.now() > expires_at

def get_user_agent():
    """
    Obtiene el encabezado User-Agent del cliente.

    :return: El User-Agent del cliente como una cadena. Si no se encuentra, devuelve "Desconocido".
    """
    return request.headers.get("User-Agent", "Desconocido")

def mark_sessions_inactive(sessions):
    """
    Marca una lista de sesiones como inactivas.

    :param sessions: Lista de sesiones activas (lista de objetos de sesión).
    """
    for session in sessions:
        session.is_active = False
        
def is_valid_token(session, token):
    """
    Verifica si el token proporcionado coincide con la sesión activa.

    :param session: Objeto de sesión que se está verificando.
    :param token: Token que se desea validar (str).
    :return: True si el token es válido y la sesión está activa, False de lo contrario.
    """
    return session and session.token == token and session.is_active

def format_session_response(session):
    """
    Devuelve un formato estándar para las respuestas de sesiones.

    :param session: Objeto de sesión que se desea formatear.
    :return: Un diccionario con los detalles de la sesión.
    """
    return {
        "session_id": session.id,
        "user_id": session.user_id,
        "ip_address": session.ip_address,
        "user_agent": session.user_agent,
        "expires_at": session.expires_at.isoformat(),
        "is_active": session.is_active
    }
    
def clean_expired_sessions(sessions):
    """
    Filtra y elimina sesiones expiradas.

    :param sessions: Lista de sesiones (lista de objetos de sesión).
    :return: Lista de sesiones activas que no han expirado.
    """
    active_sessions = [s for s in sessions if not is_session_expired(s.expires_at)]
    return active_sessions