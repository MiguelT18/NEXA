from app.models.base import BaseMixin
from app.extensions import db

class UserSessions(BaseMixin, db.Model):
    """
    Modelo de sesión de usuario que almacena información sobre las sesiones activas de los usuarios.

    Atributos:
    - user_id: ID del usuario asociado a la sesión (entero, obligatorio).
    - token: Token de sesión único (cadena, obligatorio).
    - ip_address: Dirección IP del usuario (cadena, opcional).
    - user_agent: Información del dispositivo o navegador del usuario (texto, opcional).
    - expires_at: Fecha y hora de expiración de la sesión (DateTime, obligatorio).
    - is_active: Indica si la sesión está activa (booleano, por defecto True).
    """
    __tablename__ = "user_sessions"
    
    # Columnas heredadas de BaseMixin: id, date_created, date_modified, status
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token = db.Column(db.String(255), nullable=False, unique=True)
    ip_address = db.Column(db.String(45), nullable=True)  # IPv4 o IPv6
    user_agent = db.Column(db.Text, nullable=True)  # Información del dispositivo/navegador
    expires_at = db.Column(db.DateTime, nullable=False)  # Fecha y hora de expiración
    is_active = db.Column(db.Boolean, server_default='1', nullable=False)  # Indica si la sesión está activa

    # Relación con la tabla de usuarios
    user = db.relationship("User", backref=db.backref("sessions", lazy=True))

    def __init__(self, user_id, token, ip_address=None, user_agent=None, expires_at=None, is_active=True):
        """
        Inicializa una nueva instancia de UserSessions.

        :param user_id: ID del usuario asociado a la sesión.
        :param token: Token de sesión único.
        :param ip_address: Dirección IP del usuario (opcional).
        :param user_agent: Información del dispositivo o navegador del usuario (opcional).
        :param expires_at: Fecha y hora de expiración de la sesión.
        :param is_active: Indica si la sesión está activa (por defecto True).
        """
        self.user_id = user_id
        self.token = token
        self.ip_address = ip_address
        self.user_agent = user_agent
        self.expires_at = expires_at
        self.is_active = is_active

    def __repr__(self):
        return f"<UserSessions(user_id={self.user_id}, token={self.token}, expires_at={self.expires_at}, is_active={self.is_active})>"