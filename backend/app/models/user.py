from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.base import BaseMixin


class User(BaseMixin, db.Model):
    """
    Modelo de usuario para la base de datos.
    """
    __tablename__ = 'users'

   
    # User Name
    name = db.Column(db.String(128), nullable=False)

    # Additional User Data
    last_name = db.Column(db.String(128), nullable=False)
    username = db.Column(db.String(128), nullable=False, unique=True)
    
    # New columns for phone_number and address with nullable option
    phone_number = db.Column(db.String(20), nullable=True)
    city = db.Column(db.String(255), nullable=True)

    # Identification Data: email & password
    email = db.Column(db.String(128), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)

    # Authorisation Data: role & status
    role = db.Column(db.SmallInteger, nullable=True, default=1)
    status = db.Column(db.SmallInteger, nullable=False, default=1)

    # Photo indicator, nullable
    photo = db.Column(db.SmallInteger, default=0, nullable=True)  # 0 = no photo, 1 = photo exists, or null if not specified

    # New instance instantiation procedure
    def __init__(self, name, last_name, username, email, password, photo=None, phone_number=None, city=None):
        self.name = name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password_hash = password
        self.photo = photo if photo is not None else 0
        self.phone_number = phone_number
        self.city = city

    def __repr__(self):
        return '<User %r>' % (self.name)

    def set_password(self, password):
        """
        Genera un hash de la contraseña.
        """
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """
        Verifica si la contraseña proporcionada coincide con el hash.
        """
        return check_password_hash(self.password_hash, password)