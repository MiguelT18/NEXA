from flask import request
from app.models.user_sessions import UserSessions
from app.extensions import db
from datetime import datetime
from app.utils.sessions_utils import get_client_ip, get_user_agent

def create_session(user_id, token, expires_at):
    """
    Crea una nueva sesión para un usuario.

    Esta función captura automáticamente la dirección IP y el User-Agent del cliente
    a partir de los encabezados de la solicitud y crea una nueva entrada en la tabla
    de sesiones de usuario.

    :param user_id: ID del usuario para el que se crea la sesión (int).
    :param token: Token de sesión único que se asigna al usuario (str).
    :param expires_at: Fecha y hora de expiración de la sesión (datetime).
    
    :return: La nueva instancia de UserSessions creada.
    """
    # Capturar la IP del cliente usando la función de utilidades
    ip_address = get_client_ip()

    # Capturar el User-Agent usando la función de utilidades
    user_agent = get_user_agent()

    # Crear la nueva sesión
    new_session = UserSessions(
        user_id=user_id,
        token=token,
        ip_address=ip_address,
        user_agent=user_agent,
        expires_at=expires_at
    )
    db.session.add(new_session)
    db.session.commit()
    return new_session

def get_user_sessions(user_id):
    """
    Obtiene todas las sesiones activas de un usuario.

    :param user_id: ID del usuario cuyas sesiones se desean obtener.
    :return: Una lista de instancias de UserSessions que representan las sesiones activas del usuario.
    """
    return UserSessions.query.filter_by(user_id=user_id, is_active=True).all()

def deactivate_session(token):
    """
    Desactiva una sesión específica basada en su token.

    :param token: Token de la sesión que se desea desactivar.
    :return: La instancia de UserSessions desactivada, o None si no se encuentra la sesión.
    """
    session = UserSessions.query.filter_by(token=token, is_active=True).first()
    if session:
        session.is_active = False
        session.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Actualizar la fecha de modificación
        db.session.commit()
    return session

def deactivate_all_sessions(user_id):
    """
    Desactiva todas las sesiones de un usuario.

    :param user_id: ID del usuario cuyas sesiones se desean desactivar.
    :return: Una lista de instancias de UserSessions que fueron desactivadas.
    """
    sessions = UserSessions.query.filter_by(user_id=user_id, is_active=True).all()
    for session in sessions:
        session.is_active = False
        session.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Actualizar la fecha de modificación
    db.session.commit()
    return sessions