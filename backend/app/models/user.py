from app.models.base import BaseMixin
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(BaseMixin, db.Model):
    """
    Modelo de usuario que referencia a una persona.

    Atributos:
    - id: Identificador único del registro (heredado de BaseMixin).
    - date_created: Fecha y hora en que se creó el registro (heredado de BaseMixin).
    - date_modified: Fecha y hora en que se modificó el registro (heredado de BaseMixin).
    - status: Estado del registro (0 = inactivo, 1 = activo, heredado de BaseMixin).
    - person_id: Identificador de la persona asociada (entero, opcional).
    - username: Nombre de usuario único (cadena, obligatorio).
    - email: Correo electrónico único (cadena, obligatorio).
    - password_hash: Hash de la contraseña (cadena, obligatorio).
    - photo: Imagen del usuario (BLOB).
    - role: Rol del usuario (cadena, opcional).

    Relaciones:
    - person: Relación con el modelo Person, que permite acceder a la información de la persona asociada.
    """
    __tablename__ = 'users'

    person_id = db.Column(db.Integer, db.ForeignKey('persons.id'), nullable=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    photo = db.Column(db.LargeBinary)  # Cambiado a BLOB para almacenar imágenes
    role = db.Column(db.String(20), default='usuario', nullable=True)  # Asignar rol por defecto

    person = db.relationship('Person', backref=db.backref('user', uselist=False))

    def __init__(self, person, username, email, password, photo=None, role='usuario'):
        """
        Inicializa una instancia de User con una persona asociada y genera el hash de la contraseña.

        :param person: Instancia de Person asociada al usuario (opcional).
        :param username: Nombre de usuario único.
        :param email: Correo electrónico único.
        :param password: Contraseña del usuario.
        :param photo: Imagen del usuario (BLOB, opcional).
        :param role: Rol del usuario (cadena, opcional, por defecto 'usuario').
        """
        self.person = person
        self.username = username
        self.email = email
        self.set_password(password)  # Generar el hash al inicializar
        self.photo = photo  # Asignar la imagen del usuario
        self.role = role  # Asignar el rol del usuario

    def set_password(self, password):
        """
        Genera un hash de la contraseña proporcionada.

        :param password: Contraseña en texto plano.
        """
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """
        Verifica si la contraseña proporcionada coincide con el hash almacenado.

        :param password: Contraseña en texto plano a verificar.
        :return: True si la contraseña coincide, False en caso contrario.
        """
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"