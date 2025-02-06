from app.models.base import BaseMixin
from app.extensions import db

class UserPortfolio(BaseMixin, db.Model):
    """
    Modelo que representa el portafolio de un usuario.

    Atributos heredados de BaseMixin:
    - id: Identificador único del registro.
    - date_created: Fecha y hora en que se creó el registro.
    - date_modified: Fecha y hora en que se modificó el registro.
    - status: Estado del registro (0 = inactivo, 1 = activo).

    Atributos específicos:
    - user_id: ID del usuario propietario del portafolio (entero, obligatorio).
    - symbol: Símbolo del activo financiero (cadena, obligatorio).
    - quantity: Cantidad poseída del activo (decimal, obligatorio).
    - average_price: Precio promedio de compra del activo (decimal, obligatorio).
    """
    __tablename__ = 'user_portfolio'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    symbol = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Numeric(20, 8), nullable=False)
    average_price = db.Column(db.Numeric(15, 8), nullable=False)

    user = db.relationship('User', backref=db.backref('portfolio', lazy=True))

    def __init__(self, user_id, symbol, quantity, average_price):
        """
        Constructor del modelo UserPortfolio.

        :param user_id: ID del usuario propietario del portafolio.
        :param symbol: Símbolo del activo financiero.
        :param quantity: Cantidad poseída del activo.
        :param average_price: Precio promedio de compra.
        """
        self.user_id = user_id
        self.symbol = symbol
        self.quantity = quantity
        self.average_price = average_price

    def __repr__(self):
        return f"<UserPortfolio {self.symbol} - {self.quantity}>"