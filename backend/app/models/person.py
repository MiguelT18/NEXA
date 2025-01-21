from app.models.base import BaseMixin
from app.extensions import db

class Person(BaseMixin, db.Model):
    """
    Modelo de persona que contiene información general de individuos.

    Atributos:
    - id: Identificador único del registro (heredado de BaseMixin).
    - date_created: Fecha y hora en que se creó el registro (heredado de BaseMixin).
    - date_modified: Fecha y hora en que se modificó el registro (heredado de BaseMixin).
    - status: Estado del registro (0 = inactivo, 1 = activo, heredado de BaseMixin).
    - name: Nombre de la persona (cadena, obligatorio).
    - last_name: Apellido de la persona (cadena, obligatorio).
    - phone_number: Número de teléfono de la persona (cadena, opcional).
    - address: Dirección de la persona (cadena, opcional).
    - city: Ciudad de la persona (cadena, opcional).
    - birthdate: Fecha de nacimiento de la persona (fecha, opcional).
    """
    __tablename__ = 'persons'

    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    birthdate = db.Column(db.Date, nullable=True)

    def __init__(self, name, last_name, phone_number=None, address=None, city=None, birthdate=None):
        self.name = name
        self.last_name = last_name
        self.phone_number = phone_number
        self.address = address
        self.city = city
        self.birthdate = birthdate

    def __repr__(self):
        return f"<Person {self.name} {self.last_name}>"
