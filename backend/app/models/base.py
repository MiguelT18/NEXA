from app.extensions import db

# Define a base model for other database tables to inherit
class BaseMixin(db.Model):
    """
    Clase base para otros modelos de la base de datos.
    
    Esta clase proporciona campos comunes que son utilizados por otros modelos:
    - id: Identificador único del registro (autoincremental).
    - date_created: Fecha y hora en que se creó el registro.
    - date_modified: Fecha y hora en que se modificó el registro.
    - status: Estado del registro (0 = inactivo, 1 = activo).
    """

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_created = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, server_default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
    status = db.Column(db.Integer, server_default="1", nullable=False)