from app.models.user_sessions import UserSessions
from app.extensions import db
from datetime import datetime

def create_session(user_id, token, ip_address, user_agent, expires_at):
    """
    Crea una nueva sesión para un usuario.

    :param user_id: ID del usuario para el que se crea la sesión.
    :param token: Token de sesión único.
    :param ip_address: Dirección IP del usuario.
    :param user_agent: Información del dispositivo o navegador del usuario.
    :param expires_at: Fecha y hora de expiración de la sesión.
    :return: La nueva instancia de UserSessions creada.
    """
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